import { HistoricalFigure, Message, TopicOption, EvaluationResult, DebateAttempt } from '@/lib/types';
import { HISTORICAL_FIGURES } from '@/config/figures';

export const DEMO_FIGURE: HistoricalFigure = HISTORICAL_FIGURES[0]; // Socrates
export const DEMO_TOPIC: TopicOption = HISTORICAL_FIGURES[0].topics[0]; // Democracy
export const DEMO_USER_POSITION = "Democracy hands authority to uninformed majorities rather than trained experts.";

export const DEMO_MESSAGES: Message[] = [
  {
    id: 'demo-msg-1',
    sender: 'agent',
    text: `Greetings, my young friend. You stand in the agora prepared to assert that democracy—the very institution of our beloved Athens—is an inferior mode of governance because it grants equal authority to the untrained masses. 

Tell me, if a merchant ship were setting sail across a treacherous sea in a storm, would you prefer the crew elect the captain by a show of hands among the sailors, or would you entrust the helm to a trained navigator who understands the stars, winds, and tides?`,
    timestamp: '10:00 AM',
    roundNumber: 1
  },
  {
    id: 'demo-msg-2',
    sender: 'user',
    text: `Obviously, I would choose the trained navigator! A storm requires expertise, not a popularity contest. That is precisely my point about democracy: governing a city-state is far more complex than sailing a ship, yet democracies let voters with no training in ethics, economics, or law choose our leaders.`,
    timestamp: '10:02 AM',
    roundNumber: 1
  },
  {
    id: 'demo-msg-3',
    sender: 'agent',
    text: `A compelling analogy! Yet consider this: who decides who is a true 'navigator' of statecraft? 

In an oligarchy or monarchy, a small group claims superior wisdom, yet history shows they often rule for their own self-interest rather than the common good. If the majority of citizens are excluded from governance, what stops the self-appointed 'experts' from becoming tyrants? Does not democracy, despite its flaws, protect against the abuse of undivided power?`,
    timestamp: '10:04 AM',
    roundNumber: 2
  },
  {
    id: 'demo-msg-4',
    sender: 'user',
    text: `While tyrants are a risk, demagogues in a democracy can be just as dangerous. Look at how easily voters can be swayed by emotional rhetoric and false promises. An ignorant majority can vote for unjust wars or vote to execute wise citizens—just as Athens voted to condemn you!`,
    timestamp: '10:07 AM',
    roundNumber: 2
  },
  {
    id: 'demo-msg-5',
    sender: 'agent',
    text: `Ah, you invoke my own trial! Indeed, the assembly voted in passion and error. But examine your premise closely: was the fault in the *structure* of majority voting itself, or in the lack of *education* among the citizens? 

If every citizen were trained from youth in philosophy, virtue, and critical reasoning, would democratic voting still produce ignorant demagoguery? Is your true objection against democracy, or against an uneducated populace?`,
    timestamp: '10:10 AM',
    roundNumber: 3
  },
  {
    id: 'demo-msg-6',
    sender: 'user',
    text: `Even with education, human beings are biased and self-interested. Universal wisdom is an unrealistic ideal. Therefore, a constitutional system with checks and balances or expert guardianship will always outperform pure democratic majority rule.`,
    timestamp: '10:12 AM',
    roundNumber: 3
  }
];

export const DEMO_EVALUATION: EvaluationResult = {
  overallScore: 82,
  categories: {
    argumentClarity: 88,
    evidence: 75,
    logicalReasoning: 85,
    counterargument: 80,
    rebuttal: 78,
    historicalUnderstanding: 90,
    perspectiveTaking: 78
  },
  strengths: [
    "Used the Socratic ship-of-state analogy effectively to establish your initial claim against untrained majority voting.",
    "Correctly identified demagoguery and historical Athenian assembly errors (referencing Socrates' own trial).",
    "Maintained clear focus on structural governance rather than resorting to emotional rhetoric."
  ],
  weaknesses: [
    "Yielded ground in Round 3 by conceding that universal education is impossible without providing alternative criteria for selecting guardians.",
    "Did not fully refute Socrates' point regarding how non-democratic experts can be prevented from devolving into selfish tyrants."
  ],
  keyMissedOpportunity: "In Round 3, when Socrates asked whether the fault lay in voting structure or citizen education, you argued that human bias makes universal wisdom impossible, but missed the opportunity to explain how institutional constitutional constraints preserve democratic participation while curbing mob passion.",
  feedback: "You demonstrated excellent historical understanding of ancient Athenian political tensions and effectively used Socrates' own trial as supporting evidence. Your reasoning was sharp, though your rebuttal in the final round left open questions about who defines 'expert guardianship'.",
  improvementSuggestion: "Define the specific mechanisms of your proposed alternative governance model rather than relying solely on pointing out democracy's flaws.",
  retryChallenge: "Re-enter the debate with Socrates and propose a specific constitutional hybrid model (e.g. representative republic with rule of law) to counter his critique of expert tyranny."
};

export const DEMO_ATTEMPT_1: DebateAttempt = {
  id: 'demo-attempt-1',
  attemptNumber: 1,
  timestamp: new Date().toISOString(),
  figureId: 'socrates',
  topicTitle: 'Is democracy the best form of government?',
  userPosition: DEMO_USER_POSITION,
  mode: 'DEBATE',
  messages: DEMO_MESSAGES,
  evaluation: DEMO_EVALUATION
};
