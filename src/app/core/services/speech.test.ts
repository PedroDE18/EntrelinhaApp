import test from 'node:test';
import assert from 'node:assert/strict';
import { SpeechNarrationService } from './speech';

test('SpeechNarrationService splitIntoSentences splits paragraphs into sentences correctly', () => {
  const service = new SpeechNarrationService();
  const text =
    "Une bruine d'automne enveloppait le quartier du Marais. Les pavés luisants reflétaient les lumières dorées des bistros. L'inspectrice marchait.";
  const sentences = service.splitIntoSentences(text);

  assert.equal(sentences.length, 3);
  assert.equal(sentences[0], "Une bruine d'automne enveloppait le quartier du Marais.");
  assert.equal(sentences[1], 'Les pavés luisants reflétaient les lumières dorées des bistros.');
  assert.equal(sentences[2], "L'inspectrice marchait.");
});

test('SpeechNarrationService handles single sentences and dialogues gracefully', () => {
  const service = new SpeechNarrationService();
  const dialogue = '— Un vrai Anglais ne plaisante jamais quand il s\'agit d\'un pari, répondit Phileas Fogg. Je parie vingt mille livres!';
  const sentences = service.splitIntoSentences(dialogue);

  assert.equal(sentences.length, 2);
  assert.equal(sentences[0], '— Un vrai Anglais ne plaisante jamais quand il s\'agit d\'un pari, répondit Phileas Fogg.');
  assert.equal(sentences[1], 'Je parie vingt mille livres!');
});

test('SpeechNarrationService state signals initialize correctly', () => {
  const service = new SpeechNarrationService();
  assert.equal(service.isPlaying(), false);
  assert.equal(service.isPaused(), false);
  assert.equal(service.currentSpeed(), 1.0);
  assert.equal(service.progressPercent(), 0);
});
