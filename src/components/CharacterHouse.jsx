import React from 'react';
import { 
  User, Shield, Sparkles, BookOpen, GraduationCap, Heart, 
  Coffee, Award, ChevronLeft, Swords, Star
} from 'lucide-react';
import PixelTransition from '../PixelTransition';
import { sound } from '../services/soundEngine';
import { CHARACTER_DATA } from '../data/portfolioData';
import { PixelAvatar } from './PixelAvatar';

export const CharacterHouse = ({ onBackToHub, theme = 'NIGHT' }) => {
  const themePixelColor = theme === 'DAY' ? '#38bdf8' : theme === 'RETRO' ? '#22c55e' : '#facc15';
  return (
    <div className="w-full min-h-screen pt-20 pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-white select-none">
      
      {/* Room Header with Back Button */}
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
          <div className="inline-block px-2.5 py-0.5 bg-[#1e1b4b] border border-[#6366f1] rounded font-pixel text-[9px] text-[#facc15]">
            LOCATION: BEDROOM & STUDY
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            🧍 CHARACTER HOUSE
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pixel Avatar & PixelTransition Card (4 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Character Avatar Profile Card (Transparent) */}
          <div className="pixel-box bg-black/40 backdrop-blur-sm p-5 rounded-lg border-4 border-[#4338ca] shadow-pixel">
            <div className="text-center font-pixel text-xs text-[#facc15] mb-3 pb-2 border-b border-[#2b2854]">
              CHARACTER INFO
            </div>

            {/* Pixel Transition Card Feature (as requested by user) */}
            <div className="my-4 flex flex-col items-center">
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center p-3 relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      <PixelAvatar mode="adventurer" size="lg" animated />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="font-pixel text-[9px] text-[#facc15] bg-black/75 px-2 py-0.5 rounded border border-[#facc15]/40 inline-block">
                        REZKY: EXPLORER MODE
                      </span>
                      <div className="text-[8px] font-silkscreen text-[#94a3b8] mt-1">CLASS: CREATIVE EXPLORER</div>
                    </div>
                  </div>
                }
                secondContent={
                  <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center p-3 relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      <PixelAvatar mode="coder" size="lg" animated />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="font-pixel text-[9px] text-[#38bdf8] bg-black/75 px-2 py-0.5 rounded border border-[#38bdf8]/40 inline-block">
                        REZKY: CODER MODE
                      </span>
                      <div className="text-[8px] font-silkscreen text-[#94a3b8] mt-1">CLASS: SOFTWARE CRAFTSMAN</div>
                    </div>
                  </div>
                }
                gridSize={28}
                pixelColor={themePixelColor}
                once={false}
                animationStepDuration={0.8}
                className="custom-pixel-card w-full max-w-[260px] aspect-square rounded-lg border-4 border-[#facc15] shadow-pixel-gold"
              />
              <span className="font-silkscreen text-[9px] text-[#94a3b8] mt-2 italic">
                (Hover or tap the card to trigger pixel dissolve)
              </span>
            </div>

            {/* Basic Info Data */}
            <div className="space-y-2.5 font-silkscreen text-xs bg-black/40 p-3 rounded border border-[#272352]">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">NAME:</span>
                <span className="font-pixel text-xs text-[#fef08a]">{CHARACTER_DATA.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">NICKNAME:</span>
                <span className="text-[#e2e8f0]">{CHARACTER_DATA.nickname}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">LEVEL:</span>
                <span className="font-pixel text-[#38bdf8] text-xs">LV.{CHARACTER_DATA.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">CLASS:</span>
                <span className="text-[#a5b4fc] text-[10px]">{CHARACTER_DATA.classType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">CURRENT QUEST:</span>
                <span className="text-[#4ade80] text-[10px] font-bold">{CHARACTER_DATA.currentQuest}</span>
              </div>
            </div>

            {/* Equipment Slots */}
            <div className="mt-4 pt-3 border-t border-[#2b2854]">
              <div className="font-pixel text-[9px] text-[#facc15] mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>EQUIPPED GEAR:</span>
              </div>
              <div className="space-y-1.5 font-silkscreen text-[10px]">
                {CHARACTER_DATA.equipment.map((eq, i) => (
                  <div key={i} className="flex justify-between p-1.5 bg-black/40 rounded border border-[#2b2756]">
                    <span className="text-[#94a3b8] text-[9px]">[{eq.slot}]</span>
                    <span className="text-[#e2e8f0] font-bold">{eq.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Bio, Education, Stats & Quote (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* About Me Section (Transparent) */}
          <div className="pixel-box bg-black/40 backdrop-blur-sm p-5 rounded-lg border-4 border-[#3b3b6d] shadow-pixel">
            <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#2b2854]">
              <BookOpen className="w-4 h-4 text-[#facc15]" />
              <h3 className="font-pixel text-xs text-[#fef08a]">ABOUT ME</h3>
            </div>

            <p className="font-silkscreen text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-4">
              {CHARACTER_DATA.bio}
            </p>

            {/* Education & Major Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-silkscreen text-xs mb-4">
              <div className="p-3 bg-black/40 rounded border border-[#2a2656]">
                <div className="text-[10px] text-[#94a3b8] flex items-center gap-1 mb-1">
                  <GraduationCap className="w-3 h-3 text-[#38bdf8]" />
                  <span>EDUCATION:</span>
                </div>
                <div className="text-[#fef08a] font-bold">{CHARACTER_DATA.education}</div>
              </div>

              <div className="p-3 bg-black/40 rounded border border-[#2a2656]">
                <div className="text-[10px] text-[#94a3b8] flex items-center gap-1 mb-1">
                  <Award className="w-3 h-3 text-[#facc15]" />
                  <span>MAJOR (JURUSAN):</span>
                </div>
                <div className="text-[#38bdf8] font-bold">{CHARACTER_DATA.major}</div>
              </div>
            </div>

            {/* Personality & Currently Learning */}
            <div className="p-3 bg-black/40 rounded border border-[#2a2656] space-y-2 font-silkscreen text-xs">
              <div>
                <span className="text-[#94a3b8] text-[10px]">PERSONALITY: </span>
                <span className="text-[#4ade80] font-bold">{CHARACTER_DATA.personality}</span>
              </div>
              <div className="pt-2 border-t border-[#232049]">
                <div className="text-[#94a3b8] text-[10px] mb-1">CURRENTLY RESEARCHING & LEARNING:</div>
                <ul className="list-disc list-inside space-y-1 text-[#cbd5e1] text-[11px]">
                  {CHARACTER_DATA.currentlyLearning.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-4 p-3 bg-gradient-to-r from-black/60 to-black/30 border-l-4 border-[#facc15] rounded">
              <p className="font-silkscreen text-xs text-[#fef08a] italic">
                {CHARACTER_DATA.quote}
              </p>
            </div>
          </div>

          {/* Visual Character Stats (Storytelling Elements - Transparent) */}
          <div className="pixel-box bg-black/40 backdrop-blur-sm p-5 rounded-lg border-4 border-[#3b3b6d] shadow-pixel">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#2b2854]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#facc15]" />
                <h3 className="font-pixel text-xs text-[#fef08a]">CHARACTER STATS</h3>
              </div>
              <span className="font-silkscreen text-[9px] text-[#94a3b8]">
                [GAMEPLAY PROFILE]
              </span>
            </div>

            <div className="space-y-3 font-silkscreen text-xs">
              {CHARACTER_DATA.stats.map((st, i) => (
                <div key={i} className="p-2.5 bg-black/40 rounded border border-[#26234f]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#cbd5e1] font-bold text-[11px]">{st.name}</span>
                    <span className="font-pixel text-[10px] text-[#facc15]">{st.value}%</span>
                  </div>
                  {/* Visual ASCII / Retro Bar */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#38bdf8]">{st.bar}</span>
                    <div className="flex-1 h-2 bg-black/60 rounded-xs overflow-hidden border border-[#4338ca]">
                      <div 
                        className="h-full bg-gradient-to-r from-[#6366f1] to-[#facc15]"
                        style={{ width: `${st.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts (Transparent) */}
          <div className="pixel-box bg-black/40 backdrop-blur-sm p-5 rounded-lg border-4 border-[#3b3b6d] shadow-pixel">
            <div className="font-pixel text-xs text-[#facc15] mb-3 pb-2 border-b border-[#2b2854]">
              ★ FUN FACTS & TRAITS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-silkscreen text-xs">
              {CHARACTER_DATA.funFacts.map((fact, idx) => (
                <div key={idx} className="p-2.5 bg-black/40 rounded border border-[#26234f] flex items-center gap-2.5">
                  <span className="text-xl">{fact.icon}</span>
                  <div>
                    <div className="text-[10px] text-[#94a3b8]">{fact.label}</div>
                    <div className="text-[#e2e8f0] font-bold text-[11px]">{fact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
