import React from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const ExitScreen = ({ onRestartGame }) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden select-none">
      <div className="relative z-10 w-full max-w-lg pixel-box bg-[#0b0a1d]/85 backdrop-blur-md p-8 rounded-xl border-4 border-[#4338ca] shadow-pixel-glow text-center space-y-6">
        
        {/* Animated Trophy / Heart */}
        <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
          ⭐
        </div>

        <div className="space-y-3">
          <h2 className="font-pixel text-2xl sm:text-4xl text-[#fef08a] tracking-wider drop-shadow">
            THANKS FOR PLAYING
          </h2>

          <p className="font-silkscreen text-sm sm:text-base text-[#a5b4fc] tracking-widest">
            « See you in another adventure... »
          </p>
        </div>

        <div className="w-36 h-1 bg-gradient-to-r from-transparent via-[#facc15] to-transparent mx-auto" />

        <p className="font-silkscreen text-xs text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
          Rezky will continue leveling up his skills, running midnight routes, watching F1 grands prix, and coding creative worlds.
        </p>

        {/* Action Button: RESTART */}
        <div className="pt-4">
          <button
            onClick={() => {
              sound.playConfirm();
              onRestartGame();
            }}
            className="pixel-btn pixel-btn-gold text-xs py-3 px-8 shadow-pixel-gold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETURN TO TITLE SCREEN</span>
          </button>
        </div>

      </div>
    </div>
  );
};
