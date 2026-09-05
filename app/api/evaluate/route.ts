import { NextRequest, NextResponse } from 'next/server';
import { evaluateDebateReasoning } from '@/lib/ai/judge-agent';
import { getFigureById } from '@/config/figures';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { figureId, topicId, userPosition, messages } = body;

    const figure = getFigureById(figureId);
    if (!figure) {
      return NextResponse.json({ error: 'Historical figure not found' }, { status: 404 });
    }

    const topic = figure.topics.find((t) => t.id === topicId) || figure.topics[0];

    const evaluation = await evaluateDebateReasoning(
      figure,
      topic,
      userPosition || topic.defaultPositionAgainst,
      messages || []
    );

    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error('API /api/evaluate error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate evaluation' },
      { status: 500 }
    );
  }
}
