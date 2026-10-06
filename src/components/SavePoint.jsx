import React, { useState } from 'react';
import { 
  ChevronLeft, Sparkles, Save, CheckCircle, ExternalLink, 
  Github, Instagram, Linkedin, Mail, Heart
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { SAVE_POINT_DATA } from '../data/portfolioData';

export const SavePoint = ({ onBackToHub }) => {
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSaveGame = () => {
    sound.playSave();
    const saveState = {
      savedAt: new Date().toISOString(),
      player: "REZKY",
      level: 16,
      message: "Journey recorded in local chronicles."
    };
    try {
      localStorage.setItem('REZKY_RPG_SAVE', JSON.stringify(saveState));
    } catch (e) {}

    setSaveStatus('GAME SAVED! PROGRESS SECURELY RECORDED IN MEMORY CRYSTAL.');
    setTimeout(() => {
      setSaveStatus(null);
    }, 4500);
  };

  return (
    <div className="w-full min-h-screen pt-20 pb-24 px-4 sm:px-6 max-w-4xl mx-auto text-white select-none">
      
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
          <div className="inline-block px-2.5 py-0.5 bg-[#4c1d95] border border-[#a855f7] rounded font-pixel text-[9px] text-[#e9d5ff]">
            LOCATION: CELESTIAL SHRINE
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1">
            💾 SAVE POINT & SHRINE
          </h2>
        </div>
      </div>

      {/* Ancient Shrine Pedestal & Glowing Crystal */}
      <div className="pixel-box bg-[#0c0b22]/85 backdrop-blur-md p-6 sm:p-8 rounded-xl border-4 border-[#8b5cf6] shadow-pixel-glow text-center mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg mx-auto space-y-5">
          {/* Glowing Crystal Asset */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#3b0764] border-4 border-[#c084fc] flex items-center justify-center text-5xl shadow-[0_0_35px_rgba(192,132,252,0.6)] animate-pulse-glow">
              💎
            </div>
          </div>

          <h3 className="font-pixel text-lg sm:text-xl text-[#fef08a] tracking-wide">
            {SAVE_POINT_DATA.title}
          </h3>

          <p className="font-silkscreen text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
            {SAVE_POINT_DATA.shrineMessage}
          </p>

          {/* Interactive Save Button */}
          <div className="pt-2">
            <button
              onClick={handleSaveGame}
              className="pixel-btn pixel-btn-gold text-xs py-3 px-8 shadow-pixel-gold animate-bounce"
              style={{ animationDuration: '2s' }}
            >
              <Save className="w-4 h-4" />
              <span>[ SAVE GAME PROGRESS ]</span>
            </button>
          </div>

          {/* Saved Notification */}
          {saveStatus && (
            <div className="p-3 bg-[#14532d] border-2 border-[#22c55e] rounded font-pixel text-[10px] text-[#bbf7d0] animate-scale-up flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#4ade80]" />
              <span>{saveStatus}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#2d285a] font-silkscreen text-xs text-[#a5b4fc]">
            “Thanks for visiting my world.”
          </div>
        </div>

      </div>

      {/* Social / Contact Scrolls */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#2b2756]">
          <Sparkles className="w-4 h-4 text-[#facc15]" />
          <h3 className="font-pixel text-xs text-[#fef08a]">
            CONNECT WITH ME
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAVE_POINT_DATA.socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSelect()}
              className="p-4 rounded-lg border-2 border-[#3730a3] bg-[#12102f] hover:bg-[#1f1a4a] hover:border-[#facc15] shadow-pixel transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="text-3xl p-2 bg-[#1b1742] rounded border border-[#4338ca] group-hover:scale-110 transition-transform">
                  {soc.icon}
                </div>
                <div className="font-silkscreen">
                  <div className="font-pixel text-xs text-[#fef08a] group-hover:text-white">
                    {soc.name}
                  </div>
                  <div className="text-[11px] text-[#38bdf8] font-bold mt-0.5">
                    {soc.handle}
                  </div>
                  <div className="text-[10px] text-[#94a3b8] mt-0.5">
                    {soc.desc}
                  </div>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-[#94a3b8] group-hover:text-[#facc15] shrink-0" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};
