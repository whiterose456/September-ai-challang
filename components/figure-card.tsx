'use client';

import React from 'react';
import Image from 'next/image';
import { HistoricalFigure } from '@/lib/types';
import { Sparkles, MessageSquareQuote, ArrowRight, ShieldAlert } from 'lucide-react';

interface FigureCardProps {
  figure: HistoricalFigure;
  onSelect: (figure: HistoricalFigure) => void;
}

export const FigureCard: React.FC<FigureCardProps> = ({ figure, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(figure)}
      className="group relative glass-card rounded-xl p-6 border border-gray-800 hover:border-amber-500/50 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
    >
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header with Avatar & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/40 group-hover:border-amber-400 group-hover:scale-105 transition-all shadow-md">
            <Image
              src={figure.avatar}
              alt={figure.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h3 className="font-academic text-xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors">
              {figure.name}
            </h3>
            <p className="text-xs font-semibold text-amber-500/90">{figure.title}</p>
            <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
              {figure.era}
            </span>
          </div>
        </div>

        {/* Short Quote */}
        <div className="mb-4 p-3 rounded-lg bg-gray-900/60 border border-amber-950/40 italic text-xs text-amber-100/90 flex gap-2">
          <MessageSquareQuote className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>"{figure.quote}"</span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {figure.shortBio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {figure.expertise.map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300/90 border border-amber-800/40"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-amber-300">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{figure.topics.length} Debate Topics</span>
        </span>
        <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Debate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
