import { NextRequest, NextResponse } from 'next/server';
import { generateDebateAgentResponse } from '@/lib/ai/debate-agent';
import { getFigureById } from '@/config/figures';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { figureId, topicId, userPosition, mode, messages } = body;

    const figure = getFigureById(figureId);
    if (!figure) {
      return NextResponse.json({ error: 'Historical figure not found' }, { status: 404 });
    }

    const topic = figure.topics.find((t) => t.id === topicId) || figure.topics[0];

    const replyText = await generateDebateAgentResponse(
      figure,
      topic,
      userPosition || topic.defaultPositionAgainst,
      mode || 'DEBATE',
      messages || []
    );

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error('API /api/debate error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate debate response' },
      { status: 500 }
    );
  }
}
