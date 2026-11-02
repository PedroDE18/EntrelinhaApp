import { describe, it, expect } from 'vitest';
import {
  evaluatePlacementScore,
  PLACEMENT_QUESTIONS,
} from './placement-test';

describe('PlacementTestModule', () => {
  const getCorrect = (id: string) => PLACEMENT_QUESTIONS.find((q) => q.id === id)!.correctOptionId;
  const getWrong = (id: string) => {
    const q = PLACEMENT_QUESTIONS.find((q) => q.id === id)!;
    return q.options.find((opt) => opt.id !== q.correctOptionId)!.id;
  };

  it('has 6 calibrated contrastive questions spanning A1 to B2', () => {
    expect(PLACEMENT_QUESTIONS).toHaveLength(6);
    expect(PLACEMENT_QUESTIONS[0].targetCefr).toBe('A1');
    expect(PLACEMENT_QUESTIONS[1].targetCefr).toBe('A2');
    expect(PLACEMENT_QUESTIONS[2].targetCefr).toBe('A2');
    expect(PLACEMENT_QUESTIONS[3].targetCefr).toBe('B1');
    expect(PLACEMENT_QUESTIONS[4].targetCefr).toBe('B1');
    expect(PLACEMENT_QUESTIONS[5].targetCefr).toBe('B2');
  });

  it('assigns A1 for 0 or 1 correct answers', () => {
    const result0 = evaluatePlacementScore({});
    expect(result0.score).toBe(0);
    expect(result0.assignedCefr).toBe('A1');

    const result1 = evaluatePlacementScore({
      'pq-1': getCorrect('pq-1'),
      'pq-2': getWrong('pq-2'),
    });
    expect(result1.score).toBe(1);
    expect(result1.assignedCefr).toBe('A1');
  });

  it('assigns A2 for 2 or 3 correct answers', () => {
    const result = evaluatePlacementScore({
      'pq-1': getCorrect('pq-1'),
      'pq-2': getCorrect('pq-2'),
      'pq-3': getWrong('pq-3'),
    });
    expect(result.score).toBe(2);
    expect(result.assignedCefr).toBe('A2');
  });

  it('assigns B1 for 4 or 5 correct answers', () => {
    const result = evaluatePlacementScore({
      'pq-1': getCorrect('pq-1'),
      'pq-2': getCorrect('pq-2'),
      'pq-3': getCorrect('pq-3'),
      'pq-4': getCorrect('pq-4'),
      'pq-5': getWrong('pq-5'),
    });
    expect(result.score).toBe(4);
    expect(result.assignedCefr).toBe('B1');
  });

  it('assigns B2 for 6 correct answers', () => {
    const allCorrect: Record<string, string> = {};
    PLACEMENT_QUESTIONS.forEach((q) => {
      allCorrect[q.id] = q.correctOptionId;
    });

    const result = evaluatePlacementScore(allCorrect);
    expect(result.score).toBe(6);
    expect(result.assignedCefr).toBe('B2');
    expect(result.initialWeaknesses).toHaveLength(0);
    expect(result.initialStrengths).toHaveLength(6);
  });
});
