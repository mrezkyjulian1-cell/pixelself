import React, { useState } from 'react';
import { 
  ChevronLeft, Sparkles, X, Heart, Award, Flame, 
  Gamepad2, Compass, BookOpen, Utensils, Headphones, Palette
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { HOBBIES_DATA } from '../data/portfolioData';

export const HobbyRoom = ({ onBackToHub }) => {
  const [selectedHobby, setSelectedHobby] = useState(null);

  const handleOpenHobby = (hobby) => {
    sound.playConfirm();
    setSelectedHobby(hobby);
  };

  const handleCloseModal = () => {
    sound.playCancel();
    setSelectedHobby(null);
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
          <div className="inline-block px-2.5 py-0.5 bg-[#064e3b] border border-[#10b981] rounded font-pixel text-[9px] text-[#a7f3d0]">
            LOCATION: HOBBY CHAMBER
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            🎮 HOBBY ROOM
          </h2>
        </div>
      </div>

      {/* Intro banner */}
      <div className="mb-6 p-4 bg-[#0c0b20]/85 backdrop-blur-md rounded-lg border-2 border-[#3b3b6d] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-pixel">
        <div>
          <div className="font-pixel text-xs text-[#facc15] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>MORE THAN JUST CODE: REZKY'S PASSIONS</span>
          </div>
          <p className="font-silkscreen text-xs text-[#cbd5e1] mt-1">
            Life is meant to be explored across multiple dimensions. Click any object in the room to inspect memories, milestones, and favorites.
          </p>
        </div>
        <div className="px-3 py-1 bg-[#1e1b4b]/90 border border-[#4338ca] rounded text-[10px] font-pixel text-[#38bdf8] shrink-0">
          7 OBJECTS TO INSPECT
        </div>
      </div>

      {/* Grid of Interactive Hobby Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOBBIES_DATA.map((hobby) => (
          <div
            key={hobby.id}
            onClick={() => handleOpenHobby(hobby)}
            className="pixel-box bg-[#0c0b20]/85 backdrop-blur-md p-5 rounded-lg border-3 border-[#3730a3] hover:border-[#facc15] shadow-pixel hover:shadow-pixel-gold transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Item Top Bar */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#24214a]">
                <span className="font-pixel text-[8px] text-[#38bdf8] bg-[#1a173d] px-2 py-0.5 rounded border border-[#4338ca]">
                  {hobby.category}
                </span>
                <span className="font-pixel text-[8px] text-[#facc15] group-hover:animate-bounce">
                  [ INSPECT ]
                </span>
              </div>

              {/* Big Animated Icon / Sprite */}
              <div className="my-3 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-[#17153b] border-2 border-[#4338ca] group-hover:border-[#facc15] flex items-center justify-center text-4xl shadow-pixel-sm transition-transform group-hover:scale-110">
                  {hobby.icon}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="text-center">
                <h3 className="font-pixel text-sm text-[#fef08a] group-hover:text-white">
                  {hobby.title}
                </h3>
                <p className="font-silkscreen text-xs text-[#94a3b8] mt-1.5 line-clamp-2">
                  {hobby.tagline}
                </p>
              </div>
            </div>

            {/* Inspect prompt bottom button */}
            <div className="mt-4 pt-3 border-t border-[#1f1c42] flex justify-center">
              <span className="font-silkscreen text-[10px] text-[#a5b4fc] group-hover:text-[#facc15] flex items-center gap-1">
                <span>View Details</span>
                <span className="font-pixel text-[8px]">▶</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Hobby Modal Inspector */}
      {selectedHobby && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-2xl pixel-box bg-[#0c0b22] p-6 rounded-lg border-4 border-[#facc15] shadow-pixel-gold text-white animate-scale-up max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#2b2756] mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedHobby.icon}</span>
                <div>
                  <h3 className="font-pixel text-sm sm:text-base text-[#fef08a]">
                    {selectedHobby.title}
                  </h3>
                  <div className="font-silkscreen text-[10px] text-[#38bdf8]">
                    CATEGORY: {selectedHobby.category}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-[#27254e] rounded border border-transparent hover:border-[#6366f1] text-[#94a3b8] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header Tagline Banner */}
            <div className="mb-4 p-3 rounded-lg border-2 border-[#4338ca] bg-[#141238]/90 font-silkscreen text-xs text-[#fef08a] flex items-center justify-between">
              <span>{selectedHobby.tagline}</span>
              <span className="font-pixel text-[9px] text-[#38bdf8] bg-black/60 px-2 py-0.5 rounded border border-white/20">
                PASSION LOG
              </span>
            </div>

            {/* Hobby Content depending on category */}
            <div className="space-y-4 font-silkscreen text-xs">
              
              {/* GAMING Specific Details */}
              {selectedHobby.id === 'gaming' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#facc15] font-bold block mb-1">FAVORITE GAMES:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHobby.details.favoriteGames.map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-[#1e1b4b] border border-[#6366f1] rounded text-[#e0e7ff] text-[11px]">
                          🎮 {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#38bdf8] font-bold block mb-1">FAVORITE GENRES:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.favoriteGenres.join(', ')}</div>
                    </div>
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#4ade80] font-bold block mb-1">PLATFORMS:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.platforms.join(' & ')}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1a173d] rounded border border-[#4338ca]">
                    <span className="text-[#fef08a] font-bold block mb-1">CURRENTLY PLAYING:</span>
                    <div className="text-white font-bold">{selectedHobby.details.currentlyPlaying}</div>
                  </div>
                </div>
              )}

              {/* RUNNING Specific Details */}
              {selectedHobby.id === 'running' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#facc15] font-bold block mb-1">PERSONAL MILESTONES:</span>
                    <ul className="list-disc list-inside space-y-1 text-[#e2e8f0]">
                      {selectedHobby.details.milestones.map((m, i) => (
                        <li key={i} className="font-bold text-[#34d399]">🏃 {m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#38bdf8] font-bold block mb-1">BEST RUNNING ENVIRONMENT:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.bestEnvironment}</div>
                    </div>
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#f43f5e] font-bold block mb-1">RUNNING SOUNDTRACK:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.runningSoundtrack}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMULA 1 Specific Details */}
              {selectedHobby.id === 'f1' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#ef4444] font-bold block mb-1">FAVORITE TEAMS:</span>
                      <div className="text-[#cbd5e1] font-bold">{selectedHobby.details.favoriteTeams.join(' & ')}</div>
                    </div>
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#facc15] font-bold block mb-1">FAVORITE DRIVERS:</span>
                      <div className="text-[#cbd5e1] font-bold">{selectedHobby.details.favoriteDrivers.join(' & ')}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#38bdf8] font-bold block mb-1">WHAT'S THRILLING ABOUT F1:</span>
                    <div className="text-[#cbd5e1] leading-relaxed">{selectedHobby.details.whatAttractsMe}</div>
                  </div>
                </div>
              )}

              {/* READING Specific Details */}
              {selectedHobby.id === 'reading' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#facc15] font-bold block mb-1">FAVORITE NOVEL GENRES:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.novelGenres.join(', ')}</div>
                    </div>
                    <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                      <span className="text-[#38bdf8] font-bold block mb-1">MANGA & MANHWA:</span>
                      <div className="text-[#cbd5e1]">{selectedHobby.details.mangaManhwa.join(', ')}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#4ade80] font-bold block mb-1">CURRENT READING LIST:</span>
                    <div className="text-white font-bold">{selectedHobby.details.currentReadingList}</div>
                  </div>
                </div>
              )}

              {/* COOKING Specific Details */}
              {selectedHobby.id === 'cooking' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#facc15] font-bold block mb-1">SIGNATURE DISHES:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {selectedHobby.details.specialtyDishes.map((d, i) => (
                        <div key={i} className="p-2 bg-[#1b193d] rounded border border-[#3b376b] text-[#e0e7ff]">
                          🍳 {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#1a173e] rounded border border-[#4338ca]">
                    <span className="text-[#fef08a] font-bold block mb-1">COOKING PHILOSOPHY:</span>
                    <div className="text-[#cbd5e1] italic">{selectedHobby.details.cookingPhilosophy}</div>
                  </div>
                </div>
              )}

              {/* CREATIVE TOOLS Specific Details */}
              {selectedHobby.id === 'creative' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#facc15] font-bold block mb-1">TOOLS IN ARSENAL:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedHobby.details.tools.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#1e1b4b] border border-[#6366f1] rounded text-[#e0e7ff]">
                          🎨 {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#38bdf8] font-bold block mb-1">AREAS OF INTEREST:</span>
                    <div className="text-[#cbd5e1]">{selectedHobby.details.interests.join(' • ')}</div>
                  </div>
                </div>
              )}

              {/* HEADPHONES / AUDIO Specific Details */}
              {selectedHobby.id === 'headphones' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#facc15] font-bold block mb-1">AUDIO GEAR:</span>
                    <div className="text-[#cbd5e1]">{selectedHobby.details.gear.join(' • ')}</div>
                  </div>
                  <div className="p-3 bg-[#13112e] rounded border border-[#2b2756]">
                    <span className="text-[#38bdf8] font-bold block mb-1">FAVORITE GENRES:</span>
                    <div className="text-[#cbd5e1]">{selectedHobby.details.favoriteGenres.join(', ')}</div>
                  </div>
                </div>
              )}

              {/* Personal Story & Rationale */}
              {selectedHobby.details.story && (
                <div className="p-3 bg-[#151336] rounded border-l-4 border-[#facc15] text-[#cbd5e1] italic">
                  “{selectedHobby.details.story}”
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t-2 border-[#2b2756] flex justify-end">
              <button
                onClick={handleCloseModal}
                className="pixel-btn text-[10px] bg-[#1e1b4b]"
              >
                CLOSE INSPECTION
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
