'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { FigureCard } from '@/components/figure-card';
import { FigureSelectionModal } from '@/components/figure-selection-modal';
import { DebateArena } from '@/components/debate-arena';
import { JudgeDashboard } from '@/components/judge-dashboard';
import { SwitchSidesModal } from '@/components/switch-sides-modal';

import { HISTORICAL_FIGURES, getFigureById } from '@/config/figures';
import {
  HistoricalFigure,
  TopicOption,
  Message,
  DebateMode,
  EvaluationResult,
  DebateAttempt
} from '@/lib/types';
import {
  DEMO_FIGURE,
  DEMO_TOPIC,
  DEMO_USER_POSITION,
  DEMO_MESSAGES,
  DEMO_EVALUATION,
  DEMO_ATTEMPT_1
} from '@/lib/demo-data';
import { saveAttempt, getPreviousAttemptsForTopic } from '@/lib/storage';
import { BookOpen } from 'lucide-react';

type AppStep = 'LANDING' | 'ARENA' | 'RESULTS';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [modalFigure, setModalFigure] = useState<HistoricalFigure | null>(null);

  const [activeTopic, setActiveTopic] = useState<TopicOption>(HISTORICAL_FIGURES[0].topics[0]);
  const [userPosition, setUserPosition] = useState<string>('');
  const [debateMode, setDebateMode] = useState<DebateMode>('DEBATE');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<DebateAttempt[]>([]);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(1);
  const [isSwitchSidesOpen, setIsSwitchSidesOpen] = useState<boolean>(false);

  // Parse URL query parameters (?demo=true, ?figure=socrates&topic=democracy)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('demo') === 'true') {
        launchDemoMode();
      } else {
        const figureId = urlParams.get('figure');
        if (figureId) {
          const fig = getFigureById(figureId);
          if (fig) {
            setModalFigure(fig);
            const topicId = urlParams.get('topic');
            if (topicId) {
              const top = fig.topics.find((t) => t.id === topicId);
              if (top) setActiveTopic(top);
            }
          }
        }
      }
    }
  }, []);

  // Handler: Start Demo Mode (Socrates vs Student on Democracy)
  const launchDemoMode = () => {
    setSelectedFigure(DEMO_FIGURE);
    setActiveTopic(DEMO_TOPIC);
    setUserPosition(DEMO_USER_POSITION);
    setDebateMode('DEBATE');
    setMessages(DEMO_MESSAGES);
    setEvaluation(DEMO_EVALUATION);
    setPreviousAttempts([]);
    setCurrentAttemptNumber(1);
    setCurrentStep('RESULTS'); // Load immediate evaluation report
  };

  // Handler: Select figure to configure debate
  const handleSelectFigure = (figure: HistoricalFigure) => {
    setModalFigure(figure);
  };

  // Handler: Start debate session from modal configuration
  const handleStartDebate = async (
    figure: HistoricalFigure,
    topic: TopicOption,
    position: string,
    mode: DebateMode
  ) => {
    setSelectedFigure(figure);
    setActiveTopic(topic);
    setUserPosition(position);
    setDebateMode(mode);
    setModalFigure(null);
    setEvaluation(null);

    // Fetch past attempts for this topic before starting current debate
    const past = getPreviousAttemptsForTopic(figure.id, topic.title);
    setPreviousAttempts(past);
    setCurrentAttemptNumber(past.length + 1);

    // Initial greeting from historical figure
    const initialMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: `Greetings. I am ${figure.name}. We meet today to examine "${topic.title}". You have taken the position that: "${position}". Let us test whether your reasoning holds under scrutiny.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roundNumber: 1
    };

    setMessages([initialMsg]);
    setCurrentStep('ARENA');

    // Fetch initial agent challenge
    setIsLoading(true);
    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figureId: figure.id,
          topicId: topic.id,
          userPosition: position,
          mode: mode,
          messages: [initialMsg]
        })
      });
      const data = await res.json();
      if (data.text) {
        setMessages([
          initialMsg,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'agent',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            roundNumber: 1
          }
        ]);
      }
    } catch (e) {
      console.error('Failed to start initial debate agent:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler: Student sends argument message
  const handleSendMessage = async (text: string) => {
    if (!selectedFigure) return;

    const currentRoundNumber = Math.max(1, Math.floor(messages.length / 2) + 1);

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roundNumber: currentRoundNumber
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figureId: selectedFigure.id,
          topicId: activeTopic.id,
          userPosition: userPosition,
          mode: debateMode,
          messages: updatedMessages
        })
      });
      const data = await res.json();
      
      const agentMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: data.text || `Your statement presents an interesting premise, but how do you reconcile it with fundamental evidence?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roundNumber: currentRoundNumber
      };

      setMessages([...updatedMessages, agentMsg]);
    } catch (e) {
      console.error('Debate agent error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler: End Debate & Trigger Reasoning Judge
  const handleConcludeDebate = async () => {
    if (!selectedFigure) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figureId: selectedFigure.id,
          topicId: activeTopic.id,
          userPosition: userPosition,
          messages: messages
        })
      });
      
      const evalData: EvaluationResult = await res.json();
      setEvaluation(evalData);

      // Save current attempt to history
      const newAttempt: DebateAttempt = {
        id: `attempt-${Date.now()}`,
        attemptNumber: currentAttemptNumber,
        timestamp: new Date().toISOString(),
        figureId: selectedFigure.id,
        topicTitle: activeTopic.title,
        userPosition: userPosition,
        mode: debateMode,
        messages: messages,
        evaluation: evalData
      };

      saveAttempt(newAttempt);
      setCurrentStep('RESULTS');
    } catch (e) {
      console.error('Judge evaluation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler: Retry debate
  const handleRetry = () => {
    if (selectedFigure) {
      handleStartDebate(selectedFigure, activeTopic, userPosition, debateMode);
    }
  };

  // Handler: Confirm switch sides
  const handleConfirmSwitchSides = (newPosition: string) => {
    setIsSwitchSidesOpen(false);
    if (selectedFigure) {
      handleStartDebate(selectedFigure, activeTopic, newPosition, debateMode);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar onStartDemo={launchDemoMode} />

      <main className="flex-1">
        {/* Step 1: Landing Page */}
        {currentStep === 'LANDING' && (
          <div className="space-y-16">
            <Hero
              onStartDemo={launchDemoMode}
              onExploreFigures={() => {
                const galleryEl = document.getElementById('figure-gallery');
                galleryEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Figures Gallery Section */}
            <section id="figure-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-gray-800">
                <div>
                  <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Arena Roster</span>
                  </div>
                  <h2 className="font-academic text-3xl font-bold gold-gradient-text">
                    Select Your Historical Opponent
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mt-2 sm:mt-0 max-w-sm">
                  Choose a thinker to begin a structured debate or personal interview.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {HISTORICAL_FIGURES.map((figure) => (
                  <FigureCard
                    key={figure.id}
                    figure={figure}
                    onSelect={handleSelectFigure}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Step 2: Interactive Debate Arena */}
        {currentStep === 'ARENA' && selectedFigure && (
          <DebateArena
            figure={selectedFigure}
            topic={activeTopic}
            userPosition={userPosition}
            mode={debateMode}
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onConcludeDebate={handleConcludeDebate}
            onBackToSelection={() => setCurrentStep('LANDING')}
          />
        )}

        {/* Step 3: Reasoning Judge Results Dashboard */}
        {currentStep === 'RESULTS' && selectedFigure && evaluation && (
          <JudgeDashboard
            evaluation={evaluation}
            figure={selectedFigure}
            topic={activeTopic}
            userPosition={userPosition}
            previousAttempts={previousAttempts}
            currentAttemptNumber={currentAttemptNumber}
            onRetry={handleRetry}
            onSwitchSides={() => setIsSwitchSidesOpen(true)}
            onExploreFigures={() => setCurrentStep('LANDING')}
          />
        )}
      </main>

      {/* Modal: Figure Configuration */}
      <FigureSelectionModal
        figure={modalFigure}
        onClose={() => setModalFigure(null)}
        onStartDebate={handleStartDebate}
      />

      {/* Modal: Perspective Shift / Switch Sides */}
      {isSwitchSidesOpen && selectedFigure && (
        <SwitchSidesModal
          figure={selectedFigure}
          topic={activeTopic}
          currentPosition={userPosition}
          onClose={() => setIsSwitchSidesOpen(false)}
          onConfirmSwitch={handleConfirmSwitchSides}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 px-4 text-center text-xs text-gray-500">
        <p className="font-academic text-amber-500/80 mb-1">AGORA — AI Historical Debate Simulator</p>
        <p>"Argue with history. Learn to think."</p>
      </footer>
    </div>
  );
}
