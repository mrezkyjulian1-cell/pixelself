import React, { useState, useEffect } from 'react';
import { X, Volume2, Monitor, Palette, Gamepad2, Play, Pause, SkipForward, Sparkles } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const SettingsModal = ({
  isOpen,
  onClose,
  soundSettings,
  onUpdateSoundSettings,
  displaySettings,
  onUpdateDisplaySettings,
  theme,
  onChangeTheme,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onTriggerShakeTest,
}) => {
  const [activeTab, setActiveTab] = useState('AUDIO');

  // Keyboard navigation for ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playCancel();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render visual progress bar like ████████░░ 80%
  const renderVisualBar = (percentage) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
    return `${bar} ${percentage}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div 
        className="relative w-full max-w-xl pixel-box bg-[#0c0c20] p-6 rounded-lg border-4 border-[#4338ca] shadow-pixel-glow text-white animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#2d2a58] mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#facc15] font-pixel text-sm">⚙ SETTINGS</span>
            <span className="text-[10px] text-[#94a3b8] font-silkscreen">[GAME CONFIGURATION]</span>
          </div>
          <button
            onClick={() => {
              sound.playCancel();
              onClose();
            }}
            className="p-1 hover:bg-[#27254e] rounded border border-transparent hover:border-[#6366f1] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
            title="Close Settings (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#1f1d3d] pb-2 font-pixel text-[10px]">
          {[
            { id: 'AUDIO', label: 'AUDIO', icon: Volume2 },
            { id: 'DISPLAY', label: 'DISPLAY', icon: Monitor },
            { id: 'THEME', label: 'THEME', icon: Palette },
            { id: 'CONTROLS', label: 'CONTROLS', icon: Gamepad2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playSelect();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#312e81] text-[#facc15] border-2 border-[#facc15] shadow-pixel-sm'
                    : 'bg-[#15142e] text-[#94a3b8] hover:text-white border border-[#232049]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6 min-h-[260px]">
          
          {/* AUDIO TAB */}
          {activeTab === 'AUDIO' && (
            <div className="space-y-5">
              {/* Background Music Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">BACKGROUND MUSIC</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">16-bit Lo-fi & Chiptune soundtrack</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSelect();
                    onUpdateSoundSettings({ isBgmEnabled: !soundSettings.isBgmEnabled });
                  }}
                  className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 transition-all cursor-pointer ${
                    soundSettings.isBgmEnabled
                      ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                      : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                  }`}
                >
                  [ {soundSettings.isBgmEnabled ? 'ON' : 'OFF'} ]
                </button>
              </div>

              {/* Music Volume Slider */}
              <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded space-y-2">
                <div className="flex justify-between items-center font-pixel text-xs">
                  <span>MUSIC VOLUME</span>
                  <span className="text-[#facc15] font-mono text-[11px]">
                    {renderVisualBar(Math.round(soundSettings.bgmVolume * 100))}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(soundSettings.bgmVolume * 100)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    onUpdateSoundSettings({ bgmVolume: val });
                  }}
                  className="w-full accent-[#facc15] cursor-pointer"
                />
              </div>

              {/* SFX Volume Slider */}
              <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded space-y-2">
                <div className="flex justify-between items-center font-pixel text-xs">
                  <span>SFX VOLUME</span>
                  <span className="text-[#38bdf8] font-mono text-[11px]">
                    {renderVisualBar(Math.round(soundSettings.sfxVolume * 100))}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(soundSettings.sfxVolume * 100)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    onUpdateSoundSettings({ sfxVolume: val });
                  }}
                  className="w-full accent-[#38bdf8] cursor-pointer"
                />
              </div>

              {/* UI Sound Effects Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">UI SOUND EFFECTS</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">Button clicks, cursor beeps, and door fanfares</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSelect();
                    onUpdateSoundSettings({ isSfxEnabled: !soundSettings.isSfxEnabled });
                  }}
                  className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 transition-all cursor-pointer ${
                    soundSettings.isSfxEnabled
                      ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                      : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                  }`}
                >
                  [ {soundSettings.isSfxEnabled ? 'ON' : 'OFF'} ]
                </button>
              </div>

              {/* Mini Track Controller in Settings */}
              <div className="p-3 bg-[#1a1738] border border-[#4338ca] rounded flex items-center justify-between font-silkscreen text-xs">
                <div>
                  <span className="text-[#94a3b8] text-[9px] block">NOW PLAYING:</span>
                  <span className="text-[#facc15] font-pixel text-[10px]">
                    {currentTrack?.title || 'Lofi - Night Drive'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onTogglePlay();
                    }}
                    className="pixel-btn text-[9px] px-3 py-1 bg-[#312e81]"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onNextTrack();
                    }}
                    className="pixel-btn text-[9px] px-2.5 py-1 bg-[#201d4a]"
                    title="Next Track"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DISPLAY TAB */}
          {activeTab === 'DISPLAY' && (
            <div className="space-y-4">
              {/* Pixel Effect Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">PIXEL EFFECT</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">Pixel-crisp rendering & retro sharpness</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSelect();
                    onUpdateDisplaySettings({ pixelEffect: !displaySettings.pixelEffect });
                  }}
                  className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 cursor-pointer ${
                    displaySettings.pixelEffect
                      ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                      : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                  }`}
                >
                  [ {displaySettings.pixelEffect ? 'ON' : 'OFF'} ]
                </button>
              </div>

              {/* CRT Scanline Effect Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">CRT EFFECT</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">Subtle cathode-ray scanline overlay</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSelect();
                    onUpdateDisplaySettings({ crtEffect: !displaySettings.crtEffect });
                  }}
                  className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 cursor-pointer ${
                    displaySettings.crtEffect
                      ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                      : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                  }`}
                >
                  [ {displaySettings.crtEffect ? 'ON' : 'OFF'} ]
                </button>
              </div>

              {/* Screen Shake Toggle & Test */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">SCREEN SHAKE</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">Camera rumble on level-up and actions</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onTriggerShakeTest();
                    }}
                    className="font-pixel text-[9px] px-2.5 py-1 bg-[#1e1b4b] hover:bg-[#312e81] border border-[#6366f1] rounded text-[#a5b4fc] cursor-pointer"
                  >
                    TEST SHAKE
                  </button>
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onUpdateDisplaySettings({ screenShake: !displaySettings.screenShake });
                    }}
                    className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 cursor-pointer ${
                      displaySettings.screenShake
                        ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                        : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                    }`}
                  >
                    [ {displaySettings.screenShake ? 'ON' : 'OFF'} ]
                  </button>
                </div>
              </div>

              {/* Animation ON/OFF */}
              <div className="flex items-center justify-between p-3 bg-[#13122c] border border-[#2a2656] rounded">
                <div>
                  <div className="font-pixel text-xs text-[#e2e8f0]">ANIMATION</div>
                  <div className="font-silkscreen text-[9px] text-[#94a3b8]">Idle sprites, floating particles, and transitions</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSelect();
                    onUpdateDisplaySettings({ animation: !displaySettings.animation });
                  }}
                  className={`font-pixel text-[10px] px-3 py-1.5 rounded border-2 cursor-pointer ${
                    displaySettings.animation
                      ? 'bg-[#166534] border-[#22c55e] text-[#bbf7d0]'
                      : 'bg-[#7f1d1d] border-[#ef4444] text-[#fecaca]'
                  }`}
                >
                  [ {displaySettings.animation ? 'ON' : 'OFF'} ]
                </button>
              </div>
            </div>
          )}

          {/* THEME TAB */}
          {activeTab === 'THEME' && (
            <div className="space-y-4">
              <div className="font-silkscreen text-xs text-[#cbd5e1] mb-2">
                CHOOSE ATMOSPHERIC COLOR PALETTE:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'NIGHT',
                    name: 'NIGHT',
                    desc: 'Deep indigo, midnight starlight, cozy purple highlights',
                    accent: '#818cf8',
                    bg: '#0c0c20',
                  },
                  {
                    id: 'DAY',
                    name: 'DAY',
                    desc: 'Vibrant sky blue, warm sunlight, daytime town vibes',
                    accent: '#38bdf8',
                    bg: '#0f172a',
                  },
                  {
                    id: 'RETRO',
                    name: 'RETRO',
                    desc: 'Classic GameBoy green & amber cyber arcade palette',
                    accent: '#22c55e',
                    bg: '#052e16',
                  },
                ].map((t) => {
                  const isCurrent = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playConfirm();
                        onChangeTheme(t.id);
                      }}
                      className={`p-3.5 rounded border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#facc15] bg-[#221f4f] shadow-pixel-gold scale-102'
                          : 'border-[#2d2a58] bg-[#121128] hover:border-[#6366f1]'
                      }`}
                    >
                      <div>
                        <div className="font-pixel text-xs text-[#facc15] flex items-center justify-between">
                          <span>{t.name}</span>
                          {isCurrent && <span className="text-[10px] text-[#4ade80]">ACTIVE</span>}
                        </div>
                        <p className="font-silkscreen text-[9px] text-[#94a3b8] mt-2">
                          {t.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: t.accent }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: t.bg }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONTROLS TAB */}
          {activeTab === 'CONTROLS' && (
            <div className="space-y-4">
              <div className="font-silkscreen text-xs text-[#94a3b8] mb-1">
                KEYBOARD & INTERACTIVE SHORTCUTS:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-silkscreen text-xs">
                <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded flex items-center justify-between">
                  <span className="text-[#cbd5e1]">Navigate Menus</span>
                  <kbd className="px-2 py-1 bg-[#232049] border border-[#4338ca] text-[#facc15] font-pixel text-[9px] rounded">
                    ↑ ↓ / W S
                  </kbd>
                </div>

                <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded flex items-center justify-between">
                  <span className="text-[#cbd5e1]">Select / Confirm</span>
                  <kbd className="px-2 py-1 bg-[#232049] border border-[#4338ca] text-[#facc15] font-pixel text-[9px] rounded">
                    ENTER / SPACE
                  </kbd>
                </div>

                <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded flex items-center justify-between">
                  <span className="text-[#cbd5e1]">Back / Close</span>
                  <kbd className="px-2 py-1 bg-[#232049] border border-[#4338ca] text-[#facc15] font-pixel text-[9px] rounded">
                    ESC
                  </kbd>
                </div>

                <div className="p-3 bg-[#13122c] border border-[#2a2656] rounded flex items-center justify-between">
                  <span className="text-[#cbd5e1]">Move in Town</span>
                  <kbd className="px-2 py-1 bg-[#232049] border border-[#4338ca] text-[#facc15] font-pixel text-[9px] rounded">
                    WASD / ARROWS / CLICK
                  </kbd>
                </div>
              </div>

              <div className="p-3 bg-[#1b1836] border border-[#6366f1] rounded text-[10px] text-[#c7d2fe] font-silkscreen">
                💡 <span className="text-[#facc15] font-bold">Touch Support:</span> All interactive elements, hot spots, and navigation are also 100% compatible with touchscreen tap on mobile devices!
              </div>
            </div>
          )}

        </div>

        {/* Footer with ESC Back */}
        <div className="mt-6 pt-4 border-t-2 border-[#2d2a58] flex justify-between items-center font-silkscreen text-xs">
          <div className="text-[10px] text-[#64748b]">
            SETTINGS SAVED AUTOMATICALLY
          </div>

          <button
            onClick={() => {
              sound.playCancel();
              onClose();
            }}
            className="pixel-btn text-[10px] bg-[#1e1b4b] hover:bg-[#312e81]"
          >
            [ ESC ] BACK
          </button>
        </div>

      </div>
    </div>
  );
};
