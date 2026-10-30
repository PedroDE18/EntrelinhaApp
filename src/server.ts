import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

import { checkDatabaseHealth, db, hasDatabaseConnection } from './db/client';
import * as schema from './db/schema';

app.use(express.json());

/**
 * Health check & database connection status endpoint
 */
app.get('/api/health', async (_req, res) => {
  const dbHealth = await checkDatabaseHealth();
  res.json({
    status: 'ok',
    app: 'LINGUA',
    locale: 'pt-BR',
    learningTarget: 'fr-FR',
    timestamp: new Date().toISOString(),
    database: dbHealth,
    hasDatabaseUrl: hasDatabaseConnection,
  });
});

/**
 * Contrastive linguistics query endpoint (PostgreSQL + resilient fallback)
 */
app.get('/api/linguistics/contrastive', async (_req, res) => {
  try {
    if (db && hasDatabaseConnection) {
      const relationships = await db.select().from(schema.linguisticRelationships).limit(50);
      const grammar = await db.select().from(schema.grammarConcepts).limit(20);
      return res.json({
        source: 'postgresql',
        relationships,
        grammar,
      });
    }
  } catch (err) {
    console.warn('[API] PostgreSQL query failed, using in-memory catalog fallback:', err);
  }

  // Resilient fallback with high-yield Portuguese-French contrastive pairs
  return res.json({
    source: 'in_memory_catalog',
    falseFriends: [
      {
        termFr: 'actuellement',
        lemmaPt: 'atualmente',
        trapPt: 'na verdade / de fato',
        correctPt: 'no momento presente / agora',
        explanation: 'Falso cognato clássico: "actuellement" significa "neste momento, agora". Para dizer "na verdade", use "en fait" ou "en réalité".',
      },
      {
        termFr: 'assister à',
        lemmaPt: 'assistir',
        trapPt: 'prestar auxílio / ajudar',
        correctPt: 'comparecer / presenciar',
        explanation: '"Assister à" significa presenciar um evento. Para ajudar ou prestar socorro, o francês emprega "aider" ou "secourir".',
      },
      {
        termFr: 'librairie',
        lemmaPt: 'livraria',
        trapPt: 'biblioteca',
        correctPt: 'livraria (estabelecimento comercial)',
        explanation: '"Librairie" é uma loja onde se compram livros. O acervo público de consulta e empréstimo é "bibliothèque".',
      },
      {
        termFr: 'éventuellement',
        lemmaPt: 'eventualmente',
        trapPt: 'com o tempo / no futuro',
        correctPt: 'se for possível / porventura',
        explanation: 'Indica uma hipótese condicionada ("se for o caso"), não decorrer do tempo.',
      },
    ],
    genderMismatches: [
      {
        wordFr: 'le voyage',
        frGender: 'masculin',
        ptGender: 'feminino (a viagem)',
        rule: 'Substantivos franceses terminados em -age são geralmente masculinos.',
      },
      {
        wordFr: 'la fin',
        frGender: 'féminin',
        ptGender: 'masculino (o fim)',
        rule: 'Gênero oposto contrastivo.',
      },
    ],
  });
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
