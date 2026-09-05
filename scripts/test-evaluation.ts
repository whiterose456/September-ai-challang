import { EvaluationSchema } from '../lib/ai/judge-agent';

const mockSampleEvaluation = {
  overallScore: 84,
  categories: {
    argumentClarity: 88,
    evidence: 78,
    logicalReasoning: 85,
    counterargument: 80,
    rebuttal: 82,
    historicalUnderstanding: 90,
    perspectiveTaking: 85
  },
  strengths: [
    "Formulated a clear initial claim.",
    "Used classical Socratic analogies."
  ],
  weaknesses: [
    "Left premise vulnerable in round 2."
  ],
  keyMissedOpportunity: "In round 2, failed to turn opponent's example back against their premise.",
  feedback: "Overall strong performance demonstrating clear critical thinking.",
  improvementSuggestion: "Support claims with specific empirical evidence.",
  retryChallenge: "Re-enter the debate and focus on addressing expert tyranny."
};

try {
  const result = EvaluationSchema.parse(mockSampleEvaluation);
  console.log('✓ EvaluationSchema validation passed successfully!');
  console.log('Parsed score:', result.overallScore);
} catch (e) {
  console.error('✗ EvaluationSchema validation failed:', e);
  process.exit(1);
}
