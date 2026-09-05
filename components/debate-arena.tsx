'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { HistoricalFigure, TopicOption, Message, DebateMode } from '@/lib/types';
import { Send, Sparkles, Award, ShieldAlert, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';

interface DebateArenaProps {
  figure: HistoricalFigure;
  topic: TopicOption;
  userPosition: string;
  mode: DebateMode;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onConcludeDebate: () => void;
  onBackToSelection: () => void;
}

export const DebateArena: React.FC<DebateArenaProps> = ({
  figure,
  topic,
  userPosition,
  mode,
  messages,
  isLoading,
  onSendMessage,
  onConcludeDebate,
  onBackToSelection,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDebate = mode === 'DEBATE';
  const currentRound = Math.max(1, Math.floor(messages.length / 2));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-5xl mx-auto px-4 py-4">
      
      {/* Top Header & Context Bar */}
      <div className="glass-panel rounded-xl p-4 mb-4 border border-amber-900/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSelection}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            title="Back to Figure Selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/40">
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
              <h2 className="font-academic text-lg font-bold text-gray-100">{figure.name}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 uppercase font-semibold tracking-wider">
                {mode}
              </span>
            </div>
            <p className="text-xs text-amber-500 line-clamp-1 font-medium">{topic.title}</p>
          </div>
        </div>

        {/* Round Counter & End Button */}
        <div className="flex items-center gap-3">
          {isDebate && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-900 border border-amber-500/30 text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Round {currentRound} of 5</span>
            </div>
          )}

          <button
            onClick={onConcludeDebate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>End & Grade Debate</span>
          </button>
        </div>
      </div>

      {/* User Position Banner */}
      {isDebate && (
        <div className="px-4 py-2.5 mb-4 rounded-lg bg-gray-900/60 border border-amber-950/50 text-xs text-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px]">Your Stance:</span>
            <span className="italic text-amber-100 font-medium line-clamp-1">"{userPosition}"</span>
          </div>
        </div>
      )}

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 py-4 rounded-xl glass-card border border-gray-800/80">
        
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}
            >
              {/* Avatar */}
              {!isUser ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 flex-shrink-0 mt-1">
                  <Image
                    src={figure.avatar}
                    alt={figure.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400/50 flex items-center justify-center text-gray-950 font-bold text-sm flex-shrink-0 mt-1 shadow-md">
                  YOU
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-amber-950/50 border border-amber-500/40 text-amber-50 rounded-tr-none shadow-md'
                    : 'bg-gray-900/90 border border-gray-700/80 text-gray-100 rounded-tl-none shadow-md font-academic'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-[11px] font-sans font-semibold text-amber-400/90">
                    <span>{figure.name}</span>
                    {msg.roundNumber && <span>Round {msg.roundNumber}</span>}
                  </div>
                )}

                <p className="whitespace-pre-wrap">{msg.text}</p>
                
                <span className="block mt-2 text-[10px] text-gray-500 text-right font-sans">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* AI Typing Status */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 flex-shrink-0">
              <Image
                src={figure.avatar}
                alt={figure.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-700/80 text-gray-300 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>{figure.name} is formulating a counterargument...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          placeholder={
            isDebate
              ? `Defend your thesis against ${figure.name}...`
              : `Ask ${figure.name} a question...`
          }
          className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-amber-900/40 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
        />

        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-6 py-3 rounded-xl text-sm font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Historical Simulation Disclaimer */}
      <div className="mt-2 text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-500/70" />
        <span>
          These responses are AI-generated simulations based on historical sources and should not be interpreted as actual quotations.
        </span>
      </div>
    </div>
  );
};
