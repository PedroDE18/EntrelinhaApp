CREATE TABLE "comprehension_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"story_id" varchar(64) NOT NULL,
	"type" varchar(32) DEFAULT 'factual' NOT NULL,
	"question_fr" text NOT NULL,
	"question_pt" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_option_id" varchar(32) NOT NULL,
	"explanation_fr" text NOT NULL,
	"explanation_pt" text NOT NULL,
	"portuguese_notes" text
);
--> statement-breakpoint
CREATE TABLE "grammar_concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language_id" varchar(16) NOT NULL,
	"name" varchar(128) NOT NULL,
	"slug" varchar(128) NOT NULL,
	"description" text NOT NULL,
	"cefr_level" varchar(8) NOT NULL,
	"portuguese_contrast_notes" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_concepts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "knowledge_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"source_url" text,
	"source_type" varchar(32) NOT NULL,
	"validation_status" varchar(24) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"code" varchar(10) NOT NULL,
	"name" varchar(64) NOT NULL,
	"native_name" varchar(64) NOT NULL,
	"locale" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "languages_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "learner_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"native_language_id" varchar(16) DEFAULT 'pt-BR' NOT NULL,
	"target_language_id" varchar(16) DEFAULT 'fr-FR' NOT NULL,
	"interface_locale" varchar(16) DEFAULT 'pt-BR' NOT NULL,
	"estimated_cefr_reading" varchar(8) DEFAULT 'A2' NOT NULL,
	"estimated_cefr_listening" varchar(8) DEFAULT 'A1' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "learner_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "learning_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"event_type" varchar(64) NOT NULL,
	"lexical_entry_id" uuid,
	"story_id" varchar(64),
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lexical_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language_id" varchar(16) NOT NULL,
	"lemma" varchar(128) NOT NULL,
	"part_of_speech" varchar(32) NOT NULL,
	"gender" varchar(16),
	"infinitive" varchar(128),
	"pronunciation_ipa" varchar(128),
	"frequency_rank" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lexical_senses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lexical_entry_id" uuid NOT NULL,
	"sense_number" integer DEFAULT 1 NOT NULL,
	"definition" text NOT NULL,
	"context_domain" varchar(64),
	"register" varchar(32) DEFAULT 'standard',
	"example_sentence" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linguistic_examples" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entry_id" uuid,
	"sense_id" uuid,
	"relationship_id" uuid,
	"grammar_concept_id" uuid,
	"text_fr" text NOT NULL,
	"text_pt" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linguistic_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_entry_id" uuid NOT NULL,
	"target_entry_id" uuid,
	"relationship_type" varchar(48) NOT NULL,
	"explanation_pt" text NOT NULL,
	"validation_status" varchar(24) DEFAULT 'validated' NOT NULL,
	"confidence" real DEFAULT 1 NOT NULL,
	"source_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"author" varchar(128) NOT NULL,
	"genre" varchar(64) NOT NULL,
	"estimated_cefr" varchar(8) NOT NULL,
	"reading_minutes" integer NOT NULL,
	"word_count" integer NOT NULL,
	"cover_image_url" text,
	"source_type" varchar(32) DEFAULT 'authentic_adapted' NOT NULL,
	"source_label" varchar(128),
	"source_url" text,
	"license_info" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_paragraphs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"story_id" varchar(64) NOT NULL,
	"paragraph_order" integer NOT NULL,
	"text_fr" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"story_id" varchar(64) NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"reading_duration_sec" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_vocabulary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"lexical_entry_id" uuid NOT NULL,
	"status" varchar(32) DEFAULT 'encountered' NOT NULL,
	"confidence" real DEFAULT 0.5 NOT NULL,
	"encounter_count" integer DEFAULT 1 NOT NULL,
	"last_encountered_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comprehension_questions" ADD CONSTRAINT "comprehension_questions_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_concepts" ADD CONSTRAINT "grammar_concepts_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_native_language_id_languages_id_fk" FOREIGN KEY ("native_language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_target_language_id_languages_id_fk" FOREIGN KEY ("target_language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_events" ADD CONSTRAINT "learning_events_lexical_entry_id_lexical_entries_id_fk" FOREIGN KEY ("lexical_entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lexical_entries" ADD CONSTRAINT "lexical_entries_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lexical_senses" ADD CONSTRAINT "lexical_senses_lexical_entry_id_lexical_entries_id_fk" FOREIGN KEY ("lexical_entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_examples" ADD CONSTRAINT "linguistic_examples_entry_id_lexical_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_examples" ADD CONSTRAINT "linguistic_examples_sense_id_lexical_senses_id_fk" FOREIGN KEY ("sense_id") REFERENCES "public"."lexical_senses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_examples" ADD CONSTRAINT "linguistic_examples_relationship_id_linguistic_relationships_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "public"."linguistic_relationships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_examples" ADD CONSTRAINT "linguistic_examples_grammar_concept_id_grammar_concepts_id_fk" FOREIGN KEY ("grammar_concept_id") REFERENCES "public"."grammar_concepts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_relationships" ADD CONSTRAINT "linguistic_relationships_source_entry_id_lexical_entries_id_fk" FOREIGN KEY ("source_entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linguistic_relationships" ADD CONSTRAINT "linguistic_relationships_target_entry_id_lexical_entries_id_fk" FOREIGN KEY ("target_entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_paragraphs" ADD CONSTRAINT "story_paragraphs_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_sessions" ADD CONSTRAINT "story_sessions_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocabulary" ADD CONSTRAINT "user_vocabulary_lexical_entry_id_lexical_entries_id_fk" FOREIGN KEY ("lexical_entry_id") REFERENCES "public"."lexical_entries"("id") ON DELETE no action ON UPDATE no action;