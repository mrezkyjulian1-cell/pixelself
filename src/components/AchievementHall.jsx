import React, { useState } from 'react';
import { ChevronLeft, Trophy, Sparkles, X, Award, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEngine';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';

export const AchievementHall = ({ onBackToHub }) => {
  const [selectedAch, setSelectedAch] = useState(null);

  const handleInspect = (ach) => {
    if (ach.status === 'UNLOCKED') {
      sound.playFanfare();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      sound.playCancel();
    }
    setSelectedAch(ach);
  };

  return (
    <div className="w-full min-h-screen pt-20 pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-white select-none">
      
      {/* Header with Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#2b2756]">
        <button
          onClick={() => {
            sound.playCancel();
            onBackToHub();
          }}
          className="pixel-btn text-[10px] bg-[#1a173b] hover:bg-[#2b275e] flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>RETURN TO WORLD MAP</span>
        </button>

        <div className="text-right">
          <div className="inline-block px-2.5 py-0.5 bg-[#854d0e] border border-[#facc15] rounded font-pixel text-[9px] text-[#fef08a]">
            LOCATION: HALL OF TROPHIES
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            🏆 ACHIEVEMENT HALL
          </h2>
        </div>
      </div>

      {/* Intro Trophy Pedestal Banner */}
      <div className="mb-8 p-5 bg-[#0c0b20]/85 backdrop-blur-md rounded-xl border-4 border-[#eab308] shadow-pixel-gold relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative z-10 flex items-center gap-4">
          <div className="text-4xl p-3 bg-[#241e4a] rounded-lg border-2 border-[#facc15] animate-bounce">
            🏆
          </div>
          <div>
            <div className="font-pixel text-xs text-[#fef08a]">
              HALL OF HONORS & MILESTONES
            </div>
            <p className="font-silkscreen text-xs text-[#cbd5e1] mt-1 max-w-md">
              Milestones are earned through endurance, curiosity, late nights, and courage. Click any trophy to inspect lore and rewards.
            </p>
          </div>
        </div>

        <div className="font-pixel text-xs text-[#38bdf8] bg-[#0c0b20] px-4 py-2 rounded-lg border-2 border-[#4338ca] shrink-0 text-center">
          <div>UNLOCKED</div>
          <div className="text-lg text-[#facc15] mt-1">
            {ACHIEVEMENTS_DATA.filter((a) => a.status === 'UNLOCKED').length} / {ACHIEVEMENTS_DATA.length}
          </div>
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const isUnlocked = ach.status === 'UNLOCKED';

          return (
            <div
              key={ach.id}
              onClick={() => handleInspect(ach)}
              className={`p-5 rounded-lg border-3 transition-all duration-200 cursor-pointer shadow-pixel flex flex-col justify-between ${
                isUnlocked
                  ? 'border-[#facc15] bg-[#141235] hover:bg-[#1f1b4c] hover:shadow-pixel-gold hover:-translate-y-1'
                  : 'border-[#3730a3] bg-[#0d0c1e] opacity-70 hover:opacity-100 hover:border-[#6366f1]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#24214d]">
                  <span className="font-pixel text-[8px] text-[#38bdf8] bg-[#1a173d] px-2 py-0.5 rounded border border-[#4338ca]">
                    {ach.category}
                  </span>
                  <span className={`font-pixel text-[8px] px-2 py-0.5 rounded border ${
                    isUnlocked
                      ? 'bg-[#14532d] border-[#22c55e] text-[#86efac]'
                      : 'bg-[#334155] border-[#64748b] text-[#cbd5e1]'
                  }`}>
                    {isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                  </span>
                </div>

                {/* Big Trophy Icon */}
                <div className="my-3 flex justify-center text-4xl">
                  {isUnlocked ? ach.icon : '🔒'}
                </div>

                <div className="text-center font-silkscreen">
                  <h3 className="font-pixel text-xs text-[#fef08a] mb-1">
                    {isUnlocked ? ach.title : '??? LOCKED ???'}
                  </h3>
                  <p className="text-xs text-[#94a3b8] line-clamp-2">
                    {isUnlocked ? ach.description : 'This milestone has not yet been unlocked.'}
                  </p>
                </div>
              </div>

              {/* XP Badge & Inspect */}
              <div className="mt-4 pt-3 border-t border-[#1f1d44] flex items-center justify-between font-silkscreen text-[10px]">
                <span className="text-[#facc15] font-bold">{ach.xp}</span>
                <span className="font-pixel text-[8px] text-[#38bdf8]">
                  [ INSPECT ]
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-md pixel-box bg-[#0e0d26] p-6 rounded-lg border-4 border-[#facc15] shadow-pixel-gold text-white animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2756] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedAch.status === 'UNLOCKED' ? selectedAch.icon : '🔒'}</span>
                <h4 className="font-pixel text-sm text-[#fef08a]">
                  {selectedAch.status === 'UNLOCKED' ? selectedAch.title : 'LOCKED MILESTONE'}
                </h4>
              </div>
              <button
                onClick={() => {
                  sound.playCancel();
                  setSelectedAch(null);
                }}
                className="p-1 hover:bg-[#25234d] rounded text-[#94a3b8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-silkscreen text-xs">
              <div className="flex justify-between p-2.5 bg-[#141235] rounded border border-[#2b2756]">
                <span className="text-[#94a3b8]">STATUS:</span>
                <span className={`font-pixel text-[10px] ${selectedAch.status === 'UNLOCKED' ? 'text-[#4ade80]' : 'text-[#94a3b8]'}`}>
                  {selectedAch.status}
                </span>
              </div>

              <div className="p-3 bg-[#17153b] rounded border border-[#4338ca]">
                <span className="text-[#38bdf8] font-bold block mb-1">OBJECTIVE:</span>
                <p className="text-[#e2e8f0]">{selectedAch.description}</p>
              </div>

              <div className="p-3 bg-[#13112d] rounded border-l-4 border-[#facc15] italic text-[#fef08a]">
                “{selectedAch.lore}”
              </div>

              <div className="flex justify-between p-2.5 bg-[#141235] rounded border border-[#2b2756]">
                <span className="text-[#94a3b8]">XP EARNED:</span>
                <span className="font-pixel text-[10px] text-[#facc15]">{selectedAch.xp}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#2b2756] flex justify-end">
              <button
                onClick={() => {
                  sound.playCancel();
                  setSelectedAch(null);
                }}
                className="pixel-btn text-[10px] bg-[#1e1b4b]"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
