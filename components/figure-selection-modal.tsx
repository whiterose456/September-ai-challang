'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HistoricalFigure, TopicOption, DebateMode } from '@/lib/types';
import { X, Swords, HelpCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface FigureSelectionModalProps {
  figure: HistoricalFigure | null;
  onClose: () => void;
  onStartDebate: (
    figure: HistoricalFigure,
    topic: TopicOption,
    position: string,
    mode: DebateMode
  ) => void;
}

export const FigureSelectionModal: React.FC<FigureSelectionModalProps> = ({
  figure,
  onClose,
  onStartDebate,
}) => {
  if (!figure) return null;

  const [selectedMode, setSelectedMode] = useState<DebateMode>('DEBATE');
  const [selectedTopic, setSelectedTopic] = useState<TopicOption>(figure.topics[0]);
  const [positionType, setPositionType] = useState<'for' | 'against' | 'custom'>('against');
  const [customPosition, setCustomPosition] = useState('');

  const activePosition =
    positionType === 'for'
      ? selectedTopic.defaultPositionFor
      : positionType === 'against'
      ? selectedTopic.defaultPositionAgainst
      : customPosition || selectedTopic.defaultPositionAgainst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartDebate(figure, selectedTopic, activePosition, selectedMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-amber-500/30 overflow-hidden max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-start justify-between bg-gray-900/60">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0">
              <Image
                src={figure.avatar}
                alt={figure.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-academic text-2xl font-bold text-gray-100">{figure.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/50">
                  {figure.era}
                </span>
              </div>
              <p className="text-xs text-amber-500 font-medium">{figure.title}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{figure.debateStyle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Mode Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
              1. Select Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMode('DEBATE')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedMode === 'DEBATE'
                    ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-200">
                    <Swords className="w-4 h-4 text-amber-500" />
                    <span>Mode A: Debate</span>
                  </div>
                  {selectedMode === 'DEBATE' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-gray-400">
                  Take a stance. The AI challenges your logic over 4–6 rounds and grades your reasoning.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('INTERVIEW')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedMode === 'INTERVIEW'
                    ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-200">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>Mode B: Interview</span>
                  </div>
                  {selectedMode === 'INTERVIEW' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-gray-400">
                  Ask probing questions. Explore historical worldview and request questioning quality feedback.
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Topic Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
              2. Choose Debate Topic
            </label>
            <div className="space-y-2">
              {figure.topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedTopic.id === t.id
                      ? 'bg-gray-800/80 border-amber-500'
                      : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-sm text-gray-200">
                    <span>{t.title}</span>
                    {selectedTopic.id === t.id && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{t.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Stance / Position Selection (For DEBATE mode) */}
          {selectedMode === 'DEBATE' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                3. Your Stance / Position
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 cursor-pointer hover:border-gray-700">
                  <input
                    type="radio"
                    name="position"
                    checked={positionType === 'against'}
                    onChange={() => setPositionType('against')}
                    className="mt-1 accent-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-300">Option 1 (Opposing Stance):</span>
                    <p className="text-xs text-gray-300 mt-0.5">{selectedTopic.defaultPositionAgainst}</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 cursor-pointer hover:border-gray-700">
                  <input
                    type="radio"
                    name="position"
                    checked={positionType === 'for'}
                    onChange={() => setPositionType('for')}
                    className="mt-1 accent-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-300">Option 2 (Affirmative Stance):</span>
                    <p className="text-xs text-gray-300 mt-0.5">{selectedTopic.defaultPositionFor}</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 cursor-pointer hover:border-gray-700">
                  <input
                    type="radio"
                    name="position"
                    checked={positionType === 'custom'}
                    onChange={() => setPositionType('custom')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-amber-300">Custom Position:</span>
                    {positionType === 'custom' && (
                      <input
                        type="text"
                        placeholder="State your unique claim..."
                        value={customPosition}
                        onChange={(e) => setCustomPosition(e.target.value)}
                        className="w-full mt-2 px-3 py-1.5 rounded bg-gray-950 border border-amber-500/40 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Enter Arena</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
