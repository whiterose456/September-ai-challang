import { DebateAttempt } from './types';

const STORAGE_KEY_ATTEMPTS = 'agora_debate_attempts_v1';

export function getSavedAttempts(): DebateAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load attempts from storage', e);
    return [];
  }
}

export function saveAttempt(attempt: DebateAttempt): DebateAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSavedAttempts();
    
    // Calculate attempt number for this specific figure & topic
    const pastSameTopic = existing.filter(
      (a) => a.figureId === attempt.figureId && a.topicTitle === attempt.topicTitle
    );
    
    const updatedAttempt = {
      ...attempt,
      attemptNumber: pastSameTopic.length + 1
    };

    const updated = [updatedAttempt, ...existing];
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save attempt to storage', e);
    return [];
  }
}

export function getPreviousAttemptsForTopic(figureId: string, topicTitle: string): DebateAttempt[] {
  const all = getSavedAttempts();
  return all
    .filter((a) => a.figureId === figureId && a.topicTitle === topicTitle)
    .sort((a, b) => a.attemptNumber - b.attemptNumber);
}
