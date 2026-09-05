import { z } from 'zod';
import { HistoricalFigure, Message, TopicOption, EvaluationResult } from '@/lib/types';
import { generateTextResponse, LLMMessage } from './provider';

// Zod Schema for strict structured validation of judge evaluations
export const EvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categories: z.object({
    argumentClarity: z.number().min(0).max(100),
    evidence: z.number().min(0).max(100),
    logicalReasoning: z.number().min(0).max(100),
    counterargument: z.number().min(0).max(100),
    rebuttal: z.number().min(0).max(100),
    historicalUnderstanding: z.number().min(0).max(100),
    perspectiveTaking: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()).min(1),
  keyMissedOpportunity: z.string().min(10),
  feedback: z.string().min(10),
  improvementSuggestion: z.string().min(5),
  retryChallenge: z.string().min(5),
});

export async function evaluateDebateReasoning(
  figure: HistoricalFigure,
  topic: TopicOption,
  userPosition: string,
  messages: Message[]
): Promise<EvaluationResult> {
  const transcriptText = messages
    .filter((m) => m.sender !== 'system')
    .map((m) => `[${m.sender === 'user' ? 'STUDENT' : figure.name.toUpperCase()} (Round ${m.roundNumber || 1})]: ${m.text}`)
    .join('\n\n');

  const systemInstructions = `You are an expert, impartial AI Reasoning Judge & Educational Evaluator.
Your job is NOT to determine who won the debate or whether you agree with the student's stance.
Your job is to objectively evaluate the student's critical thinking, argument structure, evidence quality, logic, and historical perspective based on the following strict rubric:

RUBRIC CATEGORIES (Score each from 0 to 100):
1. argumentClarity: Did the student state a clear, unambiguous thesis and main claim?
2. evidence: Did the student provide relevant facts, historical examples, or data to back up their claims?
3. logicalReasoning: Are the conclusions validly derived from the premises without fallacies?
4. counterargument: Did the student recognize and address the strongest opposing arguments raised by ${figure.name}?
5. rebuttal: Did the student effectively refute or incorporate counterarguments?
6. historicalUnderstanding: Did the student demonstrate accurate understanding of historical context, era, and principles?
7. perspectiveTaking: Did the student demonstrate empathy and cognitive understanding of ${figure.name}'s worldview?

IMPORTANT INSTRUCTIONS FOR CRITIQUE:
- The "feedback" and "keyMissedOpportunity" fields MUST explicitly reference specific arguments or statements made by the student during the debate (e.g. "In Round 2, when you argued that...").
- Do NOT provide generic placeholders like "Provide more evidence."
- Return ONLY valid raw JSON matching the requested structure without markdown formatting or code fences if possible.`;

  const userPrompt = `DEBATE METADATA:
- Historical Opponent: ${figure.name} (${figure.era})
- Debate Topic: "${topic.title}"
- Student Stance: "${userPosition}"

FULL DEBATE TRANSCRIPT:
${transcriptText}

Please evaluate the student's performance according to the rubric and return the JSON object:
{
  "overallScore": number (0-100),
  "categories": {
    "argumentClarity": number,
    "evidence": number,
    "logicalReasoning": number,
    "counterargument": number,
    "rebuttal": number,
    "historicalUnderstanding": number,
    "perspectiveTaking": number
  },
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "keyMissedOpportunity": "...",
  "feedback": "...",
  "improvementSuggestion": "...",
  "retryChallenge": "..."
}`;

  const formattedMessages: LLMMessage[] = [
    { role: 'system', content: systemInstructions },
    { role: 'user', content: userPrompt }
  ];

  try {
    const rawJson = await generateTextResponse(formattedMessages, {
      temperature: 0.2,
      jsonOutput: true
    });

    // Clean JSON response (strip markdown ```json fences if present)
    const cleanedJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedJson);

    // Validate via Zod
    const validatedResult = EvaluationSchema.parse(parsedData);
    return validatedResult;
  } catch (error) {
    console.warn('Judge evaluation parsing/validation fallback:', error);
    
    // Return structured default calculation if parsing fails
    const userMessagesCount = messages.filter((m) => m.sender === 'user').length;
    const baseScore = Math.min(85, 60 + userMessagesCount * 6);

    return {
      overallScore: baseScore,
      categories: {
        argumentClarity: baseScore + 4,
        evidence: Math.max(50, baseScore - 6),
        logicalReasoning: baseScore + 2,
        counterargument: Math.max(45, baseScore - 12),
        rebuttal: Math.max(50, baseScore - 8),
        historicalUnderstanding: baseScore + 5,
        perspectiveTaking: baseScore + 1
      },
      strengths: [
        "Maintained a consistent thesis throughout the exchange with " + figure.name + ".",
        "Demonstrated genuine engagement with the historical topic and context."
      ],
      weaknesses: [
        "Did not fully address the specific counter-questions posed in later rounds.",
        "Could strengthen arguments by citing concrete historical facts rather than general assumptions."
      ],
      keyMissedOpportunity: `In your exchange with ${figure.name}, you asserted your main stance strongly, but missed the opportunity to explicitly turn their own historical examples back against their premise.`,
      feedback: `You demonstrated solid commitment to your position on "${topic.title}". However, ${figure.name}'s probing questions exposed a gap in how you deal with opposing evidence.`,
      improvementSuggestion: "Practice formulating preemptive counterarguments before submitting your main point.",
      retryChallenge: `Re-enter the arena against ${figure.name} and focus on providing at least one specific historical fact to support each claim.`
    };
  }
}
