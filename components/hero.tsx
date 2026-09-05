'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Sparkles, BookOpen, ShieldCheck, Scale, Brain, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartDemo: () => void;
  onExploreFigures: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDemo, onExploreFigures }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest shadow-lg animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>"Argue with history. Learn to think."</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="font-academic text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-100 gold-gradient-text leading-tight">
          ARGUE WITH HISTORY.
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light">
          Step into the arena with history's greatest thinkers. Defend your ideas. Challenge theirs. Learn how to reason better.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreFigures}
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start a Debate</span>
          </button>

          <button
            onClick={onStartDemo}
            className="flex items-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/50 shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Try Demo Mode</span>
          </button>

          <button
            onClick={onExploreFigures}
            className="flex items-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-gray-300 bg-gray-900/80 hover:bg-gray-800 border border-gray-700 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Explore Historical Figures</span>
          </button>
        </div>

        {/* Feature Grid Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-16 text-left">
          
          <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-academic text-base font-bold text-gray-100">Historical AI Personas</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Debate Socrates, Einstein, Curie, Lincoln, and Da Vinci in era-authentic character.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-academic text-base font-bold text-gray-100">Independent AI Judge</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Separated grading agent evaluates your logic, evidence, and rebuttals objectively.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-academic text-base font-bold text-gray-100">7-Metric Rubric</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive structured 0–100 scores across clarity, proof, historical understanding & perspective.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-academic text-base font-bold text-gray-100">Perspective Shift</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Switch sides after debating to defend the opposing view as a critical thinking exercise.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
