import { HistoricalFigure, Message, TopicOption, DebateMode } from '@/lib/types';
import { generateTextResponse, LLMMessage } from './provider';

export async function generateDebateAgentResponse(
  figure: HistoricalFigure,
  topic: TopicOption,
  userPosition: string,
  mode: DebateMode,
  conversationHistory: Message[]
): Promise<string> {
  const isDebate = mode === 'DEBATE';

  const systemInstructions = `${figure.systemInstructions}

CURRENT DEBATE CONTEXT:
- Mode: ${mode}
- Topic: "${topic.title}"
- Topic Context: ${topic.context}
- Student's Position/Stance: "${userPosition}"
- Your Role: You are ${figure.name}. ${
    isDebate
      ? `You must challenge the student's stance ("${userPosition}") while defending a nuanced historical perspective. DO NOT simply agree with the student. Expose flaws, ask counter-questions, and demand evidence.`
      : `You are being interviewed by a modern student. Answer their questions accurately in character, reflecting your worldview and era's knowledge.`
  }

STRICT GUIDELINES:
1. Stay strictly in character as ${figure.name} (${figure.era}).
2. Keep responses focused, intellectually stimulating, and concise (2-4 paragraphs max).
3. Do NOT use modern slang, meta-AI phrases like "As an AI...", or break persona.
4. ${
    isDebate
      ? `Always end your response with a sharp, probing follow-up question or counterargument that forces the student to defend their reasoning.`
      : `Invite the student to ask deeper questions about your life, philosophy, or discoveries.`
  }`;

  const formattedMessages: LLMMessage[] = [
    { role: 'system', content: systemInstructions }
  ];

  // Include conversation turns
  conversationHistory.forEach((msg) => {
    if (msg.sender === 'user') {
      formattedMessages.push({ role: 'user', content: msg.text });
    } else if (msg.sender === 'agent') {
      formattedMessages.push({ role: 'model', content: msg.text });
    }
  });

  // If no user messages yet, prompt the agent to start the debate or interview
  if (formattedMessages.length === 1) {
    formattedMessages.push({
      role: 'user',
      content: isDebate
        ? `I am ready to debate you on the topic: "${topic.title}". My position is: "${userPosition}". Please present your opening challenge.`
        : `Greetings ${figure.name}. I am eager to interview you today about your life and work on "${topic.title}".`
    });
  }

  const responseText = await generateTextResponse(formattedMessages, {
    temperature: 0.7,
  });

  return responseText;
}
