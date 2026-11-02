export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type DifficultyCategory =
  | 'faux_ami'
  | 'divergence_genre'
  | 'temps_verbal_aspect'
  | 'preposition_complementation'
  | 'pronom_en_y'
  | 'declencheur_subjonctif'
  | 'accord_participe';

export interface CategoryMasteryState {
  category: DifficultyCategory;
  labelFr: string;
  labelPt: string;
  descriptionPt: string;
  attemptsCount: number;
  errorCount: number;
  correctCount: number;
  masteryScore: number; // 0 to 100
  lastAssessedAt?: string;
  trend: 'improving' | 'stable' | 'declining' | 'untested';
}

export type DifficultyRadar = Record<DifficultyCategory, CategoryMasteryState>;

export interface AssessmentHistoryItem {
  id: string;
  storyId: string;
  storyTitle: string;
  completedAt: string;
  scorePercent: number;
  totalQuestions: number;
  correctQuestions: number;
  readingDurationSec: number;
  estimatedWpm: number;
  testedCategories: DifficultyCategory[];
  mistakeCategories: DifficultyCategory[];
}

export interface RecommendedFocusArea {
  category: DifficultyCategory;
  categoryLabelPt: string;
  masteryScore: number;
  rationalePt: string;
  recommendedStoryIds: string[];
}

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
  difficultyCategory?: DifficultyCategory;
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
  estimatedCefr?: string;
  readingMinutes: number;
  wordCount: number;
  coverImage: string;
  coverImageUrl?: string;
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
  targetDifficultyCategories?: DifficultyCategory[];
  serializedInfo?: {
    seriesName: string;
    episodeNumber: number;
    totalEpisodes: number;
  };
}

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

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
  // SRS properties (Spaced Repetition / FSRS-inspired)
  srsIntervalDays?: number;
  srsEaseFactor?: number;
  srsNextReviewDate?: string;
  srsRepetitions?: number;
}

export interface RenderedTextItem {
  id: string;
  text: string;
  fullText: string;
  cleanWord: string;
  tokenCount: number;
  displayCount: number;
  isWord: boolean;
  isMultiword: boolean;
  sentenceNumber: number;
  sentenceContext: string;
  paragraphIndex: number;
  tokenIndex: number;
  state: VocabularyState;
  isSentenceStart: boolean;
  definitionFr?: string;
  translationPt?: string;
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

export interface MultiwordExpression {
  text: string;
  cleanText: string;
  tokens: string[];
  translationPt?: string;
  definitionFr?: string;
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

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'learner';
  readingCEFR: CEFRLevel;
  listeningCEFR: CEFRLevel;
  createdAt: string;
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
  difficultyRadar?: DifficultyRadar;
  assessmentHistory?: AssessmentHistoryItem[];
}
