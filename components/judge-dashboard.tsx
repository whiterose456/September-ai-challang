'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EvaluationResult, HistoricalFigure, TopicOption, DebateAttempt } from '@/lib/types';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  RotateCcw,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface JudgeDashboardProps {
  evaluation: EvaluationResult;
  figure: HistoricalFigure;
  topic: TopicOption;
  userPosition: string;
  previousAttempts: DebateAttempt[]; // Previous attempts prior to this attempt
  currentAttemptNumber: number;
  onRetry: () => void;
  onSwitchSides: () => void;
  onExploreFigures: () => void;
}

export const JudgeDashboard: React.FC<JudgeDashboardProps> = ({
  evaluation,
  figure,
  topic,
  userPosition,
  previousAttempts,
  currentAttemptNumber,
  onRetry,
  onSwitchSides,
  onExploreFigures,
}) => {
  // Trigger celebratory confetti if score >= 75
  useEffect(() => {
    if (evaluation.overallScore >= 75) {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#d97706', '#fef3c7', '#3b82f6']
      });
    }
  }, [evaluation.overallScore]);

  // Calculate score improvement vs previous attempt if user has retried
  const priorAttempt = previousAttempts.length > 0 ? previousAttempts[0] : null;
  const previousScore = priorAttempt ? priorAttempt.evaluation.overallScore : null;
  const scoreDiff = previousScore !== null ? evaluation.overallScore - previousScore : null;

  const categories = [
    { key: 'argumentClarity', label: 'Argument Clarity', score: evaluation.categories.argumentClarity },
    { key: 'evidence', label: 'Evidence & Proof', score: evaluation.categories.evidence },
    { key: 'logicalReasoning', label: 'Logical Consistency', score: evaluation.categories.logicalReasoning },
    { key: 'counterargument', label: 'Counterargument Handling', score: evaluation.categories.counterargument },
    { key: 'rebuttal', label: 'Rebuttal Execution', score: evaluation.categories.rebuttal },
    { key: 'historicalUnderstanding', label: 'Historical Context', score: evaluation.categories.historicalUnderstanding },
    { key: 'perspectiveTaking', label: 'Perspective Taking', score: evaluation.categories.perspectiveTaking },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/40 text-xs font-semibold uppercase tracking-widest">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Independent AI Reasoning Judge</span>
        </div>
        
        <h1 className="font-academic text-3xl sm:text-4xl font-bold text-gray-100 gold-gradient-text">
          DEBATE EVALUATION COMPLETE
        </h1>
        
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Evaluated against {figure.name} on topic: <span className="text-amber-300 font-medium">"{topic.title}"</span>
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-3xl -z-10" />

        {/* Overall Score Circle */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-950/80 border-4 border-amber-500 flex flex-col items-center justify-center shadow-xl shadow-amber-500/10">
            <span className="font-academic text-5xl font-extrabold text-amber-300">
              {evaluation.overallScore}
            </span>
            <span className="text-[11px] text-amber-400/80 uppercase tracking-widest font-semibold mt-1">
              / 100
            </span>
          </div>

          {/* Attempt & Score Progress Badges */}
          <div className="mt-3 flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800">
              Attempt #{currentAttemptNumber}
            </span>

            {scoreDiff !== null && (
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  scoreDiff >= 0
                    ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950/90 text-rose-400 border border-rose-800'
                }`}
              >
                {scoreDiff >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {scoreDiff >= 0 ? `+${scoreDiff} improvement` : `${scoreDiff} points vs Attempt #${currentAttemptNumber - 1}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-academic text-xl font-bold text-amber-200">Executive Reasoning Judge Synthesis</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed bg-gray-900/60 p-4 rounded-xl border border-gray-800">
              {evaluation.feedback}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="px-3 py-1 rounded-md bg-gray-900 border border-gray-800 text-gray-400">
              Stance: <span className="text-gray-200 font-semibold">"{userPosition}"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Category Score Cards */}
      <div className="space-y-3">
        <h3 className="font-academic text-lg font-bold text-gray-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>7-Metric Critical Thinking Rubric</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="p-4 rounded-xl glass-card border border-gray-800 flex items-center justify-between"
            >
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-200">{cat.label}</span>
                  <span className="text-amber-400">{cat.score} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-900 overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000 rounded-full"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualitative Breakdown: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="p-6 rounded-2xl glass-card border border-emerald-950/60 bg-emerald-950/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base font-academic">
            <CheckCircle2 className="w-5 h-5" />
            <span>What You Did Well</span>
          </div>

          <ul className="space-y-2.5">
            {evaluation.strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl glass-card border border-amber-950/60 bg-amber-950/10 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base font-academic">
            <AlertTriangle className="w-5 h-5" />
            <span>Where You Lost Points</span>
          </div>

          <ul className="space-y-2.5">
            {evaluation.weaknesses.map((weak, idx) => (
              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Missed Opportunity Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-gray-900 to-amber-950/40 border border-amber-500/40 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-base font-academic">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>The Argument You Missed</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic">
          "{evaluation.keyMissedOpportunity}"
        </p>
      </div>

      {/* Next Challenge Box */}
      <div className="p-6 rounded-2xl glass-panel border border-amber-500/50 space-y-3 text-center">
        <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Target className="w-4 h-4" />
          <span>Your Next Challenge</span>
        </div>
        <p className="text-sm font-semibold text-gray-100 max-w-2xl mx-auto">
          {evaluation.retryChallenge}
        </p>
      </div>

      {/* CTAs */}
      <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-center gap-4">
        
        {/* Try Again */}
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all transform active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again (Attempt #{currentAttemptNumber + 1})</span>
        </button>

        {/* Switch Sides */}
        <button
          onClick={onSwitchSides}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 shadow-lg transition-all transform active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Switch Sides</span>
        </button>

        {/* Explore Other Figures */}
        <button
          onClick={onExploreFigures}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-300 bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span>Explore Other Figures</span>
        </button>

      </div>

    </div>
  );
};
