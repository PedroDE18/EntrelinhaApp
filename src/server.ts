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
    const initialText = `# Entrelinha — Caderno de Desenvolvimento & Registro de Ideias\n\nRegistro contínuo de observações, sugestões e bugs.\n\n---\n`;
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
    app: 'Entrelinha',
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
 * Single-User & Multi-Profile Persistence Endpoints with PostgreSQL/Supabase & Local Resilient Fallback
 * Supports user switching, admin testing profile, and per-user state isolation.
 */
app.post('/api/auth/session', async (req, res) => {
  try {
    const { user } = req.body || {};
    if (!user || !user.id) {
      return res.status(400).json({ success: false, error: 'Usuário é obrigatório' });
    }

    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const sessionFile = join(dir, 'active_session.json');
    writeFileSync(sessionFile, JSON.stringify({ activeUserId: user.id, user, updatedAt: new Date().toISOString() }, null, 2), 'utf-8');

    return res.json({ success: true, user });
  } catch (err: unknown) {
    return res.status(500).json({ success: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.get('/api/user/data', async (req, res) => {
  try {
    const targetUserId = String(req.headers['x-user-id'] || req.query['userId'] || 'usr-admin').trim();

    // 1. Try PostgreSQL / Supabase
    if (db && hasDatabaseConnection) {
      try {
        const rows = await db
          .select()
          .from(schema.learnerProfiles)
          .where(eq(schema.learnerProfiles.userId, targetUserId))
          .limit(1);

        if (rows.length > 0) {
          const row = rows[0];
          const meta = (row.metadata as Record<string, unknown>) || {};
          const profile = {
            id: row.userId,
            name: (meta['name'] as string) || (targetUserId === 'usr-admin' ? 'Administrateur Entrelinha' : 'Leitor Entrelinha'),
            nativeLanguage: row.nativeLanguageId as 'pt-BR',
            targetLanguage: row.targetLanguageId as 'fr-FR',
            readingCEFR: row.estimatedCefrReading as any,
            listeningCEFR: row.estimatedCefrListening as any,
            storiesCompleted: (meta['storiesCompleted'] as number) || (targetUserId === 'usr-admin' ? 5 : 0),
            totalReadingMinutes: (meta['totalReadingMinutes'] as number) || (targetUserId === 'usr-admin' ? 45 : 0),
            totalListeningMinutes: (meta['totalListeningMinutes'] as number) || (targetUserId === 'usr-admin' ? 30 : 0),
            currentStreakDays: (meta['currentStreakDays'] as number) || 1,
            wordsLearnedCount: (meta['wordsLearnedCount'] as number) || (targetUserId === 'usr-admin' ? 142 : 0),
            vocabularyMetrics: meta['vocabularyMetrics'] || {
              unseen: 520,
              encountered: targetUserId === 'usr-admin' ? 86 : 0,
              learning: targetUserId === 'usr-admin' ? 48 : 0,
              known: targetUserId === 'usr-admin' ? 142 : 0,
              mastered: targetUserId === 'usr-admin' ? 64 : 0,
            },
            preferredGenres: meta['preferredGenres'] || ['Mystère & Suspense', 'Littérature Classique'],
            readingSpeedPreference: 'comfortable',
            audioPlaybackSpeed: 1.0,
            firebaseSyncEnabled: true,
            difficultyRadar: meta['difficultyRadar'],
            assessmentHistory: meta['assessmentHistory'] || [],
            lastSyncedAt: row.updatedAt?.toISOString() || new Date().toISOString(),
          };

          return res.json({
            success: true,
            source: 'supabase_postgresql',
            data: {
              profile,
              words: meta['words'] || [],
            },
          });
        }
      } catch (dbErr) {
        console.warn('[API] Supabase query for user data failed, falling back to local file:', dbErr);
      }
    }

    // 2. Resilient file fallback with user-specific isolation
    const userSpecificFile = join(process.cwd(), 'data', `user_${targetUserId}.json`);
    if (existsSync(userSpecificFile)) {
      const parsed = JSON.parse(readFileSync(userSpecificFile, 'utf-8'));
      return res.json({
        success: true,
        source: 'persistent_file',
        data: parsed,
      });
    }

    // Fallback to legacy single-user file if admin or learner-br-01
    if (existsSync(userDataFilePath) && (targetUserId === 'learner-br-01' || targetUserId === 'usr-admin')) {
      const parsed = JSON.parse(readFileSync(userDataFilePath, 'utf-8'));
      return res.json({
        success: true,
        source: 'persistent_file',
        data: parsed,
      });
    }

    return res.json({
      success: true,
      source: 'initial_mock',
      data: null,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

app.post('/api/user/data', async (req, res) => {
  try {
    const { profile, words } = req.body || {};
    const targetUserId = String(req.headers['x-user-id'] || profile?.id || 'usr-admin').trim();

    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    const payload = {
      updatedAt: new Date().toISOString(),
      profile: {
        ...(profile || {}),
        id: targetUserId,
      },
      words: words || [],
    };

    // 1. Write to user-isolated file backup
    const userSpecificFile = join(dir, `user_${targetUserId}.json`);
    writeFileSync(userSpecificFile, JSON.stringify(payload, null, 2), 'utf-8');

    // Also update generic file if main profile
    if (targetUserId === 'learner-br-01' || targetUserId === 'usr-admin') {
      writeFileSync(userDataFilePath, JSON.stringify(payload, null, 2), 'utf-8');
    }

    // 2. Persist directly to Supabase if connected
    let supabaseSuccess = false;
    if (db && hasDatabaseConnection && profile) {
      try {
        const metadata = {
          name: profile.name,
          storiesCompleted: profile.storiesCompleted,
          totalReadingMinutes: profile.totalReadingMinutes,
          totalListeningMinutes: profile.totalListeningMinutes,
          currentStreakDays: profile.currentStreakDays,
          wordsLearnedCount: profile.wordsLearnedCount,
          vocabularyMetrics: profile.vocabularyMetrics,
          preferredGenres: profile.preferredGenres,
          difficultyRadar: profile.difficultyRadar,
          assessmentHistory: profile.assessmentHistory,
          words: words || [],
        };

        await db
          .insert(schema.learnerProfiles)
          .values({
            userId: targetUserId,
            nativeLanguageId: profile.nativeLanguage || 'pt-BR',
            targetLanguageId: profile.targetLanguage || 'fr-FR',
            interfaceLocale: 'pt-BR',
            estimatedCefrReading: profile.readingCEFR || 'B1',
            estimatedCefrListening: profile.listeningCEFR || 'A2',
            metadata,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: schema.learnerProfiles.userId,
            set: {
              estimatedCefrReading: profile.readingCEFR || 'B1',
              estimatedCefrListening: profile.listeningCEFR || 'A2',
              metadata,
              updatedAt: new Date(),
            },
          });

        supabaseSuccess = true;
      } catch (dbErr) {
        console.warn('[API] Could not persist user profile to Supabase PostgreSQL, saved to local store:', dbErr);
      }
    }

    return res.json({
      success: true,
      message: 'Dados persistidos com sucesso!',
      persistedToSupabase: supabaseSuccess,
      userId: targetUserId,
      updatedAt: payload.updatedAt,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

/**
 * Log reading session & assessment outcome into Supabase
 */
app.post('/api/user/session', async (req, res) => {
  try {
    const { storyId, score = 0, readingDurationSec = 0, testedCategories = [], mistakeCategories = [] } = req.body || {};
    const activeUserId = String(req.headers['x-user-id'] || req.body?.userId || 'usr-admin').trim();

    if (!storyId) {
      return res.status(400).json({ success: false, error: 'storyId é obrigatório' });
    }

    let sessionLogged = false;
    if (db && hasDatabaseConnection) {
      try {
        // Insert into story_sessions
        await db.insert(schema.storySessions).values({
          userId: activeUserId,
          storyId,
          score: Math.round(Number(score)),
          readingDurationSec: Math.round(Number(readingDurationSec)),
        });

        // Log learning event
        await db.insert(schema.learningEvents).values({
          userId: activeUserId,
          eventType: 'story_completed',
          storyId,
          payload: {
            userId: activeUserId,
            score,
            readingDurationSec,
            testedCategories,
            mistakeCategories,
            timestamp: new Date().toISOString(),
          },
        });

        sessionLogged = true;
      } catch (err) {
        console.warn('[API] Supabase session logging fallback:', err);
      }
    }

    return res.json({
      success: true,
      sessionLogged,
      storyId,
      userId: activeUserId,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
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
        // Enrich database records with curated tokens, questions and normalize field aliases (coverImage / coverImageUrl)
        const enriched = dbStories.map((dbs) => {
          const fallback = SAMPLE_STORIES.find((s) => s.id === dbs.id);
          const cover = dbs.coverImageUrl || fallback?.coverImage || '/images/cover-marais.svg';
          const cefr = dbs.estimatedCefr || fallback?.estimatedCEFR || 'B1';
          return {
            ...fallback,
            ...dbs,
            coverImage: cover,
            coverImageUrl: cover,
            estimatedCEFR: cefr,
            estimatedCefr: cefr,
            paragraphs: fallback?.paragraphs || [],
            comprehensionQuestions: fallback?.comprehensionQuestions || [],
          };
        });

        res.json({
          success: true,
          source: 'postgresql',
          count: enriched.length,
          stories: enriched,
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
  const memoryStory = SAMPLE_STORIES.find((s) => s.id === id);
  try {
    if (db && hasDatabaseConnection) {
      const dbStories = await db.select().from(schema.stories).where(eq(schema.stories.id, id));
      if (dbStories.length > 0) {
        const dbs = dbStories[0];
        const cover = dbs.coverImageUrl || memoryStory?.coverImage || '/images/cover-marais.svg';
        const cefr = dbs.estimatedCefr || memoryStory?.estimatedCEFR || 'B1';

        res.json({
          success: true,
          source: 'postgresql',
          story: {
            ...memoryStory,
            ...dbs,
            coverImage: cover,
            coverImageUrl: cover,
            estimatedCEFR: cefr,
            estimatedCefr: cefr,
            paragraphs: memoryStory?.paragraphs || [],
            comprehensionQuestions: memoryStory?.comprehensionQuestions || [],
          },
        });
        return;
      }
    }
  } catch (err) {
    console.warn(`[API] PostgreSQL story query for ${id} failed:`, err);
  }

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
