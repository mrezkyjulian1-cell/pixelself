import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, MapPin, Compass } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { PixelAvatar } from './PixelAvatar';

export const WorldHub = ({
  onSelectLocation,
  onOpenAdventureLog,
  theme,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 8 World destinations with retro icons and badges
  const destinations = [
    {
      id: 'CHARACTER_HOUSE',
      title: 'CHARACTER HOUSE',
      icon: '🏠',
      badge: 'ABOUT ME',
      desc: 'About Me, stats, bio, education & equipment',
      action: () => onSelectLocation('CHARACTER_HOUSE'),
    },
    {
      id: 'HOBBY_ROOM',
      title: 'HOBBY ROOM',
      icon: '🎮',
      badge: '7 PASSIONS',
      desc: 'Gaming, Running, Formula 1, Reading & Cooking',
      action: () => onSelectLocation('HOBBY_ROOM'),
    },
    {
      id: 'JUKEBOX',
      title: 'JUKEBOX',
      icon: '🎵',
      badge: '5 PLAYLISTS',
      desc: 'Curated Spotify playlists & retro Lo-Fi synth player',
      action: () => onSelectLocation('JUKEBOX'),
    },
    {
      id: 'SKILL_ROOM',
      title: 'SKILL ROOM',
      icon: '💻',
      badge: 'SKILL TREE',
      desc: 'Web Dev, Database, AI Tools & Design skill tree',
      action: () => onSelectLocation('SKILL_ROOM'),
    },
    {
      id: 'QUEST_BOARD',
      title: 'QUEST BOARD',
      icon: '📜',
      badge: '4 QUESTS',
      desc: 'Projects: POS Indonesia, AI Agent & Internship',
      action: () => onSelectLocation('QUEST_BOARD'),
    },
    {
      id: 'ACHIEVEMENT_HALL',
      title: 'ACHIEVEMENT HALL',
      icon: '🏆',
      badge: '8 UNLOCKED',
      desc: 'Trophies, honors & personal milestones',
      action: () => onSelectLocation('ACHIEVEMENT_HALL'),
    },
    {
      id: 'ADVENTURE_LOG',
      title: 'ADVENTURE LOG',
      icon: '🗺️',
      badge: 'TIMELINE',
      desc: '2024 - 2026 personal journey expedition timeline',
      action: () => onOpenAdventureLog ? onOpenAdventureLog() : onSelectLocation('ADVENTURE_LOG'),
    },
    {
      id: 'SAVE_POINT',
      title: 'SAVE POINT',
      icon: '💾',
      badge: 'SHRINE',
      desc: 'Ancient shrine, save game state & connect socials',
      action: () => onSelectLocation('SAVE_POINT'),
    },
  ];

  // Keyboard navigation: Arrow Up/Down and Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        sound.playSelect();
        setSelectedIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        sound.playSelect();
        setSelectedIndex((prev) => (prev + 1) % destinations.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sound.playConfirm();
        destinations[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, destinations]);

  // Floating particles generator
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
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
    <div className="relative w-full min-h-screen flex items-end justify-start overflow-hidden bg-transparent select-none p-6 sm:p-12 md:p-16 lg:p-20 pb-16 sm:pb-20">
      
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
        Layout matches MainMenu precisely with pure floating retro RPG typography
      */}
      <main className="relative z-20 flex flex-col items-start text-left max-w-lg w-full bg-transparent">
        
        {/* Tagline / Sub-badge (Full Transparent) */}
        <div className="inline-flex items-center gap-2 mb-2 text-[10px] sm:text-xs text-[#facc15] font-silkscreen tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          <Sparkles className="w-3.5 h-3.5 text-[#facc15] animate-pulse" />
          <span>WORLD HUB • EXPLORE REZKY'S REALM</span>
        </div>

        {/* Title: WORLD HUB */}
        <div className="mb-4 relative group">
          <h1 className="font-pixel text-4xl sm:text-6xl text-[#facc15] tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter drop-shadow-[0_0_25px_rgba(250,204,21,0.7)]">
            WORLD HUB
          </h1>

          <p className="font-silkscreen text-xs sm:text-sm text-[#e2e8f0] mt-1.5 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            « SELECT A DESTINATION TO EXPLORE »
          </p>

          <div className="w-36 sm:w-48 h-0.5 bg-gradient-to-r from-[#facc15] to-transparent mt-2.5 drop-shadow" />
        </div>

        {/* Active Destination Preview Info Tag */}
        <div className="mb-4 flex items-center gap-3 bg-transparent">
          <div className="w-9 h-9 rounded border-2 border-[#facc15] overflow-hidden shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.8)] bg-black/60 flex items-center justify-center p-0.5 text-xl">
            {destinations[selectedIndex].icon}
          </div>
          <div className="font-silkscreen text-[10px] leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <div>DESTINATION: <span className="text-[#facc15] font-bold font-pixel">{destinations[selectedIndex].title}</span></div>
            <div className="text-[#cbd5e1] text-[9px] mt-0.5">{destinations[selectedIndex].desc}</div>
          </div>
        </div>

        {/* 
          FULL TRANSPARENT DESTINATIONS MENU
          Classic JRPG list format identical to MainMenu
        */}
        <div className="w-full max-w-md space-y-2 bg-transparent">
          {destinations.map((dest, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={dest.id}
                onClick={() => {
                  sound.playConfirm();
                  dest.action();
                }}
                onMouseEnter={() => {
                  sound.playSelect();
                  setSelectedIndex(idx);
                }}
                className={`w-full py-1 px-0 flex items-center text-left font-pixel transition-all cursor-pointer group bg-transparent border-none outline-none ${
                  isSelected
                    ? 'text-[#facc15] translate-x-2'
                    : 'text-[#e2e8f0]/85 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 w-full">
                  {/* Blinking Selection Cursor */}
                  <span className={`text-sm sm:text-base font-bold shrink-0 ${
                    isSelected 
                      ? 'text-[#facc15] inline-block animate-cursor-blink drop-shadow-[0_0_8px_#facc15]' 
                      : 'opacity-0'
                  }`}>
                    ▶
                  </span>

                  {/* Destination Icon */}
                  <span className="text-sm shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    {dest.icon}
                  </span>

                  {/* Destination Title */}
                  <span className={`tracking-wider text-xs sm:text-sm drop-shadow-[0_3px_5px_rgba(0,0,0,1)] ${
                    isSelected 
                      ? 'text-[#fef08a] font-bold filter drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]' 
                      : ''
                  }`}>
                    {dest.title}
                  </span>

                  {/* Badge Tag */}
                  <span className={`font-silkscreen text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded border ml-auto shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] ${
                    isSelected
                      ? 'bg-[#facc15] text-black border-black font-bold'
                      : 'bg-black/50 text-[#94a3b8] border-white/10'
                  }`}>
                    {dest.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Subtext Prompt: PRESS ENTER TO ENTER REALM */}
        <div className="mt-5 flex flex-col items-start gap-1 bg-transparent">
          <div className="font-pixel text-[10px] sm:text-[11px] text-[#facc15] animate-pulse flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            <span>PRESS ENTER</span>
            <span className="text-[#cbd5e1] font-silkscreen text-[9px]">TO ENTER REALM</span>
          </div>
          <div className="text-[9px] text-[#94a3b8] font-silkscreen drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            USE ↑ ↓ ARROW KEYS OR CLICK TO NAVIGATE
          </div>
        </div>

      </main>
    </div>
  );
};
