'use client';

import React from 'react';
import Image from 'next/image';
import { HistoricalFigure } from '@/lib/types';
import { Sparkles, MessageSquareQuote, ArrowRight, ShieldAlert, Swords, BookOpen } from 'lucide-react';

interface FigureCardProps {
  figure: HistoricalFigure;
  onSelect: (figure: HistoricalFigure) => void;
}

export const FigureCard: React.FC<FigureCardProps> = ({ figure, onSelect }) => {
  // Dynamic accent color based on figure
  const accentColors: Record<string, string> = {
    socrates: 'from-amber-500 to-amber-700',
    einstein: 'from-blue-500 to-blue-700',
    curie: 'from-emerald-500 to-emerald-700',
    lincoln: 'from-red-500 to-red-700',
    'da-vinci': 'from-purple-500 to-purple-700'
  };
  
  const accentColor = accentColors[figure.id] || 'from-amber-500 to-amber-700';
  const glowColor = figure.accentColor || '#d97706';

  return (
    <div
      onClick={() => onSelect(figure)}
      className="group relative glass-card rounded-2xl p-6 border border-gray-800 hover:border-opacity-60 card-shine cursor-pointer transition-all duration-500 transform hover:-translate-y-2"
      style={{ 
        borderColor: `rgba(${glowColor}, 0.3)`,
        boxShadow: `0 0 20px rgba(${glowColor.replace('0x', '').slice(0, -6)}, 0.1)`
      }}
    >
      {/* Animated Top Banner Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accentColor} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      
      {/* Glow Effect on Hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Header with Avatar & Title - Enhanced */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 group-hover:border-4 transition-all duration-500 shadow-xl group-hover:shadow-2xl" style={{ borderColor: glowColor }}>
            <Image
              src={figure.avatar}
              alt={figure.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            {/* Rotating Border Effect */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-academic text-2xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors duration-300">
              {figure.name}
            </h3>
            <p className="text-xs font-semibold text-amber-500/90 mb-1">{figure.title}</p>
            <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-gray-700 font-medium">
              {figure.era}
            </span>
          </div>
        </div>

        {/* Short Quote - Enhanced */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border-l-4 italic text-xs text-amber-100/90 leading-relaxed flex gap-3" style={{ borderLeftColor: glowColor }}>
          <MessageSquareQuote className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-3">"{figure.quote}"</span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-gray-300 mb-5 line-clamp-2 leading-relaxed">
          {figure.shortBio}
        </p>

        {/* Expertise Tags - Enhanced */}
        <div className="flex flex-wrap gap-2 mb-5">
          {figure.expertise.map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-950/60 to-amber-900/40 text-amber-300/90 border border-amber-800/40 group-hover:border-amber-500/60 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA - Enhanced */}
      <div className="pt-5 border-t border-gray-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accentColor} flex items-center justify-center text-white shadow-lg`}>
            <Swords className="w-4 h-4" />
          </div>
          <span>{figure.topics.length} Debate Topics</span>
        </div>
        <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Challenge</span>
          <ArrowRight className="w-5 h-5 text-amber-500 group-hover:text-amber-300" />
        </div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <BookOpen className="w-4 h-4 text-amber-500/50" />
      </div>
    </div>
  );
};
