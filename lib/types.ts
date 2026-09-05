export type DebateMode = 'DEBATE' | 'INTERVIEW';

export interface TopicOption {
  id: string;
  title: string;
  description: string;
  defaultPositionFor: string;
  defaultPositionAgainst: string;
  context: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
  era: string;
  avatar: string;
  accentColor: string;
  quote: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  debateStyle: string;
  personality: string;
  systemInstructions: string;
  topics: TopicOption[];
}

export interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  roundNumber?: number;
}

export interface CategoryScores {
  argumentClarity: number;
  evidence: number;
  logicalReasoning: number;
  counterargument: number;
  rebuttal: number;
  historicalUnderstanding: number;
  perspectiveTaking: number;
}

export interface EvaluationResult {
  overallScore: number;
  categories: CategoryScores;
  strengths: string[];
  weaknesses: string[];
  keyMissedOpportunity: string;
  feedback: string;
  improvementSuggestion: string;
  retryChallenge: string;
}

export interface DebateAttempt {
  id: string;
  attemptNumber: number;
  timestamp: string;
  figureId: string;
  topicTitle: string;
  userPosition: string;
  mode: DebateMode;
  messages: Message[];
  evaluation: EvaluationResult;
}

export interface DebateSessionState {
  figureId: string;
  mode: DebateMode;
  topic: TopicOption;
  userPosition: string;
  currentRound: number;
  maxRounds: number;
  isComplete: boolean;
  messages: Message[];
  attempts: DebateAttempt[];
}
