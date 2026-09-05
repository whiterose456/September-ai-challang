'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { FigureSelectionModal } from '@/components/figure-selection-modal';
import { HISTORICAL_FIGURES } from '@/config/figures';
import { HistoricalFigure, TopicOption, DebateMode } from '@/lib/types';
import { BookOpen, Sparkles, ArrowLeft, Swords, HelpCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FiguresPage() {
  const router = useRouter();
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

  const handleStartDebate = (
    figure: HistoricalFigure,
    topic: TopicOption,
    position: string,
    mode: DebateMode
  ) => {
    // Navigate home with figure and topic state or open directly
    router.push(`/?figure=${figure.id}&topic=${topic.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        
        {/* Header */}
        <div className="mb-10 space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="font-academic text-4xl font-extrabold text-gray-100 gold-gradient-text">
            HISTORICAL THINKERS & PHILOSOPHERS
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl">
            Explore the worldviews, debate styles, and curated topics of history's greatest minds.
          </p>
        </div>

        {/* Detailed Figures Roster */}
        <div className="space-y-8">
          {HISTORICAL_FIGURES.map((figure) => (
            <div
              key={figure.id}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-gray-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row gap-8 shadow-xl"
            >
              {/* Left Column: Avatar & Quick Info */}
              <div className="flex flex-col items-center text-center md:text-left md:items-start w-full md:w-64 flex-shrink-0">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-lg mb-4">
                  <Image
                    src={figure.avatar}
                    alt={figure.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="font-academic text-2xl font-bold text-gray-100">{figure.name}</h3>
                <span className="text-xs font-semibold text-amber-400 mt-0.5">{figure.title}</span>
                <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700 font-mono">
                  {figure.era}
                </span>

                <button
                  onClick={() => setSelectedFigure(figure)}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Swords className="w-4 h-4" />
                  <span>Challenge {figure.name}</span>
                </button>
              </div>

              {/* Right Column: Bio & Topics */}
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-academic text-base font-bold text-amber-200 mb-2">Biography & Worldview</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    {figure.fullBio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Debate Style</h5>
                    <p className="text-xs text-gray-300 leading-relaxed bg-gray-900/30 p-3 rounded-lg border border-gray-800">
                      {figure.debateStyle}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Areas of Expertise</h5>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {figure.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/40"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topics List */}
                <div>
                  <h4 className="font-academic text-base font-bold text-amber-200 mb-3">Featured Debate Topics</h4>
                  <div className="space-y-2">
                    {figure.topics.map((t) => (
                      <div
                        key={t.id}
                        className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-between group hover:border-amber-500/40 transition-colors"
                      >
                        <div>
                          <h5 className="text-xs font-bold text-gray-200 group-hover:text-amber-300 transition-colors">
                            {t.title}
                          </h5>
                          <p className="text-[11px] text-gray-400 mt-0.5">{t.description}</p>
                        </div>

                        <button
                          onClick={() => setSelectedFigure(figure)}
                          className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4 cursor-pointer"
                        >
                          <span>Select</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </main>

      <FigureSelectionModal
        figure={selectedFigure}
        onClose={() => setSelectedFigure(null)}
        onStartDebate={handleStartDebate}
      />
    </div>
  );
}
