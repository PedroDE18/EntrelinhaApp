import {
  DifficultyCategory,
  DifficultyRadar,
  CategoryMasteryState,
  Story,
  LearnerProfile,
  ComprehensionQuestion,
  RecommendedFocusArea,
  AssessmentHistoryItem,
  CEFRLevel,
} from './models';

export const DIFFICULTY_CATEGORIES_METADATA: Record<
  DifficultyCategory,
  { labelFr: string; labelPt: string; descriptionPt: string }
> = {
  faux_ami: {
    labelFr: 'Faux-amis et pièges lexicaux',
    labelPt: 'Falsos Cognatos & Armadilhas Lexicais',
    descriptionPt:
      'Termos com grafia ou som semelhantes ao português ou inglês, mas com sentido radicalmente distinto (ex.: actuellement, librairie, assister à).',
  },
  divergence_genre: {
    labelFr: 'Divergence de genre grammatical',
    labelPt: 'Divergência de Gênero Gramatical',
    descriptionPt:
      'Substantivos com gênero oposto entre os idiomas, em especial sufixos masculinos como -age (le voyage, le courage) e casos isolados (la mer, la fin).',
  },
  temps_verbal_aspect: {
    labelFr: 'Aspect verbal : Imparfait vs Passé Composé',
    labelPt: 'Aspecto Verbal: Imparfait vs. Passé Composé',
    descriptionPt:
      'Diferenciação precisa entre ações pontuais concluídas no passado (passé composé) e cenários, hábitos contínuos ou descrições (imparfait).',
  },
  preposition_complementation: {
    labelFr: 'Régence verbale et prépositions',
    labelPt: 'Regência Verbal & Preposições',
    descriptionPt:
      'Complementação de verbos com preposições distintas do português (ex.: penser à qqch vs penser de qqch, s’intéresser à).',
  },
  pronom_en_y: {
    labelFr: 'Pronoms adverbiaux « en » et « y »',
    labelPt: 'Pronomes Adverbiais « en » e « y »',
    descriptionPt:
      'Substituição anafórica de complementos introduzidos por « de » (en) e complementos de lugar ou introduzidos por « à » (y).',
  },
  declencheur_subjonctif: {
    labelFr: 'Déclencheurs du subjonctif',
    labelPt: 'Gatilhos de Modo Subjuntivo',
    descriptionPt:
      'Regras modais em orações subordinadas: exigência estrita após « bien que », « pour que », contraste com « espérer que » (indicativo).',
  },
  accord_participe: {
    labelFr: "Accord du participe passé",
    labelPt: 'Concordância do Particípio Passado',
    descriptionPt:
      'Regras de concordância com o auxiliar être e a regra clássica de anteposição do complemento de objeto direto com avoir.',
  },
};

export function createDefaultDifficultyRadar(): DifficultyRadar {
  const radar = {} as DifficultyRadar;
  for (const cat of Object.keys(DIFFICULTY_CATEGORIES_METADATA) as DifficultyCategory[]) {
    const meta = DIFFICULTY_CATEGORIES_METADATA[cat];
    radar[cat] = {
      category: cat,
      labelFr: meta.labelFr,
      labelPt: meta.labelPt,
      descriptionPt: meta.descriptionPt,
      attemptsCount: 0,
      errorCount: 0,
      correctCount: 0,
      masteryScore: 60, // Baseline prior score
      trend: 'untested',
    };
  }
  return radar;
}

export function detectQuestionDifficultyCategory(q: ComprehensionQuestion): DifficultyCategory | undefined {
  if (q.difficultyCategory) {
    return q.difficultyCategory;
  }
  if (q.portugueseInterferenceNote) {
    const note = q.portugueseInterferenceNote.toLowerCase();
    if (note.includes('faux_ami') || note.includes('cognat')) return 'faux_ami';
    if (note.includes('genre') || note.includes('masculin') || note.includes('féminin')) return 'divergence_genre';
    if (note.includes('imparfait') || note.includes('passé composé') || note.includes('temps_verbal')) return 'temps_verbal_aspect';
    if (note.includes('preposition') || note.includes('penser à') || note.includes('penser de')) return 'preposition_complementation';
    if (note.includes('pronom') || note.includes('« en »') || note.includes('« y »')) return 'pronom_en_y';
    if (note.includes('subjonctif')) return 'declencheur_subjonctif';
    if (note.includes('participe') || note.includes('accord')) return 'accord_participe';
  }
  if (q.type === 'grammar') {
    return 'preposition_complementation';
  }
  if (q.type === 'vocabulary') {
    return 'faux_ami';
  }
  return undefined;
}

const CEFR_ORDER: Record<CEFRLevel, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

export function calculateStoryScore(
  story: Story,
  profile: LearnerProfile,
  completedStoryIds: Set<string>
): number {
  const radar = profile.difficultyRadar || createDefaultDifficultyRadar();

  // 1. Pedagogical relevance score (0.0 to 1.0)
  // Check if story addresses categories where learner has low mastery (< 70)
  let pedagogyScore = 0.5;
  const targetCategories = story.targetDifficultyCategories || [];
  
  // Also collect categories from story questions
  const storyQuestionCats = new Set<DifficultyCategory>(targetCategories);
  story.comprehensionQuestions?.forEach((q) => {
    const cat = detectQuestionDifficultyCategory(q);
    if (cat) storyQuestionCats.add(cat);
  });

  if (storyQuestionCats.size > 0) {
    let totalDeficitWeight = 0;
    storyQuestionCats.forEach((cat) => {
      const state = radar[cat];
      const mastery = state ? state.masteryScore : 60;
      // Lower mastery means higher deficit weight (e.g. 100 - mastery)
      const deficit = Math.max(0, 100 - mastery) / 100;
      totalDeficitWeight += deficit;
    });
    pedagogyScore = Math.min(1.0, totalDeficitWeight / storyQuestionCats.size + 0.2);
  }

  // 2. CEFR Level Proximity score (0.0 to 1.0)
  const learnerCefrVal = CEFR_ORDER[profile.readingCEFR] || 3;
  const storyCefrVal = CEFR_ORDER[story.estimatedCEFR] || 3;
  const cefrDiff = storyCefrVal - learnerCefrVal;
  let cefrScore = 0.5;
  if (cefrDiff === 0) {
    cefrScore = 1.0; // Perfect match (i + 0)
  } else if (cefrDiff === 1) {
    cefrScore = 0.9; // Ideal stretch zone (i + 1)
  } else if (cefrDiff === -1) {
    cefrScore = 0.7; // Comfortable review (i - 1)
  } else {
    cefrScore = Math.max(0.1, 1 - Math.abs(cefrDiff) * 0.35);
  }

  // 3. Genre & Editorial Interest (0.0 to 1.0)
  const preferred = profile.preferredGenres || [];
  const matchesGenre = preferred.some(
    (g) => g.toLowerCase() === story.genre.toLowerCase() || story.genre.toLowerCase().includes(g.toLowerCase())
  );
  const interestScore = matchesGenre ? 1.0 : 0.6;

  // 4. Novelty vs Re-reading
  const isCompleted = completedStoryIds.has(story.id);
  const noveltyScore = isCompleted ? 0.3 : 1.0;

  // Formula: 40% pedagogy + 30% CEFR + 20% interest + 10% novelty
  const finalScore =
    0.4 * pedagogyScore +
    0.3 * cefrScore +
    0.2 * interestScore +
    0.1 * noveltyScore;

  return finalScore;
}

export function rankStoriesForLearner(stories: Story[], profile: LearnerProfile): Story[] {
  const history = profile.assessmentHistory || [];
  const completedIds = new Set(history.map((h) => h.storyId));

  const scored = stories.map((s) => ({
    story: s,
    score: calculateStoryScore(s, profile, completedIds),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.story);
}

export function getRecommendedFocusAreas(
  profile: LearnerProfile,
  stories: Story[]
): RecommendedFocusArea[] {
  const radar = profile.difficultyRadar || createDefaultDifficultyRadar();
  const list = Object.values(radar);

  // Sort by lowest mastery score first
  list.sort((a, b) => a.masteryScore - b.masteryScore);

  const topWeaknesses = list.slice(0, 3);
  const recommendations: RecommendedFocusArea[] = [];

  for (const item of topWeaknesses) {
    // Find stories that address this difficulty category
    const matchingStories = stories.filter((s) => {
      if (s.targetDifficultyCategories?.includes(item.category)) return true;
      return s.comprehensionQuestions?.some(
        (q) => detectQuestionDifficultyCategory(q) === item.category
      );
    });

    recommendations.push({
      category: item.category,
      categoryLabelPt: item.labelPt,
      masteryScore: item.masteryScore,
      rationalePt: `Seu índice de domínio em ${item.labelPt} é de ${item.masteryScore}%. Recomendamos praticar com histórias que enfatizam esse contraste.`,
      recommendedStoryIds: matchingStories.slice(0, 2).map((s) => s.id),
    });
  }

  return recommendations;
}

export function updateRadarWithAssessment(
  currentRadar: DifficultyRadar,
  questionResults: {
    question: ComprehensionQuestion;
    isCorrect: boolean;
  }[]
): {
  updatedRadar: DifficultyRadar;
  testedCategories: DifficultyCategory[];
  mistakeCategories: DifficultyCategory[];
} {
  const updatedRadar: DifficultyRadar = JSON.parse(JSON.stringify(currentRadar));
  const testedSet = new Set<DifficultyCategory>();
  const mistakeSet = new Set<DifficultyCategory>();

  for (const res of questionResults) {
    const cat = detectQuestionDifficultyCategory(res.question);
    if (!cat) continue;

    testedSet.add(cat);
    if (!res.isCorrect) {
      mistakeSet.add(cat);
    }

    if (!updatedRadar[cat]) {
      const meta = DIFFICULTY_CATEGORIES_METADATA[cat] || {
        labelFr: cat,
        labelPt: cat,
        descriptionPt: '',
      };
      updatedRadar[cat] = {
        category: cat,
        labelFr: meta.labelFr,
        labelPt: meta.labelPt,
        descriptionPt: meta.descriptionPt,
        attemptsCount: 0,
        errorCount: 0,
        correctCount: 0,
        masteryScore: 60,
        trend: 'untested',
      };
    }

    const state = updatedRadar[cat];
    state.attemptsCount += 1;
    if (res.isCorrect) {
      state.correctCount += 1;
    } else {
      state.errorCount += 1;
    }

    // Bayesian/smoothed mastery calculation
    // Prior: 60% with weight 2
    const priorWeight = 2;
    const priorScore = 60;
    const empiricalPercent = (state.correctCount / state.attemptsCount) * 100;
    const smoothedMastery = Math.round(
      (priorScore * priorWeight + empiricalPercent * state.attemptsCount) /
        (priorWeight + state.attemptsCount)
    );

    const oldScore = state.masteryScore;
    state.masteryScore = Math.max(10, Math.min(100, smoothedMastery));
    state.lastAssessedAt = new Date().toISOString();

    if (state.masteryScore > oldScore + 2) {
      state.trend = 'improving';
    } else if (state.masteryScore < oldScore - 2) {
      state.trend = 'declining';
    } else {
      state.trend = 'stable';
    }
  }

  return {
    updatedRadar,
    testedCategories: Array.from(testedSet),
    mistakeCategories: Array.from(mistakeSet),
  };
}
