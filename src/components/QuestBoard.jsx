import React, { useState } from 'react';
import { 
  ChevronLeft, Sparkles, X, ExternalLink, Github, 
  CheckCircle, Swords, Award, Pin, Calendar
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { QUESTS_DATA } from '../data/portfolioData';

export const QuestBoard = ({ onBackToHub }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const handleOpenQuest = (quest) => {
    sound.playConfirm();
    setSelectedQuest(quest);
  };

  const handleCloseQuest = () => {
    sound.playCancel();
    setSelectedQuest(null);
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
          <div className="inline-block px-2.5 py-0.5 bg-[#78350f] border border-[#f59e0b] rounded font-pixel text-[9px] text-[#fef3c7]">
            LOCATION: GUILD NOTICE BOARD
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            📜 QUEST BOARD
          </h2>
        </div>
      </div>

      {/* Wooden Notice Board Frame */}
      <div className="p-4 sm:p-6 bg-[#2d1b0d] rounded-xl border-4 border-[#854d0e] shadow-pixel-gold mb-8">
        
        {/* Board Top Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-[#713f12]">
          <div className="flex items-center gap-2 text-[#fef3c7]">
            <Pin className="w-5 h-5 text-[#facc15] rotate-45" />
            <span className="font-pixel text-xs sm:text-sm">ACTIVE MISSIONS & EXPEDITIONS</span>
          </div>
          <span className="font-silkscreen text-[10px] text-[#fde68a]">
            {QUESTS_DATA.length} QUESTS POSTED
          </span>
        </div>

        {/* Quest Cards Grid (Pinned Paper Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUESTS_DATA.map((quest) => {
            const isCompleted = quest.status === 'COMPLETED';

            return (
              <div
                key={quest.id}
                onClick={() => handleOpenQuest(quest)}
                className={`p-5 rounded-lg border-3 bg-[#1e140a] hover:bg-[#2a1c0d] transition-all duration-200 cursor-pointer shadow-pixel relative group flex flex-col justify-between ${
                  isCompleted ? 'border-[#b45309]' : 'border-[#eab308]'
                }`}
              >
                {/* Visual Pin at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#ef4444] border-2 border-white shadow flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>

                <div>
                  {/* Quest ID & Status Badge */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#452712]">
                    <span className="font-pixel text-[9px] text-[#facc15] tracking-wider">
                      {quest.questNumber}
                    </span>
                    <span className={`font-pixel text-[8px] px-2 py-0.5 rounded border ${
                      isCompleted
                        ? 'bg-[#14532d] border-[#22c55e] text-[#86efac]'
                        : 'bg-[#713f12] border-[#facc15] text-[#fef08a] animate-pulse'
                    }`}>
                      {quest.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-pixel text-xs sm:text-sm text-[#fef3c7] group-hover:text-[#facc15] transition-colors leading-snug">
                    {quest.title}
                  </h3>

                  {/* Category & XP reward */}
                  <div className="flex items-center gap-2 mt-2 font-silkscreen text-[10px] text-[#cbd5e1]">
                    <span className="text-[#fdba74]">{quest.category}</span>
                    <span>•</span>
                    <span className="text-[#fde047] font-bold">{quest.xpReward}</span>
                  </div>

                  {/* Summary */}
                  <p className="font-silkscreen text-xs text-[#d6d3d1] mt-2.5 line-clamp-2">
                    {quest.summary}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {quest.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#3a200d] border border-[#78350f] rounded font-silkscreen text-[9px] text-[#fed7aa]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Quest Button */}
                <div className="mt-4 pt-3 border-t border-[#452712] flex justify-between items-center font-silkscreen text-xs">
                  <span className="text-[#9ca3af] text-[10px]">Role: {quest.role}</span>
                  <span className="font-pixel text-[9px] text-[#facc15] group-hover:translate-x-1 transition-transform">
                    [ VIEW QUEST ▶ ]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quest Parchment Details Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-2xl pixel-box bg-[#1b120a] p-6 rounded-lg border-4 border-[#facc15] shadow-pixel-gold text-white animate-scale-up max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#542d13] mb-4">
              <div>
                <span className="font-pixel text-[9px] text-[#facc15]">
                  {selectedQuest.questNumber} • {selectedQuest.category}
                </span>
                <h3 className="font-pixel text-sm sm:text-base text-[#fef3c7] mt-1">
                  {selectedQuest.title}
                </h3>
              </div>
              <button
                onClick={handleCloseQuest}
                className="p-1 hover:bg-[#3d200c] rounded text-[#d6d3d1] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quest Mission Banner Header */}
            <div className="mb-4 rounded-lg overflow-hidden border-2 border-[#854d0e] bg-gradient-to-br from-[#2a1708] via-[#1a0f05] to-[#120a03] p-4 relative flex flex-col justify-between min-h-[130px] shadow-pixel">
              {/* Background retro decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3d210c15_1px,transparent_1px),linear-gradient(to_bottom,#3d210c15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#3d200c] border-2 border-[#facc15] flex items-center justify-center text-2xl shadow-pixel-sm shrink-0">
                    {selectedQuest.icon || '📜'}
                  </div>
                  <div>
                    <span className="font-pixel text-[9px] text-[#facc15] tracking-wider block">
                      {selectedQuest.questNumber} • {selectedQuest.category}
                    </span>
                    <h4 className="font-pixel text-xs sm:text-sm text-[#fef08a] mt-0.5">
                      {selectedQuest.title}
                    </h4>
                  </div>
                </div>

                <div className="font-pixel text-[8px] bg-black/80 px-2.5 py-1 rounded border border-[#facc15] text-[#fef08a] shrink-0">
                  {selectedQuest.status}
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#542d13] font-silkscreen text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#a8a29e]">DIFFICULTY:</span>
                  <span className="text-[#f87171] font-bold font-pixel text-[9px]">{selectedQuest.difficulty}</span>
                </div>
                <div className="text-[#fde047] font-bold">
                  XP REWARD: {selectedQuest.xpReward}
                </div>
              </div>
            </div>

            {/* Quest Content */}
            <div className="space-y-4 font-silkscreen text-xs">
              
              {/* Description */}
              <div className="p-3 bg-[#26170d] rounded border border-[#542d13]">
                <span className="text-[#facc15] font-bold block mb-1">MISSION OVERVIEW:</span>
                <p className="text-[#e7e5e4] leading-relaxed">{selectedQuest.summary}</p>
              </div>

              {/* Key Features */}
              <div className="p-3 bg-[#26170d] rounded border border-[#542d13]">
                <span className="text-[#38bdf8] font-bold block mb-1">QUEST OBJECTIVES & FEATURES:</span>
                <ul className="list-disc list-inside space-y-1.5 text-[#e7e5e4]">
                  {selectedQuest.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Technology & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#26170d] rounded border border-[#542d13]">
                  <span className="text-[#4ade80] font-bold block mb-1">TECHNOLOGY STACK:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedQuest.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#3a200d] border border-[#78350f] rounded text-[10px] text-[#fed7aa]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#26170d] rounded border border-[#542d13]">
                  <span className="text-[#fef08a] font-bold block mb-1">CHARACTER ROLE:</span>
                  <div className="text-white font-bold">{selectedQuest.role}</div>
                </div>
              </div>

            </div>

            {/* Links / Action Buttons */}
            <div className="mt-6 pt-4 border-t-2 border-[#542d13] flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-2">
                {selectedQuest.githubUrl && (
                  <a
                    href={selectedQuest.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-btn text-[9px] bg-[#1a1738] border-[#6366f1] text-white flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB REPO</span>
                  </a>
                )}
                {selectedQuest.demoUrl && selectedQuest.demoUrl !== '#' && (
                  <a
                    href={selectedQuest.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-btn pixel-btn-gold text-[9px] flex items-center gap-1.5"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={handleCloseQuest}
                className="pixel-btn text-[10px] bg-[#3a200d] border-[#78350f]"
              >
                CLOSE QUEST
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
