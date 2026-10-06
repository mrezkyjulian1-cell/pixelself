import React, { useState, useEffect, useRef } from 'react';
import PixelTransition from './PixelTransition';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';
import { IntroScreen } from './components/IntroScreen';
import { WorldHub } from './components/WorldHub';
import { CharacterHouse } from './components/CharacterHouse';
import { HobbyRoom } from './components/HobbyRoom';
import { Jukebox } from './components/Jukebox';
import { SkillRoom } from './components/SkillRoom';
import { QuestBoard } from './components/QuestBoard';
import { AchievementHall } from './components/AchievementHall';
import { AdventureLog } from './components/AdventureLog';
import { SavePoint } from './components/SavePoint';
import { ExitScreen } from './components/ExitScreen';
import { SettingsModal } from './components/SettingsModal';
import { LoadGameModal } from './components/LoadGameModal';
import { sound } from './services/soundEngine';

export function App() {
  // Current view state
  const [currentView, setCurrentView] = useState('MAIN_MENU');
  // Pending view for PixelTransition animation
  const [nextView, setNextView] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  // Audio & Music state
  const [hasAudioStarted, setHasAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(sound.getCurrentTrack());
  const [soundSettings, setSoundSettings] = useState({
    isBgmEnabled: true,
    isSfxEnabled: true,
    bgmVolume: 0.8,
    sfxVolume: 0.7,
  });

  // Display Settings
  const [displaySettings, setDisplaySettings] = useState({
    pixelEffect: true,
    crtEffect: true,
    screenShake: true,
    animation: true,
  });

  // Theme state: 'NIGHT' | 'DAY' | 'RETRO'
  const [theme, setTheme] = useState('NIGHT');
  const [isScreenShaking, setIsScreenShaking] = useState(false);

  // Dynamic transition pixel color matching the active theme
  const getThemePixelColor = () => {
    switch (theme) {
      case 'DAY': return '#38bdf8'; // Adventurer Sky Cyan
      case 'RETRO': return '#22c55e'; // Classic GameBoy Green
      case 'NIGHT':
      default:
        return '#facc15'; // Starry Gold (bintang theme)
    }
  };

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoadGameOpen, setIsLoadGameOpen] = useState(false);

  // Initialize Audio Listeners
  useEffect(() => {
    sound.onTrackChange = (track) => setCurrentTrack(track);
    sound.onPlayStateChange = (playing) => setIsPlaying(playing);

    // Load any saved settings
    try {
      const savedTheme = localStorage.getItem('REZKY_THEME');
      if (savedTheme) setTheme(savedTheme);
      const savedDisplay = localStorage.getItem('REZKY_DISPLAY');
      if (savedDisplay) setDisplaySettings(JSON.parse(savedDisplay));
    } catch (e) {}
  }, []);

  // Update theme class on root
  useEffect(() => {
    document.body.className = `select-none overflow-x-hidden min-h-screen transition-colors duration-500 ${
      theme === 'DAY'
        ? 'bg-[#0f172a] text-[#f1f5f9]'
        : theme === 'RETRO'
        ? 'bg-[#052e16] text-[#bbf7d0]'
        : 'bg-[#080811] text-[#e2e8f0]'
    } ${displaySettings.pixelEffect ? 'pixelated-rendering' : ''}`;
  }, [theme, displaySettings.pixelEffect]);

  // Audio start trigger on first user gesture
  const initAudio = () => {
    if (!hasAudioStarted) {
      sound.resume();
      sound.startBgm();
      setHasAudioStarted(true);
      setIsPlaying(true);
    }
  };

  // Screen shake trigger
  const triggerScreenShake = () => {
    if (!displaySettings.screenShake) return;
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 450);
  };

  // Smooth page transition using PixelTransition
  const navigateToView = (targetView) => {
    if (targetView === currentView) return;
    initAudio();
    sound.playDoor();

    setNextView(targetView);
    setIsTransitioning(true);
    setTransitionTrigger(true);

    // Pixel transition delay matches animationStepDuration
    setTimeout(() => {
      setCurrentView(targetView);
      setTransitionTrigger(false);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextView(null);
      }, 400);
    }, 450);
  };

  // Sound settings handlers
  const handleUpdateSoundSettings = (updates) => {
    const updated = { ...soundSettings, ...updates };
    setSoundSettings(updated);

    if (updates.isBgmEnabled !== undefined) sound.setBgmEnabled(updates.isBgmEnabled);
    if (updates.isSfxEnabled !== undefined) sound.setSfxEnabled(updates.isSfxEnabled);
    if (updates.bgmVolume !== undefined) sound.setBgmVolume(updates.bgmVolume);
    if (updates.sfxVolume !== undefined) sound.setSfxVolume(updates.sfxVolume);
  };

  const handleUpdateDisplaySettings = (updates) => {
    const updated = { ...displaySettings, ...updates };
    setDisplaySettings(updated);
    try {
      localStorage.setItem('REZKY_DISPLAY', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('REZKY_THEME', newTheme);
    } catch (e) {}
  };

  // Render view component helper
  const renderCurrentView = (viewKey) => {
    switch (viewKey) {
      case 'MAIN_MENU':
        return (
          <MainMenu
            onStartGame={() => navigateToView('INTRO')}
            onLoadGame={() => {
              initAudio();
              sound.playSelect();
              setIsLoadGameOpen(true);
            }}
            onOpenSettings={() => {
              initAudio();
              sound.playSelect();
              setIsSettingsOpen(true);
            }}
            onExitGame={() => navigateToView('EXIT')}
            onInitAudio={initAudio}
            hasAudioStarted={hasAudioStarted}
          />
        );

      case 'INTRO':
        return (
          <IntroScreen
            onEnterWorld={() => navigateToView('WORLD_HUB')}
            onCancelIntro={() => navigateToView('MAIN_MENU')}
          />
        );

      case 'WORLD_HUB':
        return (
          <WorldHub
            onSelectLocation={(locId) => navigateToView(locId)}
            onOpenAdventureLog={() => navigateToView('ADVENTURE_LOG')}
            theme={theme}
          />
        );

      case 'CHARACTER_HOUSE':
        return <CharacterHouse onBackToHub={() => navigateToView('WORLD_HUB')} theme={theme} />;

      case 'HOBBY_ROOM':
        return <HobbyRoom onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'JUKEBOX':
        return (
          <Jukebox
            onBackToHub={() => navigateToView('WORLD_HUB')}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={() => {
              initAudio();
              sound.toggleBgmPlay();
            }}
            onNextTrack={() => {
              initAudio();
              sound.nextTrack();
            }}
            onPrevTrack={() => {
              initAudio();
              sound.prevTrack();
            }}
            soundSettings={soundSettings}
            onUpdateSoundSettings={handleUpdateSoundSettings}
          />
        );

      case 'SKILL_ROOM':
        return <SkillRoom onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'QUEST_BOARD':
        return <QuestBoard onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'ACHIEVEMENT_HALL':
        return <AchievementHall onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'ADVENTURE_LOG':
        return <AdventureLog onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'SAVE_POINT':
        return <SavePoint onBackToHub={() => navigateToView('WORLD_HUB')} />;

      case 'EXIT':
        return <ExitScreen onRestartGame={() => navigateToView('MAIN_MENU')} />;

      default:
        return <WorldHub onSelectLocation={(locId) => navigateToView(locId)} />;
    }
  };

  // Determine current readable location name for HUD
  const getLocationName = () => {
    switch (currentView) {
      case 'WORLD_HUB': return 'WORLD HUB';
      case 'CHARACTER_HOUSE': return 'CHARACTER HOUSE';
      case 'HOBBY_ROOM': return 'HOBBY ROOM';
      case 'JUKEBOX': return 'JUKEBOX';
      case 'SKILL_ROOM': return 'SKILL ROOM';
      case 'QUEST_BOARD': return 'QUEST BOARD';
      case 'ACHIEVEMENT_HALL': return 'ACHIEVEMENT HALL';
      case 'ADVENTURE_LOG': return 'ADVENTURE LOG';
      case 'SAVE_POINT': return 'SAVE POINT';
      default: return 'WORLD HUB';
    }
  };

  // Full-screen living background GIF mapped to each room
  const getActiveBackgroundGif = () => {
    switch (currentView) {
      case 'MAIN_MENU':
      case 'INTRO':
      case 'WORLD_HUB':
        return '/bintang.gif'; // Star train platform (Main view & Overworld)
      case 'CHARACTER_HOUSE':
        return '/bedroom_study.gif'; // Student bedroom with desk, cat on laptop & books
      case 'HOBBY_ROOM':
      case 'ADVENTURE_LOG':
      case 'EXIT':
        return '/explorer_balcony.gif'; // Sunset harbor balcony view
      case 'SKILL_ROOM':
      case 'JUKEBOX':
        return '/cyberpunk_rain.gif'; // Cyberpunk rainy neon metropolis
      case 'QUEST_BOARD':
      case 'ACHIEVEMENT_HALL':
      case 'SAVE_POINT':
        return '/shrine_fuji.gif'; // Mount Fuji, temple garden & stone lantern
      default:
        return '/bintang.gif';
    }
  };

  const showHUD = currentView !== 'MAIN_MENU' && currentView !== 'INTRO' && currentView !== 'EXIT';

  return (
    <div className={`relative min-h-screen ${isScreenShaking ? 'shake-screen' : ''}`}>
      
      {/* 
        FULL-SCREEN LIVING BACKGROUND GIF
        Each room is powered by its own dedicated atmospheric pixel GIF
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          key={getActiveBackgroundGif()}
          src={getActiveBackgroundGif()}
          alt="Room Background"
          className="w-full h-full object-cover scale-100 sm:scale-105 filter contrast-110 brightness-95 transition-opacity duration-700"
        />
        {/* Subtle dark tint to maintain UI contrast without hiding the pixel art */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            currentView === 'MAIN_MENU' || currentView === 'WORLD_HUB' || currentView === 'ADVENTURE_LOG'
              ? 'bg-gradient-to-r from-black/75 via-black/25 to-transparent'
              : 'bg-black/55 backdrop-blur-[0.5px]'
          }`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-transparent to-[#080811]/50" />
      </div>

      {/* CRT Scanlines Overlay if enabled */}
      {displaySettings.crtEffect && (
        <>
          <div className="crt-overlay" />
          <div className="crt-vignette" />
        </>
      )}

      {/* Persistent HUD (Header and Floating Mini-Player) for gameplay exploration */}
      {showHUD && (
        <HUD
          playerLevel={16}
          currentLocation={getLocationName()}
          onOpenSettings={() => {
            sound.playSelect();
            setIsSettingsOpen(true);
          }}
          onReturnToHub={() => navigateToView('WORLD_HUB')}
          onReturnToTitle={() => navigateToView('MAIN_MENU')}
          soundSettings={soundSettings}
          onToggleMute={() => {
            handleUpdateSoundSettings({ isBgmEnabled: !soundSettings.isBgmEnabled });
          }}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => {
            initAudio();
            sound.toggleBgmPlay();
          }}
          onNextTrack={() => {
            initAudio();
            sound.nextTrack();
          }}
        />
      )}

      {/* Main Screen Content View */}
      <div className="relative z-10 w-full min-h-screen">
        {renderCurrentView(currentView)}
      </div>

      {/* 
        Full-Screen Page Transition with PixelTransition component
        "gunakan component ini untuk perpindahan page website"
      */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <PixelTransition
            firstContent={
              <div className="w-full h-full flex items-center justify-center bg-[#070712]">
                <div className="font-pixel text-xs text-[#facc15] tracking-widest animate-pulse">
                  TRAVELING...
                </div>
              </div>
            }
            secondContent={
              <div className="w-full h-full flex items-center justify-center bg-[#101026]">
                <div className="font-pixel text-xs text-[#38bdf8] tracking-widest animate-pulse">
                  ENTERING AREA...
                </div>
              </div>
            }
            gridSize={34}
            pixelColor={getThemePixelColor()}
            once={false}
            animationStepDuration={0.8}
            isTriggered={transitionTrigger}
            aspectRatio="0"
            className="w-screen h-screen rounded-none border-none"
            style={{ width: '100vw', height: '100vh', borderRadius: 0, border: 'none' }}
          />
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundSettings={soundSettings}
        onUpdateSoundSettings={handleUpdateSoundSettings}
        displaySettings={displaySettings}
        onUpdateDisplaySettings={handleUpdateDisplaySettings}
        theme={theme}
        onChangeTheme={handleChangeTheme}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => {
          initAudio();
          sound.toggleBgmPlay();
        }}
        onNextTrack={() => {
          initAudio();
          sound.nextTrack();
        }}
        onTriggerShakeTest={triggerScreenShake}
      />

      {/* Load Game / Journey Logs Modal */}
      <LoadGameModal
        isOpen={isLoadGameOpen}
        onClose={() => setIsLoadGameOpen(false)}
        onLoadSave={(save) => {
          setIsLoadGameOpen(false);
          navigateToView('WORLD_HUB');
        }}
      />

    </div>
  );
}

export default App;
