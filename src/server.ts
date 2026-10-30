import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync, readFileSync, appendFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const devNotesFilePath = join(process.cwd(), 'DEV_NOTES.md');
const userDataFilePath = join(process.cwd(), 'data/user_data.json');

const app = express();
const angularApp = new AngularNodeAppEngine();

import { checkDatabaseHealth, db, hasDatabaseConnection } from './db/client';
import * as schema from './db/schema';
import { eq } from 'drizzle-orm';
import { SAMPLE_STORIES } from './app/core/services/story';

app.use(express.json());

interface DevNoteItem {
  id: string;
  timestamp: string;
  category: string;
  title: string;
  content: string;
}

function parseDevNotes(): { notes: DevNoteItem[]; raw: string } {
  if (!existsSync(devNotesFilePath)) {
    const initialText = `# LINGUA — Caderno de Desenvolvimento & Registro de Ideias\n\nRegistro contínuo de observações, sugestões e bugs.\n\n---\n`;
    writeFileSync(devNotesFilePath, initialText, 'utf-8');
    return { notes: [], raw: initialText };
  }

  const raw = readFileSync(devNotesFilePath, 'utf-8');
  const notes: DevNoteItem[] = [];
  const sections = raw.split(/^###\s+/m);

  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i].trim();
    if (!sec) continue;
    const firstLineEnd = sec.indexOf('\n');
    const header = firstLineEnd !== -1 ? sec.substring(0, firstLineEnd).trim() : sec;
    const body = firstLineEnd !== -1 ? sec.substring(firstLineEnd).trim() : '';

    // Match header format: [2026-10-30 13:20] · [MELHORIA] Title
    const match = header.match(/\[(.*?)\]\s*·?\s*\[(.*?)\]\s*(.*)/);
    const timestamp = match ? match[1] : '';
    const category = match ? match[2] : 'Nota';
    const title = match ? match[3] : header;

    notes.push({
      id: `note-${i}-${timestamp.replace(/[^0-9]/g, '')}`,
      timestamp,
      category,
      title,
      content: body,
    });
  }

  // Reverse so newest appears first
  return { notes: notes.reverse(), raw };
}

/**
 * Dev Notes endpoints: Reads and appends to DEV_NOTES.md in repository root
 */
app.get('/api/dev-notes', (_req, res) => {
  try {
    const parsed = parseDevNotes();
    res.json({
      success: true,
      notes: parsed.notes,
      raw: parsed.raw,
      filePath: 'DEV_NOTES.md',
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

app.post('/api/dev-notes', (req, res) => {
  try {
    const { title, category = 'Melhoria', content } = req.body || {};

    if (!title || !content) {
      res.status(400).json({
        success: false,
        error: 'Título e conteúdo da nota são obrigatórios.',
      });
      return;
    }

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const cleanCategory = String(category).trim().toUpperCase();
    const cleanTitle = String(title).trim();
    const cleanContent = String(content).trim();

    const entryMarkdown = `\n### [${timestamp}] · [${cleanCategory}] ${cleanTitle}\n- **Tipo:** ${cleanCategory}\n- **Data:** ${timestamp}\n- **Nota:** ${cleanContent}\n`;

    if (!existsSync(devNotesFilePath)) {
      writeFileSync(devNotesFilePath, `# LINGUA — Caderno de Desenvolvimento\n\n---\n`, 'utf-8');
    }

    appendFileSync(devNotesFilePath, entryMarkdown, 'utf-8');

    const updated = parseDevNotes();
    res.json({
      success: true,
      message: 'Nota salva com sucesso em DEV_NOTES.md!',
      notes: updated.notes,
      raw: updated.raw,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

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
 * Single-User Persistence Endpoints
 * Persists learner profile, settings, and vocabulary state across restarts.
 */
app.get('/api/user/data', (_req, res) => {
  try {
    if (existsSync(userDataFilePath)) {
      const parsed = JSON.parse(readFileSync(userDataFilePath, 'utf-8'));
      res.json({
        success: true,
        source: 'persistent_file',
        data: parsed,
      });
      return;
    }
    res.json({
      success: true,
      source: 'initial_mock',
      data: null,
    });
    return;
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
    return;
  }
});

app.post('/api/user/data', (req, res) => {
  try {
    const { profile, words } = req.body || {};
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    const payload = {
      updatedAt: new Date().toISOString(),
      profile,
      words,
    };
    writeFileSync(userDataFilePath, JSON.stringify(payload, null, 2), 'utf-8');
    res.json({
      success: true,
      message: 'Dados persistidos com sucesso!',
      updatedAt: payload.updatedAt,
    });
    return;
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
    return;
  }
});

/**
 * Story Library Endpoints (Phase 3: Database & Story Library Migration)
 * Returns story catalog from PostgreSQL when connected, or the curated in-memory catalog.
 */
app.get('/api/stories', async (_req, res) => {
  try {
    if (db && hasDatabaseConnection) {
      const dbStories = await db.select().from(schema.stories);
      if (dbStories.length > 0) {
        res.json({
          success: true,
          source: 'postgresql',
          count: dbStories.length,
          stories: dbStories,
        });
        return;
      }
    }
  } catch (err) {
    console.warn('[API] PostgreSQL query failed for stories, falling back to curated library:', err);
  }

  res.json({
    success: true,
    source: 'curated_library',
    count: SAMPLE_STORIES.length,
    stories: SAMPLE_STORIES,
  });
});

app.get('/api/stories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (db && hasDatabaseConnection) {
      const dbStories = await db.select().from(schema.stories).where(eq(schema.stories.id, id));
      if (dbStories.length > 0) {
        const paragraphs = await db.select().from(schema.storyParagraphs).where(eq(schema.storyParagraphs.storyId, id));
        const questions = await db.select().from(schema.comprehensionQuestions).where(eq(schema.comprehensionQuestions.storyId, id));
        res.json({
          success: true,
          source: 'postgresql',
          story: {
            ...dbStories[0],
            paragraphs,
            comprehensionQuestions: questions,
          },
        });
        return;
      }
    }
  } catch (err) {
    console.warn(`[API] PostgreSQL story query for ${id} failed:`, err);
  }

  const memoryStory = SAMPLE_STORIES.find((s) => s.id === id);
  if (!memoryStory) {
    res.status(404).json({
      success: false,
      error: `História '${id}' não encontrada.`,
    });
    return;
  }

  res.json({
    success: true,
    source: 'curated_library',
    story: memoryStory,
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
