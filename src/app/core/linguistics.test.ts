import { describe, it, expect } from 'vitest';
import {
  checkFalseCognate,
  checkGenderTrap,
  calculateReadingMinutes,
  transitionVocabularyState,
  calculateComprehensionScore,
  normalizeToken,
  tokenizeParagraph,
} from './linguistics';

describe('Linguistics Engine', () => {
  it('tokenizeParagraph preserves complete narrative text and detects false friends', () => {
    const sentence = 'Actuellement, elle attendait devant la librairie.';
    const tokens = tokenizeParagraph(sentence);
    expect(tokens.length).toBe(6);
    expect(tokens[0].cleanWord).toBe('actuellement');
    expect(tokens[0].falseFriend).not.toBeUndefined();
    expect(tokens[4].cleanWord).toBe('la');
    expect(tokens[5].cleanWord).toBe('librairie');
    expect(tokens[5].falseFriend).not.toBeUndefined();
  });

  it('normalizeToken cleans punctuation and trims lowercase', () => {
    expect(normalizeToken('«Actuellement...»')).toBe('actuellement');
    expect(normalizeToken('librairie,')).toBe('librairie');
    expect(normalizeToken('l’histoire')).toBe('lhistoire');
  });

  it('checkFalseCognate detects Portuguese false friends', () => {
    const matchActuellement = checkFalseCognate('Actuellement');
    expect(matchActuellement).not.toBeNull();
    expect(matchActuellement!.explanation).toMatch(/maintenant|moment|neste momento/i);

    const matchLibrairie = checkFalseCognate('librairie');
    expect(matchLibrairie).not.toBeNull();
    expect(matchLibrairie!.ptTrap).toBe('biblioteca');

    const matchRandom = checkFalseCognate('bonjour');
    expect(matchRandom).toBeNull();
  });

  it('checkGenderTrap identifies words with inverted grammatical gender in PT vs FR', () => {
    const voyage = checkGenderTrap('voyage');
    expect(voyage).not.toBeNull();
    expect(voyage!.frGender).toBe('masculin');
    expect(voyage!.ptGender).toBe('feminino');

    expect(checkGenderTrap('fin')?.frGender).toBe('féminin');
    expect(checkGenderTrap('fin')?.ptGender).toBe('masculino');
  });

  it('calculateReadingMinutes scales gracefully across CEFR levels', () => {
    expect(calculateReadingMinutes(300, 'A1')).toBe(4);
    expect(calculateReadingMinutes(300, 'C1')).toBe(2);
    expect(calculateReadingMinutes(50, 'B1')).toBe(1);
    expect(calculateReadingMinutes(0, 'A2')).toBe(1);
  });

  it('transitionVocabularyState preserves nuanced learner feedback without blunt classifications', () => {
    expect(transitionVocabularyState('unseen', 'mark_unknown')).toBe('encountered');
    expect(transitionVocabularyState('encountered', 'want_to_learn')).toBe('learning');
    expect(transitionVocabularyState('learning', 'mark_known')).toBe('known');
    expect(transitionVocabularyState('learning', 'quiz_correct')).toBe('known');
    expect(transitionVocabularyState('known', 'quiz_correct')).toBe('mastered');
    expect(transitionVocabularyState('mastered', 'quiz_incorrect')).toBe('known');
  });

  it('calculateComprehensionScore computes rounded percentage', () => {
    expect(calculateComprehensionScore(3, 4)).toBe(75);
    expect(calculateComprehensionScore(4, 4)).toBe(100);
    expect(calculateComprehensionScore(0, 4)).toBe(0);
    expect(calculateComprehensionScore(0, 0)).toBe(0);
  });
});
