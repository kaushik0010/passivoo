"use client";

import React, { useEffect, useRef, useState } from "react";

interface PassportViewportProps {
  children: React.ReactNode;
}

/**
 * Acts as a mathematical camera lens.
 * Uses a dynamic bounding box to perfectly scale the 1200x750 canvas on any screen size
 * (mobile, tablet, desktop) without breaking layout or clipping into negative space.
 */
export function PassportViewport({ children }: PassportViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false); // Prevents the initial load flicker

  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 750;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const availableWidth = entries[0].contentRect.width;
      
      // Calculate scale to fit width. Max scale is 1 (never scale up beyond native resolution)
      const newScale = Math.min(availableWidth / CANVAS_WIDTH, 1);
      setScale(newScale);
      
      // Reveal the UI only after the first mathematical scale is applied
      if (!isReady) setIsReady(true);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isReady]);

  return (
    // 1. Outer Container: Measures the full width of the screen and flex-centers the bounding box
    <div 
      ref={containerRef} 
      className="w-full flex items-center justify-center overflow-hidden transition-opacity duration-300"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      {/* 2. Dynamic Bounding Box: Enforces the exact mathematical footprint of the scaled passport */}
      <div 
        className="relative"
        style={{ 
          width: `${CANVAS_WIDTH * scale}px`,
          height: `${CANVAS_HEIGHT * scale}px` 
        }}
      >
        {/* 3. The Canvas: Shrinks perfectly into the bounding box starting from coordinate X:0, Y:0 */}
        <div 
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}