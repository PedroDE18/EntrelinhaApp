export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type ContentSourceType =
  | 'ai_original'
  | 'public_domain'
  | 'adapted_literature'
  | 'contemporary_news'
  | 'un_speech'
  | 'audiobook';

export type VocabularyState =
  | 'unseen'
  | 'encountered'
  | 'learning'
  | 'known'
  | 'mastered';

export interface GlossToken {
  text: string;
  cleanWord: string;
  definitionFr: string;
  translationPt: string;
  grammarNote?: string;
  falseFriend?: {
    ptTrap: string;
    trueMeaningPt: string;
    explanation: string;
  };
  genderTrap?: {
    frGender: 'masculin' | 'féminin';
    ptGender: 'masculino' | 'feminino';
    explanation: string;
  };
}

export interface ComprehensionQuestion {
  id: string;
  type: 'narrative' | 'inference' | 'vocabulary' | 'grammar';
  questionFr: string;
  questionPt: string;
  options: {
    id: string;
    textFr: string;
    textPt: string;
  }[];
  correctOptionId: string;
  explanationFr: string;
  explanationPt: string;
  portugueseInterferenceNote?: string;
}

export interface StoryParagraph {
  id: string;
  text: string;
  tokens: GlossToken[];
}

export interface Story {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  authorBio?: string;
  genre: string;
  estimatedCEFR: CEFRLevel;
  readingMinutes: number;
  wordCount: number;
  coverImage: string;
  sourceType: ContentSourceType;
  sourceLabel: string;
  sourceUrl?: string;
  licenseInfo: string;
  provenanceType: 'original_french' | 'ai_adapted' | 'literary_translation' | 'contemporary_report';
  audioAvailable: boolean;
  audioDurationSec: number;
  excerpt: string;
  paragraphs: StoryParagraph[];
  comprehensionQuestions: ComprehensionQuestion[];
  serializedInfo?: {
    seriesName: string;
    episodeNumber: number;
    totalEpisodes: number;
  };
}

export interface LearnerWord {
  id: string;
  french: string;
  lemma: string;
  translationPt: string;
  state: VocabularyState;
  encounterCount: number;
  lastEncountered: string;
  contextSentence: string;
  isFalseFriend?: boolean;
  falseFriendNote?: string;
}

export interface PortugueseInterferenceItem {
  id: string;
  frenchTerm: string;
  portugueseFalseFriend: string;
  correctPortugueseMeaning: string;
  howToSayInFrench: string;
  category: 'faux_ami' | 'genre' | 'preposition' | 'temps_verbal' | 'pronom';
  explanationPt: string;
  severity: 'high' | 'medium';
}

export interface LearnerProfile {
  id: string;
  name: string;
  nativeLanguage: 'pt-BR';
  targetLanguage: 'fr-FR';
  readingCEFR: CEFRLevel;
  listeningCEFR: CEFRLevel;
  storiesCompleted: number;
  totalReadingMinutes: number;
  totalListeningMinutes: number;
  currentStreakDays: number;
  wordsLearnedCount: number;
  vocabularyMetrics: {
    unseen: number;
    encountered: number;
    learning: number;
    known: number;
    mastered: number;
  };
  preferredGenres: string[];
  readingSpeedPreference: 'comfortable' | 'standard' | 'fast';
  audioPlaybackSpeed: number;
  firebaseSyncEnabled: boolean;
  lastSyncedAt?: string;
}
