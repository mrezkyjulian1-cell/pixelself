import React, { useState, useEffect } from 'react';
import { Play, FolderOpen, Settings, Power, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { PixelAvatar } from './PixelAvatar';

export const MainMenu = ({
  onStartGame,
  onLoadGame,
  onOpenSettings,
  onExitGame,
  onInitAudio,
  hasAudioStarted,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuOptions = [
    { id: 'start', label: 'START GAME', action: onStartGame, icon: Play },
    { id: 'load', label: 'LOAD GAME', action: onLoadGame, icon: FolderOpen },
    { id: 'settings', label: 'SETTINGS', action: onOpenSettings, icon: Settings },
    { id: 'exit', label: 'EXIT', action: onExitGame, icon: Power },
  ];

  // Keyboard navigation: Arrow Up/Down and Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      // First key interaction triggers audio if not started
      if (!hasAudioStarted && onInitAudio) {
        onInitAudio();
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        sound.playSelect();
        setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        sound.playSelect();
        setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sound.playConfirm();
        menuOptions[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, hasAudioStarted, menuOptions, onInitAudio]);

  // Floating particles generator
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.floor(Math.random() * 3) + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setParticles(generated);
  }, []);

  return (
    <div 
      className="relative w-full min-h-screen flex items-end justify-start overflow-hidden bg-transparent select-none p-6 sm:p-12 md:p-16 lg:p-20 pb-16 sm:pb-20"
      onClick={() => {
        if (!hasAudioStarted && onInitAudio) {
          onInitAudio();
        }
      }}
    >
      {/* Floating Pixel Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-yellow-200 shadow-[0_0_8px_#fef08a]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 
        BOTTOM-LEFT CORNER FULLY TRANSPARENT MENU
        No boxes, no dark panels, pure floating 16-bit RPG text aesthetic
      */}
      <main className="relative z-20 flex flex-col items-start text-left max-w-lg w-full bg-transparent">
        
        {/* Tagline / Sub-badge (Full Transparent) */}
        <div className="inline-flex items-center gap-2 mb-2 text-[10px] sm:text-xs text-[#facc15] font-silkscreen tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          <Sparkles className="w-3.5 h-3.5 text-[#facc15] animate-pulse" />
          <span>16-BIT RETRO RPG EXPERIENCE</span>
        </div>

        {/* Title: JULIAN.EXE */}
        <div className="mb-5 relative group">
          <h1 className="font-pixel text-4xl sm:text-6xl text-[#facc15] tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter drop-shadow-[0_0_25px_rgba(250,204,21,0.7)]">
            JULIAN.EXE
          </h1>

          <p className="font-silkscreen text-xs sm:text-sm text-[#e2e8f0] mt-2 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            « A PLAYABLE INTRODUCTION TO WHO I AM »
          </p>

          <div className="w-36 sm:w-48 h-0.5 bg-gradient-to-r from-[#facc15] to-transparent mt-3 drop-shadow" />
        </div>

        {/* Compact Player Status (Full Transparent) */}
        <div className="mb-5 flex items-center gap-3 bg-transparent">
          <div className="w-9 h-9 rounded border-2 border-[#facc15] overflow-hidden shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.8)] bg-[#101026] flex items-center justify-center p-0.5">
            <PixelAvatar size="sm" />
          </div>
          <div className="font-silkscreen text-[10px] leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <div>PLAYER: <span className="text-[#facc15] font-bold font-pixel">REZKY</span> • LV.16</div>
            <div className="text-[#94a3b8] text-[9px]">STATUS: <span className="text-[#4ade80] font-bold">READY</span></div>
          </div>
        </div>

        {/* 
          FULL TRANSPARENT MENU OPTIONS (No Background, No Box Borders)
          Classic JRPG floating menu style
        */}
        <div className="w-full max-w-xs space-y-3 bg-transparent">
          {menuOptions.map((opt, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  sound.playConfirm();
                  opt.action();
                }}
                onMouseEnter={() => {
                  sound.playSelect();
                  setSelectedIndex(idx);
                }}
                className={`w-full py-1.5 px-0 flex items-center text-left font-pixel transition-all cursor-pointer group bg-transparent border-none outline-none ${
                  isSelected
                    ? 'text-[#facc15] translate-x-2'
                    : 'text-[#e2e8f0]/85 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Blinking Selection Cursor */}
                  <span className={`text-base font-bold ${
                    isSelected 
                      ? 'text-[#facc15] inline-block animate-cursor-blink drop-shadow-[0_0_8px_#facc15]' 
                      : 'opacity-0'
                  }`}>
                    ▶
                  </span>

                  {/* Menu Label with bold drop-shadow for direct art contrast */}
                  <span className={`tracking-wider text-xs sm:text-sm drop-shadow-[0_3px_5px_rgba(0,0,0,1)] ${
                    isSelected 
                      ? 'text-[#fef08a] font-bold filter drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]' 
                      : ''
                  }`}>
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Subtext Prompt: PRESS ENTER (Full Transparent) */}
        <div className="mt-6 flex flex-col items-start gap-1 bg-transparent">
          <div className="font-pixel text-[10px] sm:text-[11px] text-[#facc15] animate-pulse flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            <span>PRESS ENTER</span>
            <span className="text-[#cbd5e1] font-silkscreen text-[9px]">TO SELECT</span>
          </div>
          <div className="text-[9px] text-[#94a3b8] font-silkscreen drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            USE ↑ ↓ ARROW KEYS OR CLICK TO NAVIGATE
          </div>
        </div>

        {/* Audio prompt if audio not yet engaged (Full Transparent) */}
        {!hasAudioStarted && (
          <div className="mt-4 text-[10px] text-[#38bdf8] font-silkscreen flex items-center gap-2 bg-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <Volume2 className="w-3.5 h-3.5 text-[#38bdf8] animate-bounce" />
            <span>Click anywhere to enable 16-bit Lo-fi audio!</span>
          </div>
        )}

      </main>

      {/* Version & Credits Footer (Full Transparent) */}
      <footer className="absolute bottom-3 left-6 sm:left-12 right-6 sm:right-12 z-20 flex justify-between items-center text-[9px] text-[#94a3b8]/80 font-silkscreen drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
        <div>JULIAN.EXE • 16-BIT RPG EDITION</div>
        <div>STARRY RETRO ODYSSEY • 2026</div>
      </footer>
    </div>
  );
};
