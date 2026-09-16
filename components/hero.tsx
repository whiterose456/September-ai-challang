'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Sparkles, BookOpen, ShieldCheck, Scale, Brain, Award, ArrowRight, Zap, Target } from 'lucide-react';

interface HeroProps {
  onStartDemo: () => void;
  onExploreFigures: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDemo, onExploreFigures }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 animated-bg">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full filter blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Floating Particles */}
      <div className="floating-particle" style={{ top: '20%', left: '10%' }}>
        <div className="w-2 h-2 bg-amber-400/30 rounded-full blur-sm" />
      </div>
      <div className="floating-particle" style={{ top: '60%', left: '85%', animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-blue-400/20 rounded-full blur-sm" />
      </div>
      <div className="floating-particle" style={{ top: '80%', left: '30%', animationDelay: '4s' }}>
        <div className="w-2 h-2 bg-purple-400/25 rounded-full blur-sm" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-10">
        
        {/* Top Tagline Pill - Enhanced */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-widest shadow-2xl shadow-amber-500/20 animate-fadeIn card-shine">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">"Argue with history. Learn to think."</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        </div>

        {/* Main Hero Headline - Enhanced with larger size */}
        <h1 className="font-academic text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight gold-gradient-text leading-tight drop-shadow-2xl">
          ARGUE WITH<br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent">HISTORY.</span>
        </h1>

        {/* Subheading - Enhanced */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed font-light animate-fadeIn animate-stagger-1">
          Step into the arena with history's greatest thinkers. 
          <span className="text-amber-400 font-medium"> Defend your ideas.</span> 
          <span className="text-blue-400 font-medium"> Challenge theirs.</span> 
          <span className="text-purple-400 font-medium"> Learn how to reason better.</span>
        </p>

        {/* CTAs - Enhanced with better visual hierarchy */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-6 animate-fadeIn animate-stagger-2">
          <button
            onClick={onExploreFigures}
            className="btn-primary group relative flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-gray-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 shadow-2xl shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            <span>Start a Debate</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onStartDemo}
            className="group relative flex items-center gap-2.5 px-8 py-5 rounded-2xl text-lg font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border-2 border-amber-500/50 hover:border-amber-400 shadow-xl shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Zap className="w-5 h-5 text-amber-400 group-hover:animate-pulse" />
            <span>Try Demo Mode</span>
          </button>

          <button
            onClick={onExploreFigures}
            className="group flex items-center gap-2.5 px-7 py-5 rounded-2xl text-lg font-semibold text-gray-300 bg-gray-900/80 hover:bg-gray-800 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            <BookOpen className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
            <span>Explore Figures</span>
          </button>
        </div>

        {/* Stats Bar - New Addition */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 animate-fadeIn animate-stagger-3">
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient-text">5+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Historical Figures</div>
          </div>
          <div className="w-px h-12 bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient-text">10+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Debate Topics</div>
          </div>
          <div className="w-px h-12 bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient-text">7</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Evaluation Metrics</div>
          </div>
        </div>

        {/* Feature Grid Highlights - Enhanced cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-20 text-left animate-fadeIn animate-stagger-4">
          
          <div className="group p-6 rounded-2xl glass-card border border-gray-800 hover:border-amber-500/50 space-y-3 card-shine">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-950/80 to-amber-900/60 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-amber-500/20">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-academic text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors">Historical AI Personas</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Debate Socrates, Einstein, Curie, Lincoln, and Da Vinci in era-authentic character.
            </p>
          </div>

          <div className="group p-6 rounded-2xl glass-card border border-gray-800 hover:border-blue-500/50 space-y-3 card-shine">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-950/80 to-blue-900/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-academic text-lg font-bold text-gray-100 group-hover:text-blue-300 transition-colors">Independent AI Judge</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Separated grading agent evaluates your logic, evidence, and rebuttals objectively.
            </p>
          </div>

          <div className="group p-6 rounded-2xl glass-card border border-gray-800 hover:border-purple-500/50 space-y-3 card-shine">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-950/80 to-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-academic text-lg font-bold text-gray-100 group-hover:text-purple-300 transition-colors">7-Metric Rubric</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive structured 0–100 scores across clarity, proof, historical understanding & perspective.
            </p>
          </div>

          <div className="group p-6 rounded-2xl glass-card border border-gray-800 hover:border-emerald-500/50 space-y-3 card-shine">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-950/80 to-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-academic text-lg font-bold text-gray-100 group-hover:text-emerald-300 transition-colors">Perspective Shift</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Switch sides after debating to defend the opposing view as a critical thinking exercise.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
