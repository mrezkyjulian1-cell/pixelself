import React from 'react';

/**
 * Authentic 16-bit Pixel Art Character Sprite Component
 * Rendered using SVG crisp pixel blocks for razor-sharp retro RPG aesthetics
 */
export const PixelAvatar = ({ 
  mode = 'adventurer', // 'adventurer' | 'coder'
  size = 'md', // 'sm' (32px), 'md' (48px), 'lg' (80px), 'xl' (140px)
  className = '',
  animated = false 
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32 sm:w-40 sm:h-40',
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-block ${dim} ${className} ${animated ? 'animate-bounce' : ''}`} style={animated ? { animationDuration: '1.2s' } : {}}>
      <svg
        viewBox="0 0 16 16"
        className="w-full h-full"
        style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Transparent grid base */}

        {/* --- HAIR (Back/Top) --- */}
        <rect x="5" y="1" width="6" height="1" fill="#2d1606" />
        <rect x="4" y="2" width="8" height="2" fill="#3b1d08" />
        <rect x="3" y="3" width="10" height="2" fill="#54290e" />
        <rect x="2" y="4" width="2" height="3" fill="#3b1d08" />
        <rect x="12" y="4" width="2" height="3" fill="#3b1d08" />

        {/* --- HEADBAND (Crimson with Gold Emblem) --- */}
        <rect x="3" y="5" width="10" height="2" fill="#dc2626" />
        <rect x="7" y="5" width="2" height="2" fill="#facc15" />
        <rect x="2" y="6" width="1" height="2" fill="#b91c1c" />
        <rect x="1" y="7" width="2" height="2" fill="#dc2626" />
        <rect x="1" y="8" width="1" height="2" fill="#991b1b" />

        {/* --- FACE & SKIN --- */}
        <rect x="4" y="7" width="8" height="4" fill="#fde68a" />
        <rect x="5" y="11" width="6" height="1" fill="#fde68a" />
        {/* Blush */}
        <rect x="4" y="9" width="1" height="1" fill="#fca5a5" />
        <rect x="11" y="9" width="1" height="1" fill="#fca5a5" />

        {/* --- EYES --- */}
        {mode === 'coder' ? (
          <>
            {/* Retro Pixel Glasses */}
            <rect x="4" y="7" width="3" height="2" fill="#0284c7" />
            <rect x="9" y="7" width="3" height="2" fill="#0284c7" />
            <rect x="7" y="7" width="2" height="1" fill="#38bdf8" />
            <rect x="5" y="8" width="1" height="1" fill="#ffffff" />
            <rect x="10" y="8" width="1" height="1" fill="#ffffff" />
            {/* Headphone bands */}
            <rect x="2" y="5" width="1" height="5" fill="#f97316" />
            <rect x="13" y="5" width="1" height="5" fill="#f97316" />
          </>
        ) : (
          <>
            {/* Adventurer Eyes */}
            <rect x="5" y="7" width="2" height="2" fill="#0f172a" />
            <rect x="5" y="7" width="1" height="1" fill="#ffffff" />
            <rect x="9" y="7" width="2" height="2" fill="#0f172a" />
            <rect x="9" y="7" width="1" height="1" fill="#ffffff" />
          </>
        )}

        {/* Smile */}
        <rect x="7" y="10" width="2" height="1" fill="#b45309" />

        {/* --- CLOTHES / BODY --- */}
        {mode === 'coder' ? (
          <>
            {/* Dark Hoodie with Cyber Green accents */}
            <rect x="4" y="12" width="8" height="4" fill="#1e1b4b" />
            <rect x="5" y="12" width="6" height="2" fill="#312e81" />
            <rect x="7" y="12" width="2" height="4" fill="#10b981" />
            <rect x="3" y="13" width="2" height="3" fill="#1e1b4b" />
            <rect x="11" y="13" width="2" height="3" fill="#1e1b4b" />
          </>
        ) : (
          <>
            {/* Blue RPG Adventurer Tunics + Scarf */}
            <rect x="6" y="12" width="4" height="1" fill="#f8fafc" />
            <rect x="4" y="12" width="8" height="4" fill="#2563eb" />
            <rect x="3" y="13" width="2" height="3" fill="#1d4ed8" />
            <rect x="11" y="13" width="2" height="3" fill="#1d4ed8" />
            {/* Gold Belt & Buckle */}
            <rect x="5" y="15" width="6" height="1" fill="#b45309" />
            <rect x="7" y="15" width="2" height="1" fill="#facc15" />
          </>
        )}
      </svg>
    </div>
  );
};
