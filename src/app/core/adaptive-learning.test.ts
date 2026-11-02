import { describe, it, expect } from 'vitest';
import {
  createDefaultDifficultyRadar,
  detectQuestionDifficultyCategory,
  updateRadarWithAssessment,
  calculateStoryScore,
  rankStoriesForLearner,
  getRecommendedFocusAreas,
  calculateSrsInterval,
  getDueWordsForReview,
} from './adaptive-learning';
import { ComprehensionQuestion, LearnerProfile, Story } from './models';

describe('AdaptiveLearningModule', () => {
  it('creates default difficulty radar with 7 Portuguese interference categories', () => {
    const radar = createDefaultDifficultyRadar();
    expect(Object.keys(radar)).toHaveLength(7);
    expect(radar.faux_ami).toBeDefined();
    expect(radar.divergence_genre).toBeDefined();
    expect(radar.temps_verbal_aspect).toBeDefined();
    expect(radar.preposition_complementation).toBeDefined();
    expect(radar.pronom_en_y).toBeDefined();
    expect(radar.declencheur_subjonctif).toBeDefined();
    expect(radar.accord_participe).toBeDefined();

    expect(radar.faux_ami.masteryScore).toBe(60);
    expect(radar.faux_ami.trend).toBe('untested');
  });

  it('detects difficulty category from explicit field or interference note', () => {
    const qExplicit: ComprehensionQuestion = {
      id: 'q1',
      type: 'grammar',
      difficultyCategory: 'pronom_en_y',
      questionFr: 'test',
      questionPt: 'teste',
      options: [],
      correctOptionId: 'a',
      explanationFr: '',
      explanationPt: '',
    };
    expect(detectQuestionDifficultyCategory(qExplicit)).toBe('pronom_en_y');

    const qWithNote: ComprehensionQuestion = {
      id: 'q2',
      type: 'grammar',
      questionFr: 'test',
      questionPt: 'teste',
      options: [],
      correctOptionId: 'a',
      explanationFr: '',
      explanationPt: '',
      portugueseInterferenceNote: 'faux_ami: actuellement (no momento) vs en fait',
    };
    expect(detectQuestionDifficultyCategory(qWithNote)).toBe('faux_ami');
  });

  it('updates radar with assessment results and tracks correct vs error counts', () => {
    const radar = createDefaultDifficultyRadar();
    const mockQuestion: ComprehensionQuestion = {
      id: 'q1',
      type: 'grammar',
      difficultyCategory: 'divergence_genre',
      questionFr: '',
      questionPt: '',
      options: [],
      correctOptionId: 'a',
      explanationFr: '',
      explanationPt: '',
    };

    // First attempt: correct
    const result1 = updateRadarWithAssessment(radar, [
      { question: mockQuestion, isCorrect: true },
    ]);
    expect(result1.updatedRadar.divergence_genre.attemptsCount).toBe(1);
    expect(result1.updatedRadar.divergence_genre.correctCount).toBe(1);
    expect(result1.updatedRadar.divergence_genre.errorCount).toBe(0);
    expect(result1.updatedRadar.divergence_genre.masteryScore).toBeGreaterThan(60);
    expect(result1.updatedRadar.divergence_genre.trend).toBe('improving');

    // Second attempt: mistake
    const result2 = updateRadarWithAssessment(result1.updatedRadar, [
      { question: mockQuestion, isCorrect: false },
    ]);
    expect(result2.updatedRadar.divergence_genre.attemptsCount).toBe(2);
    expect(result2.updatedRadar.divergence_genre.errorCount).toBe(1);
    expect(result2.mistakeCategories).toContain('divergence_genre');
  });

  it('ranks stories based on pedagogical deficit, CEFR alignment, and genre', () => {
    const radar = createDefaultDifficultyRadar();
    // Simulate learner struggling with subjunctive (low mastery)
    radar.declencheur_subjonctif.masteryScore = 20;

    const profile: LearnerProfile = {
      id: 'p1',
      name: 'Test Learner',
      nativeLanguage: 'pt-BR',
      targetLanguage: 'fr-FR',
      readingCEFR: 'B1',
      listeningCEFR: 'A2',
      storiesCompleted: 2,
      totalReadingMinutes: 20,
      totalListeningMinutes: 10,
      currentStreakDays: 3,
      wordsLearnedCount: 40,
      vocabularyMetrics: { unseen: 10, encountered: 5, learning: 5, known: 15, mastered: 5 },
      preferredGenres: ['Roman d’aventures'],
      readingSpeedPreference: 'comfortable',
      audioPlaybackSpeed: 1.0,
      firebaseSyncEnabled: false,
      difficultyRadar: radar,
      assessmentHistory: [],
    };

    const storyA: Story = {
      id: 'story-subjunctive',
      title: 'Histoire Subjonctif',
      author: 'Auteur',
      genre: 'Roman d’aventures',
      estimatedCEFR: 'B1',
      readingMinutes: 3,
      wordCount: 300,
      coverImage: '',
      sourceType: 'ai_original',
      sourceLabel: 'IA',
      licenseInfo: '',
      provenanceType: 'original_french',
      audioAvailable: false,
      audioDurationSec: 0,
      excerpt: '',
      paragraphs: [],
      targetDifficultyCategories: ['declencheur_subjonctif'],
      comprehensionQuestions: [],
    };

    const storyB: Story = {
      id: 'story-easy-a1',
      title: 'Histoire A1',
      author: 'Auteur',
      genre: 'Autre',
      estimatedCEFR: 'A1',
      readingMinutes: 1,
      wordCount: 100,
      coverImage: '',
      sourceType: 'ai_original',
      sourceLabel: 'IA',
      licenseInfo: '',
      provenanceType: 'original_french',
      audioAvailable: false,
      audioDurationSec: 0,
      excerpt: '',
      paragraphs: [],
      comprehensionQuestions: [],
    };

    const ranked = rankStoriesForLearner([storyB, storyA], profile);
    // storyA addresses the learner's subjunctive deficit and matches CEFR & genre
    expect(ranked[0].id).toBe('story-subjunctive');
  });

  it('generates recommended focus areas for top learner weaknesses', () => {
    const radar = createDefaultDifficultyRadar();
    radar.faux_ami.masteryScore = 35;
    radar.pronom_en_y.masteryScore = 40;

    const profile: LearnerProfile = {
      id: 'p1',
      name: 'Test',
      nativeLanguage: 'pt-BR',
      targetLanguage: 'fr-FR',
      readingCEFR: 'B1',
      listeningCEFR: 'A2',
      storiesCompleted: 0,
      totalReadingMinutes: 0,
      totalListeningMinutes: 0,
      currentStreakDays: 1,
      wordsLearnedCount: 0,
      vocabularyMetrics: { unseen: 0, encountered: 0, learning: 0, known: 0, mastered: 0 },
      preferredGenres: [],
      readingSpeedPreference: 'comfortable',
      audioPlaybackSpeed: 1,
      firebaseSyncEnabled: false,
      difficultyRadar: radar,
    };

    const recommendations = getRecommendedFocusAreas(profile, []);
    expect(recommendations.length).toBeGreaterThanOrEqual(1);
    expect(recommendations[0].category).toBe('faux_ami');
    expect(recommendations[0].masteryScore).toBe(35);
  });

  it('handles repeated assessments transitioning trend from declining to improving', () => {
    let radar = createDefaultDifficultyRadar();
    const q: ComprehensionQuestion = {
      id: 'q-verb',
      type: 'grammar',
      difficultyCategory: 'temps_verbal_aspect',
      questionFr: '',
      questionPt: '',
      options: [],
      correctOptionId: 'a',
      explanationFr: '',
      explanationPt: '',
    };

    // 2 consecutive mistakes
    radar = updateRadarWithAssessment(radar, [
      { question: q, isCorrect: false },
      { question: q, isCorrect: false },
    ]).updatedRadar;
    expect(radar.temps_verbal_aspect.masteryScore).toBeLessThan(60);
    expect(radar.temps_verbal_aspect.errorCount).toBe(2);

    // 4 consecutive correct answers -> should recover and show improving
    radar = updateRadarWithAssessment(radar, [
      { question: q, isCorrect: true },
      { question: q, isCorrect: true },
      { question: q, isCorrect: true },
      { question: q, isCorrect: true },
    ]).updatedRadar;
    expect(radar.temps_verbal_aspect.trend).toBe('improving');
    expect(radar.temps_verbal_aspect.correctCount).toBe(4);
  });

  it('penalizes previously completed stories to ensure catalog novelty', () => {
    const radar = createDefaultDifficultyRadar();
    const profile: LearnerProfile = {
      id: 'p1',
      name: 'Test',
      nativeLanguage: 'pt-BR',
      targetLanguage: 'fr-FR',
      readingCEFR: 'B1',
      listeningCEFR: 'A2',
      storiesCompleted: 1,
      totalReadingMinutes: 10,
      totalListeningMinutes: 5,
      currentStreakDays: 1,
      wordsLearnedCount: 10,
      vocabularyMetrics: { unseen: 0, encountered: 0, learning: 0, known: 0, mastered: 0 },
      preferredGenres: ['Littérature'],
      readingSpeedPreference: 'comfortable',
      audioPlaybackSpeed: 1,
      firebaseSyncEnabled: false,
      difficultyRadar: radar,
      assessmentHistory: [
        {
          id: 'a1',
          storyId: 'story-read-already',
          storyTitle: 'Already Read',
          completedAt: '2026-10-31',
          scorePercent: 100,
          totalQuestions: 4,
          correctQuestions: 4,
          readingDurationSec: 120,
          estimatedWpm: 150,
          testedCategories: ['faux_ami'],
          mistakeCategories: [],
        },
      ],
    };

    const storyRead: Story = {
      id: 'story-read-already',
      title: 'Already Read',
      author: '',
      genre: 'Littérature',
      estimatedCEFR: 'B1',
      readingMinutes: 2,
      wordCount: 200,
      coverImage: '',
      sourceType: 'ai_original',
      sourceLabel: '',
      licenseInfo: '',
      provenanceType: 'original_french',
      audioAvailable: false,
      audioDurationSec: 0,
      excerpt: '',
      paragraphs: [],
      comprehensionQuestions: [],
    };

    const storyFresh: Story = {
      ...storyRead,
      id: 'story-fresh',
      title: 'Fresh Story',
    };

    const ranked = rankStoriesForLearner([storyRead, storyFresh], profile);
    expect(ranked[0].id).toBe('story-fresh');
  });

  describe('Spaced Repetition System (SRS)', () => {
    it('resets interval and reduces ease factor on rating "again"', () => {
      const result = calculateSrsInterval(3, 2.5, 'again', 6);
      expect(result.repetitions).toBe(0);
      expect(result.intervalDays).toBe(1);
      expect(result.easeFactor).toBe(2.3);
      expect(result.nextReviewDate).toBeDefined();
    });

    it('advances interval progressively on rating "good"', () => {
      // First review
      const first = calculateSrsInterval(0, 2.5, 'good', 1);
      expect(first.repetitions).toBe(1);
      expect(first.intervalDays).toBe(1);

      // Second review
      const second = calculateSrsInterval(1, 2.5, 'good', 1);
      expect(second.repetitions).toBe(2);
      expect(second.intervalDays).toBe(3);

      // Third review with ease factor multiplication
      const third = calculateSrsInterval(2, 2.5, 'good', 3);
      expect(third.repetitions).toBe(3);
      expect(third.intervalDays).toBe(8); // Math.round(3 * 2.5)
    });

    it('gives accelerated spacing and bonus ease on rating "easy"', () => {
      const result = calculateSrsInterval(0, 2.5, 'easy', 1);
      expect(result.repetitions).toBe(1);
      expect(result.intervalDays).toBe(3);
      expect(result.easeFactor).toBe(2.65);
    });

    it('filters due words correctly based on review date and learning state', () => {
      const words = [
        { id: '1', french: 'un', state: 'mastered', encounterCount: 5, srsNextReviewDate: '2020-01-01' },
        { id: '2', french: 'deux', state: 'learning', encounterCount: 2, srsNextReviewDate: '2026-11-01' },
        { id: '3', french: 'trois', state: 'known', encounterCount: 3, srsNextReviewDate: '2099-01-01' },
      ];
      const due = getDueWordsForReview(words);
      expect(due).toHaveLength(1);
      expect(due[0].id).toBe('2');
    });
  });
});
