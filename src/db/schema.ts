import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  real,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * 1. Languages
 * Supports source (pt-BR) and target (fr-FR) languages.
 */
export const languages = pgTable('languages', {
  id: varchar('id', { length: 16 }).primaryKey(), // e.g. 'fr-FR', 'pt-BR'
  code: varchar('code', { length: 10 }).notNull().unique(), // 'fr', 'pt'
  name: varchar('name', { length: 64 }).notNull(), // 'French', 'Portuguese'
  nativeName: varchar('native_name', { length: 64 }).notNull(), // 'Français', 'Português'
  locale: varchar('locale', { length: 16 }).notNull(), // 'fr-FR', 'pt-BR'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 2. Lexical Entries
 * Dictionary headwords, lemmas, gender, phonetic transcription.
 */
export const lexicalEntries = pgTable('lexical_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  languageId: varchar('language_id', { length: 16 })
    .notNull()
    .references(() => languages.id),
  lemma: varchar('lemma', { length: 128 }).notNull(),
  partOfSpeech: varchar('part_of_speech', { length: 32 }).notNull(), // noun, verb, adjective, adverb, preposition
  gender: varchar('gender', { length: 16 }), // masculine, feminine, neutral, null
  infinitive: varchar('infinitive', { length: 128 }),
  pronunciationIpa: varchar('pronunciation_ipa', { length: 128 }),
  frequencyRank: integer('frequency_rank'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 3. Lexical Senses
 * Granular semantic senses and definitions.
 */
export const lexicalSenses = pgTable('lexical_senses', {
  id: uuid('id').defaultRandom().primaryKey(),
  lexicalEntryId: uuid('lexical_entry_id')
    .notNull()
    .references(() => lexicalEntries.id, { onDelete: 'cascade' }),
  senseNumber: integer('sense_number').default(1).notNull(),
  definition: text('definition').notNull(),
  contextDomain: varchar('context_domain', { length: 64 }), // e.g. literary, informal, legal, culinary
  register: varchar('register', { length: 32 }).default('standard'),
  exampleSentence: text('example_sentence'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 4. Linguistic Relationships (Contrastive pt-BR <-> fr-FR)
 * Crucial for false friends, gender divergence, cognates.
 */
export const linguisticRelationships = pgTable('linguistic_relationships', {
  id: uuid('id').defaultRandom().primaryKey(),
  sourceEntryId: uuid('source_entry_id')
    .notNull()
    .references(() => lexicalEntries.id), // French entry
  targetEntryId: uuid('target_entry_id')
    .references(() => lexicalEntries.id), // Portuguese entry (if mapped)
  relationshipType: varchar('relationship_type', { length: 48 }).notNull(),
  // 'false_friend' | 'cognate' | 'partial_cognate' | 'gender_mismatch' | 'semantic_difference'
  explanationPt: text('explanation_pt').notNull(),
  validationStatus: varchar('validation_status', { length: 24 }).default('validated').notNull(),
  // 'candidate' | 'reviewed' | 'validated' | 'rejected'
  confidence: real('confidence').default(1.0).notNull(),
  sourceNotes: text('source_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 5. Grammar Concepts
 * Structural differences (e.g. Passé Composé vs Imparfait, Preposition complementation).
 */
export const grammarConcepts = pgTable('grammar_concepts', {
  id: uuid('id').defaultRandom().primaryKey(),
  languageId: varchar('language_id', { length: 16 })
    .notNull()
    .references(() => languages.id),
  name: varchar('name', { length: 128 }).notNull(),
  slug: varchar('slug', { length: 128 }).notNull().unique(),
  description: text('description').notNull(),
  cefrLevel: varchar('cefr_level', { length: 8 }).notNull(), // A1, A2, B1, B2, C1, C2
  portugueseContrastNotes: text('portuguese_contrast_notes').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 6. Linguistic Examples
 * Parallel bilingual examples and counter-examples.
 */
export const linguisticExamples = pgTable('linguistic_examples', {
  id: uuid('id').defaultRandom().primaryKey(),
  entryId: uuid('entry_id').references(() => lexicalEntries.id),
  senseId: uuid('sense_id').references(() => lexicalSenses.id),
  relationshipId: uuid('relationship_id').references(() => linguisticRelationships.id),
  grammarConceptId: uuid('grammar_concept_id').references(() => grammarConcepts.id),
  textFr: text('text_fr').notNull(),
  textPt: text('text_pt').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 7. Knowledge Sources
 * Dictionaries, corpora, reference corpora.
 */
export const knowledgeSources = pgTable('knowledge_sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  sourceUrl: text('source_url'),
  sourceType: varchar('source_type', { length: 32 }).notNull(), // dictionary, parallel_corpus, grammar_reference
  validationStatus: varchar('validation_status', { length: 24 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 8. Learner Profiles
 * Tracks individual learner background and settings.
 */
export const learnerProfiles = pgTable('learner_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull().unique(),
  nativeLanguageId: varchar('native_language_id', { length: 16 })
    .default('pt-BR')
    .notNull()
    .references(() => languages.id),
  targetLanguageId: varchar('target_language_id', { length: 16 })
    .default('fr-FR')
    .notNull()
    .references(() => languages.id),
  interfaceLocale: varchar('interface_locale', { length: 16 }).default('pt-BR').notNull(),
  estimatedCefrReading: varchar('estimated_cefr_reading', { length: 8 }).default('A2').notNull(),
  estimatedCefrListening: varchar('estimated_cefr_listening', { length: 8 }).default('A1').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * 9. User Vocabulary
 * Personalized vocabulary mastery tracker.
 */
export const userVocabulary = pgTable('user_vocabulary', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull(),
  lexicalEntryId: uuid('lexical_entry_id')
    .notNull()
    .references(() => lexicalEntries.id),
  status: varchar('status', { length: 32 }).default('encountered').notNull(),
  // 'unseen' | 'encountered' | 'unfamiliar' | 'learning' | 'probably_understood' | 'known' | 'mastered'
  confidence: real('confidence').default(0.5).notNull(),
  encounterCount: integer('encounter_count').default(1).notNull(),
  lastEncounteredAt: timestamp('last_encountered_at').defaultNow().notNull(),
});

/**
 * 10. Learning Events
 * Telemetry for taps, gloss lookups, audio replays, question answers.
 */
export const learningEvents = pgTable('learning_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull(),
  eventType: varchar('event_type', { length: 64 }).notNull(),
  // 'gloss_lookup' | 'audio_listen' | 'audio_pause' | 'question_answered' | 'story_completed'
  lexicalEntryId: uuid('lexical_entry_id').references(() => lexicalEntries.id),
  storyId: varchar('story_id', { length: 64 }),
  payload: jsonb('payload'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 11. Stories
 * Curated literary & conversational stories with CEFR levels and attribution.
 */
export const stories = pgTable('stories', {
  id: varchar('id', { length: 64 }).primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  author: varchar('author', { length: 128 }).notNull(),
  genre: varchar('genre', { length: 64 }).notNull(),
  estimatedCefr: varchar('estimated_cefr', { length: 8 }).notNull(), // A1, A2, B1, B2, C1
  readingMinutes: integer('reading_minutes').notNull(),
  wordCount: integer('word_count').notNull(),
  coverImageUrl: text('cover_image_url'),
  sourceType: varchar('source_type', { length: 32 }).default('authentic_adapted').notNull(),
  sourceLabel: varchar('source_label', { length: 128 }),
  sourceUrl: text('source_url'),
  licenseInfo: varchar('license_info', { length: 128 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 12. Story Paragraphs
 * Full text in original French, broken down into sequential paragraphs.
 */
export const storyParagraphs = pgTable('story_paragraphs', {
  id: uuid('id').defaultRandom().primaryKey(),
  storyId: varchar('story_id', { length: 64 })
    .notNull()
    .references(() => stories.id, { onDelete: 'cascade' }),
  paragraphOrder: integer('paragraph_order').notNull(),
  textFr: text('text_fr').notNull(),
});

/**
 * 13. Comprehension Questions
 * Story questions testing comprehension rather than isolated grammar.
 */
export const comprehensionQuestions = pgTable('comprehension_questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  storyId: varchar('story_id', { length: 64 })
    .notNull()
    .references(() => stories.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 32 }).default('factual').notNull(),
  questionFr: text('question_fr').notNull(),
  questionPt: text('question_pt').notNull(),
  options: jsonb('options').notNull(), // Array of { id: string, textFr: string, textPt: string }
  correctOptionId: varchar('correct_option_id', { length: 32 }).notNull(),
  explanationFr: text('explanation_fr').notNull(),
  explanationPt: text('explanation_pt').notNull(),
  portugueseNotes: text('portuguese_notes'),
});

/**
 * 14. Story Sessions
 * User reading logs and comprehension results.
 */
export const storySessions = pgTable('story_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull(),
  storyId: varchar('story_id', { length: 64 })
    .notNull()
    .references(() => stories.id),
  score: integer('score').default(0).notNull(),
  readingDurationSec: integer('reading_duration_sec').default(0).notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
});

// Relations definitions
export const languagesRelations = relations(languages, ({ many }) => ({
  lexicalEntries: many(lexicalEntries),
  grammarConcepts: many(grammarConcepts),
}));

export const lexicalEntriesRelations = relations(lexicalEntries, ({ one, many }) => ({
  language: one(languages, {
    fields: [lexicalEntries.languageId],
    references: [languages.id],
  }),
  senses: many(lexicalSenses),
  examples: many(linguisticExamples),
}));

export const lexicalSensesRelations = relations(lexicalSenses, ({ one }) => ({
  entry: one(lexicalEntries, {
    fields: [lexicalSenses.lexicalEntryId],
    references: [lexicalEntries.id],
  }),
}));

export const storiesRelations = relations(stories, ({ many }) => ({
  paragraphs: many(storyParagraphs),
  questions: many(comprehensionQuestions),
  sessions: many(storySessions),
}));

export const storyParagraphsRelations = relations(storyParagraphs, ({ one }) => ({
  story: one(stories, {
    fields: [storyParagraphs.storyId],
    references: [stories.id],
  }),
}));

export const comprehensionQuestionsRelations = relations(comprehensionQuestions, ({ one }) => ({
  story: one(stories, {
    fields: [comprehensionQuestions.storyId],
    references: [stories.id],
  }),
}));
