import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Compass, Shield, Heart } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { PixelAvatar } from './PixelAvatar';

export const IntroScreen = ({ onEnterWorld, onCancelIntro }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING WORLD HUB...');

  const loadingSteps = [
    { threshold: 15, text: 'GENERATING PIXEL TERRAIN...' },
    { threshold: 35, text: 'SPAWNING CHARACTER HOUSE & DESK...' },
    { threshold: 55, text: 'CALIBRATING JUKEBOX SYNTHESIZER...' },
    { threshold: 75, text: 'PINNING QUESTS ON WOODEN BOARD...' },
    { threshold: 90, text: 'ACTIVATING SACRED SAVE CRYSTAL...' },
    { threshold: 100, text: 'WORLD READY! ENTERING REALM...' },
  ];

  const handleStartEntering = () => {
    sound.playConfirm();
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sound.playDoor();
            onEnterWorld();
          }, 600);
          return 100;
        }
        const next = Math.min(100, prev + Math.floor(Math.random() * 12) + 6);
        const match = loadingSteps.find((s) => next <= s.threshold);
        if (match) {
          setLoadingText(match.text);
        }
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isLoading, onEnterWorld]);

  // Generate ASCII progress bar
  const renderProgressBar = (val) => {
    const totalBlocks = 20;
    const filled = Math.round((val / 100) * totalBlocks);
    const empty = totalBlocks - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden select-none">
      <div className="relative z-10 w-full max-w-lg bg-black/25 backdrop-blur-[2px] p-6 sm:p-8 rounded-xl border-4 border-[#facc15] shadow-[0_0_35px_rgba(0,0,0,0.9)] text-white">
        
        {!isLoading ? (
          /* RPG CHARACTER CARD INTRO (FULL TRANSPARENT UI) */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-center pb-4 border-b-2 border-[#facc15]/40">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 border border-[#facc15] rounded text-[10px] text-[#facc15] font-silkscreen tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#facc15] animate-pulse" />
                <span>NEW ADVENTURE</span>
              </div>
              <h2 className="font-pixel text-2xl sm:text-3xl text-[#fef08a] tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                CHARACTER SHEET
              </h2>
            </div>

            {/* Character Info Card (Full Transparent) */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-black/40 border-2 border-[#facc15]/60 rounded-lg">
              {/* Pixel Avatar Frame */}
              <div className="w-24 h-24 rounded border-4 border-[#facc15] bg-black/50 p-1 shadow-pixel-gold shrink-0 relative flex items-center justify-center">
                <PixelAvatar size="lg" animated />
                <span className="absolute -bottom-2 -right-2 bg-[#facc15] text-black font-pixel text-[8px] px-1.5 py-0.5 rounded border border-black font-bold">
                  LV.16
                </span>
              </div>

              {/* Stats & Class */}
              <div className="space-y-2 text-center sm:text-left flex-1 font-silkscreen">
                <div>
                  <div className="text-[10px] text-[#cbd5e1] uppercase font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">PLAYER:</div>
                  <div className="font-pixel text-base text-[#facc15] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">REZKY</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#cbd5e1] uppercase font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">LEVEL:</div>
                  <div className="font-pixel text-sm text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">16</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#cbd5e1] uppercase font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">CLASS:</div>
                  <div className="text-xs text-[#fef08a] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    STUDENT / CREATIVE EXPLORER
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#cbd5e1] uppercase font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">STATUS:</div>
                  <div className="text-xs text-[#4ade80] font-bold flex items-center justify-center sm:justify-start gap-1 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
                    <span>READY FOR ADVENTURE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flavor quote */}
            <div className="p-3 bg-black/40 border border-[#facc15]/30 rounded text-center">
              <p className="font-silkscreen text-[11px] text-[#e2e8f0] italic drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                “A playable introduction to who I am. Explore the world that makes me, me.”
              </p>
            </div>

            {/* Actions: ENTER WORLD / BACK */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onCancelIntro}
                className="pixel-btn text-[10px] bg-black/50 border-[#facc15]/40 hover:bg-black/70 flex-1"
              >
                RETURN TO TITLE
              </button>

              <button
                onClick={handleStartEntering}
                className="pixel-btn pixel-btn-gold text-xs py-3 px-6 flex-1 justify-center animate-pulse-glow"
              >
                <span>[ ENTER WORLD ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* LOADING SEQUENCE */
          <div className="py-8 space-y-6 text-center">
            <div className="font-pixel text-base text-[#facc15] animate-pulse drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              LOADING WORLD...
            </div>

            {/* ASCII Style Visual Progress Bar */}
            <div className="space-y-2">
              <div className="font-mono text-sm sm:text-base text-[#38bdf8] font-bold tracking-widest break-all drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                {renderProgressBar(progress)} {progress}%
              </div>
              
              {/* Tailwind Progress Bar Fill */}
              <div className="w-full h-3 bg-black/50 border-2 border-[#facc15] rounded overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#6366f1] via-[#facc15] to-[#4ade80] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Dynamic Step Text */}
            <div className="font-silkscreen text-xs text-[#fef08a] min-h-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {loadingText}
            </div>

            {/* Random Tips */}
            <div className="p-3 bg-black/40 border border-[#facc15]/30 rounded text-[10px] text-[#cbd5e1] font-silkscreen">
              <span className="text-[#facc15] font-bold">PRO-TIP:</span> Visit the Hobby Room to inspect Formula 1 and running milestones!
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
