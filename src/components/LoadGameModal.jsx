import React from 'react';
import { X, Folder, Calendar, Award, Swords, Play, Trash2 } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { PixelAvatar } from './PixelAvatar';

export const LoadGameModal = ({
  isOpen,
  onClose,
  onLoadSave,
}) => {
  if (!isOpen) return null;

  const saveFiles = [
    {
      slot: 1,
      filename: "REZKY_EXP_SAVE_01.DAT",
      characterName: "REZKY",
      level: 16,
      classType: "STUDENT / CREATIVE EXPLORER",
      location: "MAIN WORLD / TOWN HUB",
      questsCompleted: "3/4 Completed",
      achievementsUnlocked: "8 Unlocked",
      playtime: "16h 40m",
      lastSaved: "Today (Auto-Saved)",
      currentHp: "100/100",
      activeBadge: "STARRY ADVENTURER",
      mode: "adventurer",
      isPrimary: true
    },
    {
      slot: 2,
      filename: "CHRONO_JOURNEY_LOG_2025.DAT",
      characterName: "REZKY (INTERN ARC)",
      level: 15,
      classType: "WEB DEVELOPER INTERN",
      location: "INTERNSHIP HEADQUARTERS",
      questsCompleted: "2/4 Completed",
      achievementsUnlocked: "5 Unlocked",
      playtime: "8h 15m",
      lastSaved: "Archived 2025",
      currentHp: "95/100",
      activeBadge: "AGILE CODER",
      mode: "coder",
      isPrimary: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div 
        className="relative w-full max-w-2xl pixel-box bg-[#0b0a1d] p-6 rounded-lg border-4 border-[#4338ca] shadow-pixel-glow text-white animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#2d2a58] mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[#facc15] font-pixel text-sm">💾 LOAD GAME / JOURNEY LOG</span>
            <span className="text-[10px] text-[#94a3b8] font-silkscreen">[SAVED PROGRESS ARCHIVES]</span>
          </div>
          <button
            onClick={() => {
              sound.playCancel();
              onClose();
            }}
            className="p-1 hover:bg-[#27254e] rounded border border-transparent hover:border-[#6366f1] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save Slots List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {saveFiles.map((save) => (
            <div
              key={save.slot}
              className={`p-4 rounded-lg border-2 transition-all ${
                save.isPrimary
                  ? 'border-[#facc15] bg-[#151336] shadow-pixel-gold'
                  : 'border-[#2d2a58] bg-[#11102b] hover:border-[#6366f1]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2d2a58] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#facc15] text-[#0f172a] font-pixel text-[9px] rounded font-bold">
                    SLOT {save.slot}
                  </span>
                  <span className="font-silkscreen text-xs text-[#cbd5e1] font-mono">
                    {save.filename}
                  </span>
                </div>
                <div className="text-[10px] text-[#94a3b8] font-silkscreen flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#facc15]" />
                  <span>{save.lastSaved}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-silkscreen mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded border-2 border-[#facc15] overflow-hidden shrink-0 shadow-pixel-sm bg-[#101026] flex items-center justify-center p-0.5">
                    <PixelAvatar size="md" mode={save.mode} />
                  </div>
                  <div>
                    <div className="text-[#94a3b8] text-[9px]">CHARACTER / CLASS:</div>
                    <div className="font-pixel text-[11px] text-[#fef08a] mt-0.5">
                      {save.characterName} <span className="text-[#38bdf8]">LV.{save.level}</span>
                    </div>
                    <div className="text-[10px] text-[#a5b4fc]">{save.classType}</div>
                  </div>
                </div>

                <div>
                  <div className="text-[#94a3b8] text-[10px]">CURRENT LOCATION:</div>
                  <div className="text-[#34d399] font-pixel text-[11px] mt-0.5">
                    📍 {save.location}
                  </div>
                  <div className="text-[10px] text-[#cbd5e1]">HP: {save.currentHp} • TIME: {save.playtime}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-[#ef4444]" />
                  <div>
                    <span className="text-[#94a3b8] text-[10px]">QUEST LOG:</span>
                    <div className="text-[#e2e8f0] font-bold">{save.questsCompleted}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#facc15]" />
                  <div>
                    <span className="text-[#94a3b8] text-[10px]">ACHIEVEMENTS:</span>
                    <div className="text-[#e2e8f0] font-bold">{save.achievementsUnlocked}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end gap-2 pt-2 border-t border-[#232049]">
                <button
                  onClick={() => {
                    sound.playConfirm();
                    onLoadSave(save);
                  }}
                  className="pixel-btn pixel-btn-gold text-[10px] py-1.5 px-4"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>LOAD JOURNEY</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t-2 border-[#2d2a58] flex justify-between items-center font-silkscreen text-xs">
          <div className="text-[10px] text-[#64748b]">
            SELECT A FILE TO RESUME EXPLORATION
          </div>
          <button
            onClick={() => {
              sound.playCancel();
              onClose();
            }}
            className="pixel-btn text-[10px] bg-[#1e1b4b]"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
