import { CEFRLevel, GlossToken, VocabularyState } from './models';
import { lookupFrenchLexicon } from './lexicon';

/**
 * Portuguese to French contrastive linguistic rules
 * Explicitly designed for Brazilian Portuguese native speakers learning French.
 */
export const KNOWN_FALSE_COGNATES: Record<string, { ptTrap: string; trueMeaningPt: string; explanation: string }> = {
  actuellement: {
    ptTrap: 'na verdade / atualmente',
    trueMeaningPt: 'no momento / atualmente (ATENÇÃO: em inglês actually = na verdade; em francês actualmente = no momento presente)',
    explanation: 'Em francês, "actuellement" significa "neste momento, agora". Para dizer "na verdade", use "en fait" ou "en réalité".',
  },
  assister: {
    ptTrap: 'dar assistência / ajudar',
    trueMeaningPt: 'comparecer / presenciar (assister à)',
    explanation: '"Assister à une conférence" significa "assistir/comparecer a uma palestra". Para dizer "ajudar", o francês prefere "aider".',
  },
  librairie: {
    ptTrap: 'biblioteca',
    trueMeaningPt: 'livraria (onde se compram livros)',
    explanation: '"Une librairie" é uma livraria onde se compram livros. O local onde se pegam livros emprestados é "une bibliothèque".',
  },
  éventuellement: {
    ptTrap: 'com certeza mais tarde / eventualmente',
    trueMeaningPt: 'possivelmente / se for o caso',
    explanation: 'Em francês, "éventuellement" indica uma hipótese ("se for possível"). Não significa "com o tempo/mais tarde", que em francês é "finalement" ou "tôt ou tard".',
  },
  attendre: {
    ptTrap: 'atender (telefone ou cliente)',
    trueMeaningPt: 'esperar / aguardar',
    explanation: '"J\'attends le bus" = "Estou esperando o ônibus". Para atender o telefone, usa-se "répondre au téléphone".',
  },
  entendre: {
    ptTrap: 'entender / compreender',
    trueMeaningPt: 'ouvir / escutar (também ter intenção de)',
    explanation: '"J\'entends du bruit" = "Estou ouvindo barulho". Para dizer "entender/compreender", use "comprendre".',
  },
  formidable: {
    ptTrap: 'formidável / assustador',
    trueMeaningPt: 'maravilhoso / fantástico',
    explanation: 'Em francês moderno, "formidable" é quase sempre extremamente positivo ("génial, fantastique").',
  },
  sensible: {
    ptTrap: 'sensato / equilibrado',
    trueMeaningPt: 'sensível / emotivo / perceptível',
    explanation: '"Sensible" em francês significa "sensível" (que sente com facilidade). Para "sensato", usa-se "sensé" ou "raisonnable".',
  },
  blouson: {
    ptTrap: 'blusa de mulher',
    trueMeaningPt: 'jaqueta / casaco curto unissex',
    explanation: '"Un blouson" é uma jaqueta curta com zíper. Uma blusa feminina leve é "un chemisier" ou "un haut".',
  },
  déception: {
    ptTrap: 'engano / decepção',
    trueMeaningPt: 'decepção / desapontamento',
    explanation: 'Em francês "déception" é desapontamento. Cuidado com o verbo "décevoir" que significa desapontar, não enganar.',
  },
};

/**
 * Common French-Portuguese grammatical gender differences
 * (Words that switch gender between the two languages)
 */
export const GENDER_MISMATCHES: Record<string, { frGender: 'masculin' | 'féminin'; ptGender: 'masculino' | 'feminino'; explanation: string }> = {
  voyage: {
    frGender: 'masculin',
    ptGender: 'feminino',
    explanation: 'Em francês: "un voyage" (masculino). Em português: "uma viagem" (feminino). Palavras francesas terminadas em -age são geralmente masculinas (le fromage, le courage).',
  },
  fin: {
    frGender: 'féminin',
    ptGender: 'masculino',
    explanation: 'Em francês: "la fin" (feminino). Em português: "o fim" (masculino). Ex: "C\'est la fin de l\'histoire".',
  },
  problème: {
    frGender: 'masculin',
    ptGender: 'masculino',
    explanation: 'Atenção à terminação em -e que confunde brasileiros: "un problème" é masculino em francês, herdado do grego (como le système, le thème).',
  },
  couleur: {
    frGender: 'féminin',
    ptGender: 'feminino',
    explanation: 'Em francês: "la couleur" (feminino). Em português: "a cor" (feminino). Palavras em -eur abstratas são geralmente femininas (la peur, la douleur, la chaleur), exceto o trabalho/papel humano (un professeur, un docteur).',
  },
  mer: {
    frGender: 'féminin',
    ptGender: 'masculino',
    explanation: 'Em francês: "la mer" (feminino). Em português: "o mar" (masculino).',
  },
  banque: {
    frGender: 'féminin',
    ptGender: 'masculino',
    explanation: 'Em francês: "la banque" (feminino, instituição financeira). Em português: "o banco" (masculino).',
  },
};

/**
 * Cleans punctuation from a token for linguistic lookup
 */
export function normalizeToken(word: string): string {
  return word
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()«»""'’]/g, '')
    .trim();
}

/**
 * Checks if a token triggers a Portuguese interference warning
 */
export function checkFalseCognate(word: string) {
  const clean = normalizeToken(word);
  return KNOWN_FALSE_COGNATES[clean] || null;
}

/**
 * Checks if a token has a gender contrast with Portuguese
 */
export function checkGenderTrap(word: string) {
  const clean = normalizeToken(word);
  return GENDER_MISMATCHES[clean] || null;
}

/**
 * Calculates estimated reading time based on word count and CEFR reading pace (words per minute)
 */
export function calculateReadingMinutes(wordCount: number, level: CEFRLevel): number {
  if (wordCount <= 0) return 1;

  // Words per minute calibrated for second-language reading speed
  const speedByLevel: Record<CEFRLevel, number> = {
    A1: 75,
    A2: 95,
    B1: 125,
    B2: 155,
    C1: 185,
    C2: 215,
  };

  const wpm = speedByLevel[level] || 120;
  const minutes = Math.ceil(wordCount / wpm);
  return Math.max(1, minutes);
}

/**
 * Pure state machine transition for vocabulary acquisition
 * Follows principle from prompt Section 9:
 * Do not automatically classify a word as unknown simply because the learner highlighted it.
 * Distinguishes: unknown, want to learn, uncertain, already known, and quiz outcomes.
 */
export function transitionVocabularyState(
  currentState: VocabularyState,
  action: 'mark_unknown' | 'want_to_learn' | 'mark_known' | 'mark_uncertain' | 'quiz_correct' | 'quiz_incorrect'
): VocabularyState {
  switch (action) {
    case 'mark_unknown':
      return 'encountered';
    case 'want_to_learn':
      return 'learning';
    case 'mark_uncertain':
      return currentState === 'known' ? 'learning' : 'encountered';
    case 'mark_known':
      return 'known';
    case 'quiz_correct':
      if (currentState === 'learning') return 'known';
      if (currentState === 'known') return 'mastered';
      if (currentState === 'encountered') return 'learning';
      return currentState;
    case 'quiz_incorrect':
      if (currentState === 'mastered') return 'known';
      if (currentState === 'known') return 'learning';
      return 'learning';
    default:
      return currentState;
  }
}

/**
 * Calculates comprehension score percentage
 */
export function calculateComprehensionScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

/**
 * Tokenizes an entire paragraph into interactive word tokens, merging with any explicit glosses
 */
export function tokenizeParagraph(text: string, existingGlosses: GlossToken[] = []): GlossToken[] {
  const glossMap = new Map<string, GlossToken>();
  for (const g of existingGlosses) {
    glossMap.set(normalizeToken(g.cleanWord || g.text), g);
    glossMap.set(normalizeToken(g.text), g);
  }

  const words = text.split(/\s+/).filter(Boolean);

  return words.map((rawWord) => {
    const clean = normalizeToken(rawWord);
    const existing = glossMap.get(clean);

    if (existing) {
      return {
        ...existing,
        text: rawWord,
      };
    }

    const falseFriend = checkFalseCognate(clean);
    const genderTrap = checkGenderTrap(clean);
    const lexiconEntry = lookupFrenchLexicon(clean) || lookupFrenchLexicon(rawWord);

    return {
      text: rawWord,
      cleanWord: clean,
      definitionFr: lexiconEntry?.definitionFr || `Mot ou expression en contexte : ${clean}.`,
      translationPt: falseFriend ? falseFriend.trueMeaningPt : (lexiconEntry?.translationPt || `Termo em contexto : ${clean}`),
      falseFriend: falseFriend || undefined,
      genderTrap: genderTrap || undefined,
    };
  });
}

