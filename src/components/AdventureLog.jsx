import React from 'react';
import { ChevronLeft, Compass, Calendar, Sparkles, MapPin } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { ADVENTURE_LOG } from '../data/portfolioData';

export const AdventureLog = ({ onBackToHub }) => {
  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 sm:pb-20 px-6 sm:px-12 md:px-16 lg:px-20 text-white select-none flex items-end justify-start bg-transparent">
      <div className="w-full max-w-md lg:max-w-lg">
        
        {/* Header with Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#facc15]/30">
          <button
            onClick={() => {
              sound.playCancel();
              onBackToHub();
            }}
            className="pixel-btn text-[9px] py-1.5 px-3 bg-black/50 border border-[#facc15]/40 hover:bg-black/70 flex items-center gap-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>WORLD MAP</span>
          </button>

          <div className="text-right">
            <div className="inline-block px-2 py-0.5 bg-black/60 border border-[#facc15]/40 rounded font-pixel text-[8px] text-[#fef08a]">
              ARCHIVES
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-[#fef08a] mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              🗺️ ADVENTURE LOG
            </h2>
          </div>
        </div>

        {/* Compact Intro Box (Transparent) */}
        <div className="mb-4 p-3 bg-black/35 backdrop-blur-[2px] rounded-lg border-2 border-[#facc15]/40 shadow-pixel">
          <div className="font-pixel text-[10px] text-[#facc15] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#facc15]" />
            <span>PERSONAL EXPEDITION TIMELINE</span>
          </div>
          <p className="font-silkscreen text-[11px] text-[#cbd5e1] mt-1 leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
            Every adventurer starts at Lv. 1. Here is how the journey unfolded from the first code to the present.
          </p>
        </div>

        {/* Visual RPG Branching Timeline (Compact & Transparent) */}
        <div className="bg-black/35 backdrop-blur-[2px] p-4 sm:p-5 rounded-xl border-3 border-[#facc15]/60 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          <div className="relative pl-5 sm:pl-7 space-y-6">
            
            {/* Vertical Timeline Backbone Line */}
            <div className="absolute top-3 bottom-3 left-2 sm:left-3 w-0.5 bg-gradient-to-b from-[#6366f1] via-[#facc15] to-[#10b981]" />

            {ADVENTURE_LOG.map((logGroup, gIdx) => (
              <div key={gIdx} className="relative space-y-3">
                
                {/* Year Marker Badge */}
                <div className="relative flex items-center gap-2">
                  <div className="absolute -left-5 sm:-left-6 w-5 h-5 rounded-full bg-black/80 border-2 border-[#facc15] flex items-center justify-center text-[10px] shadow z-10">
                    <Calendar className="w-2.5 h-2.5 text-[#facc15]" />
                  </div>
                  <div className="font-pixel text-xs text-[#fef08a] bg-black/60 px-2.5 py-0.5 rounded border border-[#facc15]/50 inline-block shadow">
                    YEAR {logGroup.year}
                  </div>
                </div>

                {/* Events under Year */}
                <div className="space-y-2.5 pl-1 sm:pl-2">
                  {logGroup.events.map((evt, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3 rounded-lg bg-black/40 hover:bg-black/60 border border-[#facc15]/30 hover:border-[#facc15] transition-all shadow-pixel group"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-xl shrink-0 p-1.5 bg-black/60 rounded border border-[#facc15]/40 group-hover:scale-105 transition-transform">
                          {evt.icon}
                        </div>

                        <div className="space-y-0.5 flex-1 font-silkscreen">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h3 className="font-pixel text-[11px] text-[#fef08a] group-hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,1)]">
                              {evt.title}
                            </h3>
                            <span className="text-[9px] text-[#38bdf8] font-bold">
                              {evt.subtitle}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-[#cbd5e1] leading-relaxed pt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                            {evt.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};
