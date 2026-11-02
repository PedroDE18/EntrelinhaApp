import { CEFRLevel, DifficultyCategory } from './models';

export interface PlacementOption {
  id: 'a' | 'b' | 'c' | 'd';
  textFr: string;
  textPt: string;
}

export interface PlacementQuestion {
  id: string;
  targetCefr: CEFRLevel;
  difficultyCategory: DifficultyCategory;
  promptFr: string;
  promptPt: string;
  contextSentence?: string;
  options: PlacementOption[];
  correctOptionId: string;
  explanationPt: string;
  interferenceNote: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pq-1',
    targetCefr: 'A1',
    difficultyCategory: 'divergence_genre',
    promptFr: 'Complétez la phrase avec l’article approprié : « Dans ce restaurant, ____ fromage est délicieux. »',
    promptPt: 'Complete a frase com o artigo adequado: « Dans ce restaurant, ____ fromage est délicieux. »',
    contextSentence: 'Dans ce restaurant, ____ fromage est délicieux.',
    options: [
      { id: 'a', textFr: 'la (féminin)', textPt: 'la (feminino, como no português "o queijo")' },
      { id: 'b', textFr: 'le (masculin)', textPt: 'le (masculino)' },
      { id: 'c', textFr: 'les (pluriel)', textPt: 'les (plural)' },
      { id: 'd', textFr: 'des (indéfini)', textPt: 'des (indefinido)' },
    ],
    correctOptionId: 'b',
    explanationPt: 'Em francês, palavras terminadas em "-age" são masculinas (le fromage, le voyage, le garage). Em português dizemos "o queijo", que coincide, mas em outros casos como "la voyage" o erro é frequente.',
    interferenceNote: 'divergence_genre: sufixo -age é masculino em francês.',
  },
  {
    id: 'pq-2',
    targetCefr: 'A2',
    difficultyCategory: 'temps_verbal_aspect',
    promptFr: 'Choisissez la bonne forme verbale : « Hier soir, pendant que nous ____ tranquillement, le téléphone a sonné. »',
    promptPt: 'Escolha a forma verbal correta: « Hier soir, pendant que nous ____ tranquillement, le téléphone a sonné. »',
    contextSentence: 'Hier soir, pendant que nous ____ tranquillement, le téléphone a sonné.',
    options: [
      { id: 'a', textFr: 'dînerons (Futur)', textPt: 'dînerons (Futuro)' },
      { id: 'b', textFr: 'avons dîné (Passé Composé)', textPt: 'avons dîné (Passé Composé — ação pontual concluída)' },
      { id: 'c', textFr: 'dînions (Imparfait)', textPt: 'dînions (Imparfait — ação contínua em segundo plano)' },
      { id: 'd', textFr: 'dînons (Présent)', textPt: 'dînons (Presente)' },
    ],
    correctOptionId: 'c',
    explanationPt: 'A ação contínua que servia de cenário (« pendant que nous dînions ») exige o Imparfait. A ação pontual que a interrompe (« a sonné ») fica no Passé Composé.',
    interferenceNote: 'temps_verbal_aspect: oposição entre ação contínua (imparfait) e ação pontual (passé composé).',
  },
  {
    id: 'pq-3',
    targetCefr: 'A2',
    difficultyCategory: 'faux_ami',
    promptFr: 'Dans la phrase « Actuellement, la directrice examine votre dossier », que signifie « actuellement » ?',
    promptPt: 'Na frase « Actuellement, la directrice examine votre dossier », o que significa « actuellement »?',
    contextSentence: 'Actuellement, la directrice examine votre dossier.',
    options: [
      { id: 'a', textFr: 'Éventuellement / Peut-être', textPt: 'Talvez / Se houver oportunidade' },
      { id: 'b', textFr: 'En réalité / En fait', textPt: 'Na verdade / De fato (falso amigo com o inglês "actually")' },
      { id: 'c', textFr: 'Par chance / Heureusement', textPt: 'Por sorte / Felizmente' },
      { id: 'd', textFr: 'En ce moment même / À l’heure actuelle', textPt: 'Neste momento / No presente' },
    ],
    correctOptionId: 'd',
    explanationPt: '« Actuellement » refere-se estritamente ao momento presente. Para dizer "na verdade", deve-se empregar « en fait » ou « en réalité ».',
    interferenceNote: 'faux_ami: actualmente (no momento) ≠ en fait (na verdade).',
  },
  {
    id: 'pq-4',
    targetCefr: 'B1',
    difficultyCategory: 'preposition_complementation',
    promptFr: 'Pour demander une opinion critique sur un livre, quelle est la formule correcte en français ?',
    promptPt: 'Para pedir uma opinião crítica sobre um livro, qual é a formulação correta em francês?',
    options: [
      { id: 'a', textFr: 'Que penses-tu de ce livre ?', textPt: 'Que penses-tu de ce livre ? (opinião/avaliação)' },
      { id: 'b', textFr: 'Que penses-tu à ce livre ?', textPt: 'Que penses-tu à ce livre ? (pensamento direcionado)' },
      { id: 'c', textFr: 'Que penses-tu sur ce livre ?', textPt: 'Que penses-tu sur ce livre ? (calque do português "sobre")' },
      { id: 'd', textFr: 'Que penses-tu en ce livre ?', textPt: 'Que penses-tu en ce livre ?' },
    ],
    correctOptionId: 'a',
    explanationPt: '« Penser de » expressa juízo de valor ou opinião (« Qu\'en penses-tu ? »). « Penser à » significa lembrar-se de algo ou manter em pensamento (« Je pense à mes vacances »).',
    interferenceNote: 'preposition_complementation: oposição contrastiva penser de (opinar) vs penser à (ter em mente).',
  },
  {
    id: 'pq-5',
    targetCefr: 'B1',
    difficultyCategory: 'pronom_en_y',
    promptFr: 'Complétez la réponse avec le bon pronom : « — Tu vas souvent au Musée d’Orsay ? — Oui, j’____ vais chaque mois. »',
    promptPt: 'Complete a resposta com o pronome adequado: « — Tu vas souvent au Musée d’Orsay ? — Oui, j’____ vais chaque mois. »',
    contextSentence: '— Tu vas souvent au Musée d’Orsay ? — Oui, j’____ vais chaque mois.',
    options: [
      { id: 'a', textFr: 'en', textPt: 'en (substitui complementos introduzidos por "de")' },
      { id: 'b', textFr: 'y', textPt: 'y (substitui complementos de lugar introduzidos por preposição à/au)' },
      { id: 'c', textFr: 'le', textPt: 'le (pronome COD)' },
      { id: 'd', textFr: 'lui', textPt: 'lui (pronome COI para pessoas)' },
    ],
    correctOptionId: 'b',
    explanationPt: 'O pronome adverbial « y » substitui o lugar introduzido pela preposição « à » (« aller à l’endroit » $\\rightarrow$ « y aller »).',
    interferenceNote: 'pronom_en_y: substituição de lugar por "y" vs partitivo/procedência por "en".',
  },
  {
    id: 'pq-6',
    targetCefr: 'B2',
    difficultyCategory: 'declencheur_subjonctif',
    promptFr: 'Choisissez la forme correcte : « Bien qu’il ____ très froid ce matin, nous irons nous promener. »',
    promptPt: 'Escolha a forma correta: « Bien qu’il ____ très froid ce matin, nous irons nous promener. »',
    contextSentence: 'Bien qu’il ____ très froid ce matin, nous irons nous promener.',
    options: [
      { id: 'a', textFr: 'fait (Indicatif présent)', textPt: 'fait (Indicativo presente)' },
      { id: 'b', textFr: 'fera (Futur simple)', textPt: 'fera (Futuro simples)' },
      { id: 'c', textFr: 'fasse (Subjonctif présent)', textPt: 'fasse (Subjuntivo presente exigido por "bien que")' },
      { id: 'd', textFr: 'ferait (Conditionnel présent)', textPt: 'ferait (Condicional)' },
    ],
    correctOptionId: 'c',
    explanationPt: 'A conjunção concessiva « bien que » exige obrigatoriamente o modo Subjuntivo em francês (« bien qu\'il fasse »). Note o contraste com « espérer que », que pede o Indicativo.',
    interferenceNote: 'declencheur_subjonctif: conjunção bien que exige subjonctif.',
  },
];

export function evaluatePlacementScore(answers: Record<string, string>): {
  score: number;
  total: number;
  assignedCefr: CEFRLevel;
  startingExplanationPt: string;
  initialStrengths: DifficultyCategory[];
  initialWeaknesses: DifficultyCategory[];
} {
  const total = PLACEMENT_QUESTIONS.length;
  let correctCount = 0;
  const strengths: DifficultyCategory[] = [];
  const weaknesses: DifficultyCategory[] = [];

  for (const q of PLACEMENT_QUESTIONS) {
    const chosen = answers[q.id];
    if (chosen === q.correctOptionId) {
      correctCount++;
      strengths.push(q.difficultyCategory);
    } else {
      weaknesses.push(q.difficultyCategory);
    }
  }

  // Diagnostic calibration curve:
  // 0-1: A1 (Foundational)
  // 2-3: A2 (Elementary)
  // 4-5: B1 (Intermediate)
  // 6:   B2 (Advanced Independent)
  let assignedCefr: CEFRLevel = 'A1';
  let startingExplanationPt =
    'Seu ponto de partida ideal é o nível A1. Focaremos em estruturas básicas, vocabulário cotidiano e primeiros contrastes de gênero e artigos.';

  if (correctCount >= 6) {
    assignedCefr = 'B2';
    startingExplanationPt =
      'Excelente domínio da morfossintaxe e dos modos verbais complexos. Seu ponto de partida é o nível B2, com textos literários densos e nuances estilísticas.';
  } else if (correctCount >= 4) {
    assignedCefr = 'B1';
    startingExplanationPt =
      'Sólida base gramatical e bom discernimento temporal. Seu ponto de partida é o nível B1, com crônicas contemporâneas e narrativa intermediária.';
  } else if (correctCount >= 2) {
    assignedCefr = 'A2';
    startingExplanationPt =
      'Boa compreensão das estruturas fundamentais, com alguns pontos de atenção em aspectos verbais e preposições. Seu ponto de partida é o nível A2.';
  }

  return {
    score: correctCount,
    total,
    assignedCefr,
    startingExplanationPt,
    initialStrengths: strengths,
    initialWeaknesses: weaknesses,
  };
}
