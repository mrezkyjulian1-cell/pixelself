import React from 'react';
import { 
  ChevronLeft, Disc, Play, Pause, SkipForward, SkipBack, 
  ExternalLink, Volume2, Sparkles, Music2, Radio
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { JUKEBOX_PLAYLISTS } from '../data/portfolioData';

export const Jukebox = ({
  onBackToHub,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  soundSettings,
  onUpdateSoundSettings,
}) => {
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
          <div className="inline-block px-2.5 py-0.5 bg-[#4c1d95] border border-[#a855f7] rounded font-pixel text-[9px] text-[#e9d5ff]">
            LOCATION: NEON JUKEBOX CORNER
          </div>
          <h2 className="font-pixel text-xl sm:text-2xl text-[#fef08a] mt-1 flex items-center justify-end gap-2">
            <span>🎵 JUKEBOX</span>
          </h2>
        </div>
      </div>

      {/* Main Jukebox Interactive Console */}
      <div className="pixel-box bg-[#0c0b20] p-6 rounded-xl border-4 border-[#6366f1] shadow-pixel-glow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Animated Vinyl Disc Art (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#12112e] rounded-lg border-2 border-[#38336d]">
            <div className="relative">
              {/* Spinning Vinyl */}
              <div 
                className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#facc15] bg-[#080811] flex items-center justify-center shadow-pixel-gold ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                {/* Grooves */}
                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-white/15 flex items-center justify-center">
                    {/* Center Label */}
                    <div className="w-14 h-14 rounded-full bg-[#4338ca] border-2 border-[#facc15] flex items-center justify-center text-center p-1">
                      <Disc className="w-6 h-6 text-[#facc15]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tonearm */}
              <div className="absolute -top-3 -right-2 w-8 h-12 border-t-2 border-r-2 border-[#94a3b8] rounded-tr-lg" />
            </div>

            <div className="mt-4 text-center font-silkscreen">
              <span className="font-pixel text-[10px] text-[#facc15] block">
                16-BIT RETRO SYNTH ENGINE
              </span>
              <span className="text-[9px] text-[#94a3b8]">
                Continuous Lo-fi playback across all rooms
              </span>
            </div>
          </div>

          {/* Player Display & Controls (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Display Screen */}
            <div className="p-4 bg-[#141235] border-2 border-[#4338ca] rounded-lg font-pixel space-y-2">
              <div className="flex items-center justify-between text-[8px] text-[#94a3b8] font-silkscreen">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-[#10b981] animate-pulse" />
                  <span>ONLINE RETRO STREAM</span>
                </span>
                <span className="text-[#38bdf8]">CHIPTUNE V2.0</span>
              </div>

              <div className="text-xs text-[#94a3b8]">NOW PLAYING:</div>
              <div className="text-base sm:text-lg text-[#fef08a] truncate tracking-wide">
                {currentTrack?.title || 'Lofi - Night Drive'}
              </div>
              <div className="text-xs text-[#38bdf8] font-silkscreen">
                ARTIST: {currentTrack?.artist || 'Rezky Retro OST'}
              </div>

              {/* Simulated Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-[9px] font-mono text-[#cbd5e1] mb-1">
                  <span>01:45</span>
                  <span className="text-[#facc15]">━━━━━━━━━━━━░</span>
                  <span>03:20</span>
                </div>
                <div className="w-full h-2 bg-[#201d4a] rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#facc15] w-[65%]" />
                </div>
              </div>
            </div>

            {/* Controls Bar: Prev, Play, Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#13112d] border border-[#2b2756] rounded-lg">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playSelect();
                    onPrevTrack();
                  }}
                  className="pixel-btn text-[9px] p-2 bg-[#1e1b4b]"
                  title="Previous Track (◀)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    sound.playSelect();
                    onTogglePlay();
                  }}
                  className="pixel-btn pixel-btn-gold text-xs px-4 py-2"
                  title={isPlaying ? "Pause (❚❚)" : "Play (▶)"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playSelect();
                    onNextTrack();
                  }}
                  className="pixel-btn text-[9px] p-2 bg-[#1e1b4b]"
                  title="Next Track (▶▶)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider in Jukebox */}
              <div className="flex items-center gap-2 font-silkscreen text-xs">
                <Volume2 className="w-4 h-4 text-[#facc15]" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(soundSettings.bgmVolume * 100)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    onUpdateSoundSettings({ bgmVolume: val });
                  }}
                  className="w-24 sm:w-28 accent-[#facc15] cursor-pointer"
                />
                <span className="text-[10px] text-[#cbd5e1] w-8">
                  {Math.round(soundSettings.bgmVolume * 100)}%
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Spotify Playlists Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#2b2756]">
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-[#facc15]" />
            <h3 className="font-pixel text-xs text-[#fef08a]">
              CURATED SPOTIFY PLAYLISTS
            </h3>
          </div>
          <span className="font-silkscreen text-[10px] text-[#94a3b8]">
            [OPEN DIRECTLY IN SPOTIFY]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {JUKEBOX_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              className="pixel-box bg-[#0e0d24] p-4 rounded-lg border-3 border-[#3730a3] hover:border-[#facc15] shadow-pixel transition-all group flex flex-col justify-between"
            >
              <div>
                {/* 16-Bit Retro Mixtape / Cassette Artwork */}
                <div 
                  className="w-full h-36 rounded-md overflow-hidden border-2 border-[#4338ca] group-hover:border-[#facc15] mb-3 relative flex flex-col justify-between p-3 transition-colors duration-300"
                  style={{ background: `linear-gradient(135deg, ${pl.color}30 0%, #0d0c1e 100%)` }}
                >
                  {/* Cassette Top: Icon & Track count */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full border-2 border-[#facc15]/80 bg-[#080811] flex items-center justify-center text-base group-hover:rotate-45 transition-transform duration-500">
                      {pl.icon || '🎵'}
                    </div>
                    <div className="bg-black/75 px-2 py-0.5 rounded text-[8px] font-pixel text-[#facc15] border border-white/20">
                      {pl.tracksCount}
                    </div>
                  </div>

                  {/* Simulated Audio Frequency Waveform */}
                  <div className="flex items-end gap-1 h-8 opacity-50 group-hover:opacity-90 transition-opacity">
                    {[35, 75, 45, 90, 60, 100, 55, 80, 40, 85, 65, 30].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t"
                        style={{ height: `${h}%`, backgroundColor: pl.color }}
                      />
                    ))}
                  </div>

                  {/* Bottom Cassette Tape Tag */}
                  <div className="flex justify-between items-center text-[8px] font-silkscreen text-[#cbd5e1] border-t border-white/10 pt-1.5">
                    <span className="text-[#38bdf8] font-bold">{pl.genre}</span>
                    <span className="text-[#94a3b8] font-mono">STEREO • 16-BIT</span>
                  </div>
                </div>

                {/* Playlist Name & Description */}
                <h4 className="font-pixel text-xs sm:text-sm text-[#fef08a] group-hover:text-white mb-1">
                  {pl.name}
                </h4>
                <p className="font-silkscreen text-xs text-[#94a3b8] line-clamp-2">
                  {pl.description}
                </p>
              </div>

              {/* Spotify Link Button */}
              <div className="mt-4 pt-3 border-t border-[#1f1d44]">
                <a
                  href={pl.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSelect()}
                  className="w-full pixel-btn text-[9px] bg-[#1a382b] hover:bg-[#22543d] border-[#10b981] text-[#a7f3d0] flex items-center justify-center gap-2"
                >
                  <span>LISTEN ON SPOTIFY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
