'use client';

import React from 'react';
import { HistoricalFigure, TopicOption } from '@/lib/types';
import { RefreshCw, X, ShieldAlert, ArrowRight, Brain } from 'lucide-react';

interface SwitchSidesModalProps {
  figure: HistoricalFigure;
  topic: TopicOption;
  currentPosition: string;
  onClose: () => void;
  onConfirmSwitch: (newPosition: string) => void;
}

export const SwitchSidesModal: React.FC<SwitchSidesModalProps> = ({
  figure,
  topic,
  currentPosition,
  onClose,
  onConfirmSwitch,
}) => {
  // Flip position: if user was against, set to for; if user was for, set to against
  const isCurrentlyAgainst = currentPosition === topic.defaultPositionAgainst;

  const newPosition = isCurrentlyAgainst
    ? topic.defaultPositionFor
    : topic.defaultPositionAgainst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-amber-500/40 overflow-hidden shadow-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-academic text-xl font-bold text-gray-100 gold-gradient-text">
                PERSPECTIVE SHIFT
              </h2>
              <p className="text-xs text-amber-500 font-medium">Critical Thinking Exercise</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-950/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Brain className="w-4 h-4 text-amber-400" />
              <span>Can you defend an idea you disagree with?</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              True cognitive flexibility requires testing your mind against your own biases. In this attempt, you will argue the exact opposite stance on <span className="text-amber-200 font-semibold">"{topic.title}"</span>.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 text-rose-200">
              <span className="font-bold block text-[10px] text-rose-400 uppercase tracking-wider">Previous Position:</span>
              <span>"{currentPosition}"</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-200">
              <span className="font-bold block text-[10px] text-emerald-400 uppercase tracking-wider">New Position (You will now defend):</span>
              <span>"{newPosition}"</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirmSwitch(newPosition)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Switch Sides & Begin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
