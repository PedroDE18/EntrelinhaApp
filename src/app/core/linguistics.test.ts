import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkFalseCognate,
  checkGenderTrap,
  calculateReadingMinutes,
  transitionVocabularyState,
  calculateComprehensionScore,
  normalizeToken,
  tokenizeParagraph,
} from './linguistics';

test('tokenizeParagraph preserves complete narrative text and detects false friends', () => {
  const sentence = 'Actuellement, elle attendait devant la librairie.';
  const tokens = tokenizeParagraph(sentence);
  assert.equal(tokens.length, 6);
  assert.equal(tokens[0].cleanWord, 'actuellement');
  assert.notEqual(tokens[0].falseFriend, undefined);
  assert.equal(tokens[4].cleanWord, 'la');
  assert.equal(tokens[5].cleanWord, 'librairie');
  assert.notEqual(tokens[5].falseFriend, undefined);
});

test('normalizeToken cleans punctuation and trims lowercase', () => {
  assert.equal(normalizeToken('«Actuellement...»'), 'actuellement');
  assert.equal(normalizeToken('librairie,'), 'librairie');
  assert.equal(normalizeToken('l’histoire'), 'lhistoire');
});

test('checkFalseCognate detects Portuguese false friends', () => {
  const matchActuellement = checkFalseCognate('Actuellement');
  assert.notEqual(matchActuellement, null);
  assert.match(matchActuellement!.explanation, /maintenant|moment|maintenant|neste momento/i);

  const matchLibrairie = checkFalseCognate('librairie');
  assert.notEqual(matchLibrairie, null);
  assert.equal(matchLibrairie!.ptTrap, 'biblioteca');

  const matchRandom = checkFalseCognate('bonjour');
  assert.equal(matchRandom, null);
});

test('checkGenderTrap identifies words with inverted grammatical gender in PT vs FR', () => {
  const voyage = checkGenderTrap('voyage');
  assert.notEqual(voyage, null);
  assert.equal(voyage!.frGender, 'masculin');
  assert.equal(voyage!.ptGender, 'feminino');

  assert.equal(checkGenderTrap('fin')?.frGender, 'féminin');
  assert.equal(checkGenderTrap('fin')?.ptGender, 'masculino');
});

test('calculateReadingMinutes scales gracefully across CEFR levels', () => {
  // 300 words: A1 (75 wpm) -> 4 mins, C1 (185 wpm) -> 2 mins
  assert.equal(calculateReadingMinutes(300, 'A1'), 4);
  assert.equal(calculateReadingMinutes(300, 'C1'), 2);
  assert.equal(calculateReadingMinutes(50, 'B1'), 1);
  assert.equal(calculateReadingMinutes(0, 'A2'), 1);
});

test('transitionVocabularyState preserves nuanced learner feedback without blunt classifications', () => {
  // Encountered when marked unknown
  assert.equal(transitionVocabularyState('unseen', 'mark_unknown'), 'encountered');
  
  // Learning when deliberately flagged to learn
  assert.equal(transitionVocabularyState('encountered', 'want_to_learn'), 'learning');

  // Known when marked as already known
  assert.equal(transitionVocabularyState('learning', 'mark_known'), 'known');

  // Quiz promotion: learning -> known, known -> mastered
  assert.equal(transitionVocabularyState('learning', 'quiz_correct'), 'known');
  assert.equal(transitionVocabularyState('known', 'quiz_correct'), 'mastered');

  // Quiz demotion: mastered -> known
  assert.equal(transitionVocabularyState('mastered', 'quiz_incorrect'), 'known');
});

test('calculateComprehensionScore computes rounded percentage', () => {
  assert.equal(calculateComprehensionScore(3, 4), 75);
  assert.equal(calculateComprehensionScore(4, 4), 100);
  assert.equal(calculateComprehensionScore(0, 4), 0);
  assert.equal(calculateComprehensionScore(0, 0), 0);
});
