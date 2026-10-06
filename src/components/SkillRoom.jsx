import React, { useState } from 'react';
import { 
  ChevronLeft, Sparkles, X, Shield, Star, 
  CheckCircle2, Lock, Zap, BookOpen
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillRoom = ({ onBackToHub }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'MASTERED':
        return {
          label: 'MASTERED',
          border: 'border-[#facc15]',
          bg: 'bg-[#854d0e]/60 text-[#fef08a]',
          icon: '★'
        };
      case 'UNLOCKED':
        return {
          label: 'UNLOCKED',
          border: 'border-[#22c55e]',
          bg: 'bg-[#14532d]/60 text-[#bbf7d0]',
          icon: '✓'
        };
      case 'LEARNING':
        return {
          label: 'LEARNING',
          border: 'border-[#38bdf8]',
          bg: 'bg-[#075985]/60 text-[#bae6fd]',
          icon: '⚡'
        };
      case 'LOCKED':
      default:
        return {
          label: 'LOCKED',
          border: 'border-[#64748b]',
          bg: 'bg-[#334155]/60 text-[#cbd5e1]',
          icon: '🔒'
        };
    }
  };

  const handleInspectSkill = (skill, categoryName) => {
    sound.playConfirm();
    setSelectedSkill({ ...skill, category: categoryName });
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
          <div className="inline-block px-2.5 py-0.5 bg-[#0f766e] border border-[#2dd4bf] rounded font-pixel text-[9px] text-[#ccfbf1]">
            LOCATION: TRAINING ROOM
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            💻 SKILL ROOM
          </h2>
        </div>
      </div>

      {/* Intro Header */}
      <div className="mb-6 p-5 bg-[#0c0b20]/85 backdrop-blur-md rounded-lg border-2 border-[#3b3b6d] relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 shadow-pixel">
        <div className="relative z-10">
          <div className="font-pixel text-xs text-[#facc15] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#facc15]" />
            <span>RPG SKILL TREE & MASTERY TREE</span>
          </div>
          <p className="font-silkscreen text-xs text-[#cbd5e1] mt-1 max-w-xl">
            Coding is one facet of my journey. Here is the technical skill tree leveled up through projects, school, and continuous exploration.
          </p>
        </div>
        <div className="relative z-10 flex gap-2 font-pixel text-[8px] shrink-0">
          <span className="px-2 py-1 bg-[#854d0e]/80 border border-[#facc15] text-[#fef08a] rounded">MASTERED</span>
          <span className="px-2 py-1 bg-[#14532d]/80 border border-[#22c55e] text-[#bbf7d0] rounded">UNLOCKED</span>
          <span className="px-2 py-1 bg-[#075985]/80 border border-[#38bdf8] text-[#bae6fd] rounded">LEARNING</span>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-6">
        {SKILL_CATEGORIES.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="pixel-box bg-[#0c0b20]/85 backdrop-blur-md p-5 rounded-lg border-3 border-[#3b376b] shadow-pixel"
          >
            {/* Category Title Banner */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2b2756]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-pixel text-xs sm:text-sm text-[#fef08a]">
                    {cat.category}
                  </h3>
                  <div className="font-silkscreen text-[10px] text-[#94a3b8]">
                    {cat.description}
                  </div>
                </div>
              </div>
              <span className="font-pixel text-[9px] text-[#38bdf8] bg-[#1a173d] px-2 py-0.5 rounded border border-[#4338ca]">
                {cat.skills.length} NODES
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {cat.skills.map((skill, sIdx) => {
                const badge = getStatusBadge(skill.status);
                return (
                  <div
                    key={sIdx}
                    onClick={() => handleInspectSkill(skill, cat.category)}
                    className={`p-3 rounded-lg border-2 bg-[#12102e] hover:bg-[#1a173e] transition-all cursor-pointer group flex flex-col justify-between ${badge.border} hover:shadow-pixel-sm`}
                  >
                    <div>
                      {/* Top Skill Row: Name & Status */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-pixel text-xs text-white group-hover:text-[#fef08a] truncate">
                          {skill.name}
                        </span>
                        <span className={`font-pixel text-[8px] px-1.5 py-0.5 rounded border border-white/20 ${badge.bg}`}>
                          {badge.icon} {skill.status}
                        </span>
                      </div>

                      {/* Visual ASCII / Retro Progress Bar as in prompt */}
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#38bdf8] my-1">
                        <span className="tracking-wider">{skill.bar}</span>
                        <span className="font-pixel text-[9px] text-[#cbd5e1]">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Perk snippet */}
                    <div className="mt-2 pt-1.5 border-t border-[#232049] flex items-center justify-between font-silkscreen text-[9px] text-[#94a3b8]">
                      <span className="truncate">Perk: {skill.perk}</span>
                      <span className="text-[#facc15] font-pixel text-[8px] shrink-0 ml-1">
                        [ INFO ]
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Skill Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-md pixel-box bg-[#0d0c24] p-6 rounded-lg border-4 border-[#facc15] shadow-pixel-gold text-white animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2756] mb-4">
              <div>
                <span className="font-pixel text-[8px] text-[#38bdf8]">
                  {selectedSkill.category}
                </span>
                <h4 className="font-pixel text-sm text-[#fef08a] mt-0.5">
                  {selectedSkill.name}
                </h4>
              </div>
              <button
                onClick={() => {
                  sound.playCancel();
                  setSelectedSkill(null);
                }}
                className="p-1 hover:bg-[#25234d] rounded text-[#94a3b8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-silkscreen text-xs">
              <div className="flex justify-between p-2.5 bg-[#141235] rounded border border-[#2b2756]">
                <span className="text-[#94a3b8]">STATUS:</span>
                <span className="font-pixel text-[10px] text-[#facc15]">{selectedSkill.status}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-[#141235] rounded border border-[#2b2756]">
                <span className="text-[#94a3b8]">MASTERY XP:</span>
                <span className="font-bold text-[#4ade80]">{selectedSkill.xp}</span>
              </div>

              <div className="p-3 bg-[#17153b] rounded border border-[#4338ca]">
                <span className="text-[#facc15] font-bold block mb-1">SKILL PERK:</span>
                <p className="text-[#cbd5e1]">{selectedSkill.perk}</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#2b2756] flex justify-end">
              <button
                onClick={() => {
                  sound.playCancel();
                  setSelectedSkill(null);
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
