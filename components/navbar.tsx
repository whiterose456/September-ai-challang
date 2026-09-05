'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Play, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  onStartDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartDemo }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center border border-amber-500/40 shadow-lg group-hover:border-amber-400 transition-all">
            <Landmark className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <span className="font-academic text-xl font-bold tracking-wider gold-gradient-text">
              AGORA
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-amber-500/80 font-medium">
              AI Historical Debate Simulator
            </span>
          </div>
        </Link>

        {/* Navigation links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/figures"
            className="hidden md:flex items-center gap-2 text-sm text-gray-300 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-800/50"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Historical Figures</span>
          </Link>

          {/* Demo Mode Button */}
          {onStartDemo ? (
            <button
              onClick={onStartDemo}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/50 px-3.5 py-1.5 rounded-full shadow-md hover:shadow-amber-500/20 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Demo Mode</span>
            </button>
          ) : (
            <Link
              href="/debate?demo=true"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/50 px-3.5 py-1.5 rounded-full shadow-md hover:shadow-amber-500/20 transition-all duration-300 transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Demo Mode</span>
            </Link>
          )}

          <Link
            href="/figures"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-4 py-1.5 rounded-md shadow-lg shadow-amber-500/20 transition-all duration-300 transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Debate</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
