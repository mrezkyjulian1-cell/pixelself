import React from 'react';
import { Volume2, VolumeX, Settings, Home, Disc, Shield, Sparkles, Heart } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { PixelAvatar } from './PixelAvatar';

export const HUD = ({
  playerLevel = 16,
  currentLocation = 'WORLD HUB',
  onOpenSettings,
  onReturnToHub,
  onReturnToTitle,
  soundSettings,
  onToggleMute,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
}) => {
  return (
    <>
      {/* Top-Right Compact Square HUD Card */}
      <header className="fixed top-3 sm:top-4 right-3 sm:right-6 z-40 w-56 sm:w-64 bg-black/75 backdrop-blur-md border-2 sm:border-3 border-[#facc15]/80 rounded-xl p-3 shadow-[0_0_25px_rgba(0,0,0,0.85)] text-xs select-none">
        
        {/* Top Section: Player Avatar & Level & Title */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#facc15]/30">
          <button 
            onClick={onReturnToHub}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none text-left"
            title="Return to World Hub"
          >
            <div className="w-8 h-8 rounded border-2 border-[#facc15] bg-[#1e1b4b] overflow-hidden flex items-center justify-center p-0.5 shadow-pixel-sm group-hover:scale-105 transition-transform">
              <PixelAvatar size="sm" />
            </div>
            <div className="font-pixel leading-tight">
              <div className="text-[#facc15] font-bold text-[11px] tracking-wide flex items-center gap-1">
                REZKY
                <span className="text-[9px] text-[#38bdf8] font-silkscreen font-normal">LV.{playerLevel}</span>
              </div>
              <div className="text-[8px] text-[#94a3b8] font-silkscreen">STUDENT EXPLORER</div>
            </div>
          </button>

          {/* Quick Sound & Settings Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playSelect();
                onToggleMute();
              }}
              className="p-1 bg-black/60 hover:bg-[#252549] border border-white/20 text-[#e2e8f0] rounded cursor-pointer transition-all active:translate-y-0.5"
              title={soundSettings.isBgmEnabled ? "Mute BGM" : "Unmute BGM"}
            >
              {soundSettings.isBgmEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#10b981]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#ef4444]" />
              )}
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onOpenSettings();
              }}
              className="p-1 bg-black/60 hover:bg-[#252549] border border-white/20 text-[#e2e8f0] rounded cursor-pointer transition-all active:translate-y-0.5"
              title="Open Game Settings"
            >
              <Settings className="w-3.5 h-3.5 text-[#facc15]" />
            </button>
          </div>
        </div>

        {/* Stats Bars: HP & EXP */}
        <div className="space-y-1.5 font-silkscreen text-[9px] pb-2 mb-2 border-b border-white/10">
          {/* HP */}
          <div>
            <div className="flex justify-between items-center text-[#ef4444] font-bold mb-0.5">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 fill-[#ef4444] animate-pulse" />
                <span>HP</span>
              </span>
              <span>100/100</span>
            </div>
            <div className="w-full h-1.5 bg-[#261622] rounded-xs border border-[#ef4444]/60 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ef4444] to-[#f87171] w-full" />
            </div>
          </div>

          {/* EXP */}
          <div>
            <div className="flex justify-between items-center text-[#facc15] mb-0.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#facc15]" />
                <span>EXP</span>
              </span>
              <span>750/1000</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e1e24] rounded-xs border border-[#facc15]/60 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#eab308] to-[#fde047] w-[75%]" />
            </div>
          </div>
        </div>

        {/* Location & Quick Action Navigation Footer */}
        <div className="flex items-center justify-between gap-1.5 pt-0.5 font-silkscreen">
          <div className="flex items-center gap-1 text-[9px] text-[#38bdf8] truncate max-w-[120px] font-pixel">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping shrink-0" />
            <span className="truncate">{currentLocation}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {currentLocation !== 'WORLD HUB' && (
              <button
                onClick={() => {
                  sound.playConfirm();
                  onReturnToHub();
                }}
                className="px-1.5 py-0.5 bg-[#1e1b4b] hover:bg-[#312e81] border border-[#6366f1] text-[#e0e7ff] font-pixel text-[8px] rounded cursor-pointer transition-all active:translate-y-0.5"
                title="Return to World Map"
              >
                HUB
              </button>
            )}

            <button
              onClick={() => {
                sound.playCancel();
                onReturnToTitle();
              }}
              className="px-1.5 py-0.5 bg-[#27101e] hover:bg-[#3f162c] border border-[#ef4444]/60 text-[#fca5a5] font-pixel text-[8px] rounded cursor-pointer transition-all active:translate-y-0.5"
              title="Return to Title Menu"
            >
              TITLE
            </button>
          </div>
        </div>

      </header>

      {/* Bottom Floating Mini Music Player (Non-intrusive) */}
      <aside className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 bg-[#0c0c1b]/95 border-2 border-[#4338ca] rounded-lg p-2 sm:p-2.5 shadow-pixel flex items-center gap-2.5 backdrop-blur-md max-w-[280px] sm:max-w-[340px]">
        {/* Animated Disc */}
        <button
          onClick={() => {
            sound.playSelect();
            onTogglePlay();
          }}
          className={`w-8 h-8 rounded-full bg-[#1e1b4b] border border-[#facc15] flex items-center justify-center shrink-0 cursor-pointer ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '6s' }}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <Disc className="w-5 h-5 text-[#facc15]" />
        </button>

        {/* Track Info */}
        <div className="flex-1 min-w-0 font-silkscreen">
          <div className="flex items-center gap-1.5 text-[8px] text-[#a5b4fc] uppercase tracking-wider">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#10b981] animate-ping' : 'bg-[#64748b]'}`} />
            <span>NOW PLAYING</span>
          </div>
          <div className="text-[11px] font-bold text-white truncate font-pixel text-yellow-300">
            {currentTrack?.title || 'Lofi - Night Drive'}
          </div>
          <div className="text-[9px] text-[#94a3b8] truncate">
            {currentTrack?.artist || 'Rezky Retro OST'}
          </div>
        </div>

        {/* Play/Pause & Next Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              sound.playSelect();
              onTogglePlay();
            }}
            className="w-6 h-6 flex items-center justify-center bg-[#242145] hover:bg-[#342f63] border border-[#6366f1] text-white rounded text-[10px] cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              onNextTrack();
            }}
            className="w-6 h-6 flex items-center justify-center bg-[#242145] hover:bg-[#342f63] border border-[#6366f1] text-white rounded text-[10px] cursor-pointer"
            title="Next Track"
          >
            ⏭
          </button>
        </div>
      </aside>
    </>
  );
};
