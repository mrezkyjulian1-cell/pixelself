import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * PixelTransition component from React Bits
 * Supports hover/touch reveal as well as programmatic triggers.
 */
const PixelTransition = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = '#facc15',
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = '100%',
  className = '',
  style = {},
  isTriggered = null,
  onTransitionComplete = null
}) => {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.display = 'none';
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) {
      activeEl.style.display = activate ? 'block' : 'none';
      return;
    }

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'auto' : 'none';
      if (onTransitionComplete) {
        onTransitionComplete(activate);
      }
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  // Programmatic transition trigger support
  useEffect(() => {
    if (isTriggered !== null && isTriggered !== isActive) {
      animatePixels(isTriggered);
    }
  }, [isTriggered]);

  const handleEnter = () => {
    if (isTriggered === null && !isActive) animatePixels(true);
  };
  const handleLeave = () => {
    if (isTriggered === null && isActive && !once) animatePixels(false);
  };
  const handleClick = () => {
    if (isTriggered === null) {
      if (!isActive) animatePixels(true);
      else if (isActive && !once) animatePixels(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className} bg-[#121124] text-white rounded-lg border-2 border-[#4338ca] relative overflow-hidden`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      {aspectRatio ? <div style={{ paddingTop: aspectRatio }} /> : null}

      <div className="absolute inset-0 w-full h-full" aria-hidden={isActive}>
        {firstContent}
      </div>

      <div
        ref={activeRef}
        className="absolute inset-0 w-full h-full z-[2]"
        style={{ display: 'none' }}
        aria-hidden={!isActive}
      >
        {secondContent}
      </div>

      <div ref={pixelGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />
    </div>
  );
};

export default PixelTransition;
