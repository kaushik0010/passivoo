"use client";

import React, { useEffect, useRef, useState } from "react";

interface PassportViewportProps {
  children: React.ReactNode;
}

/**
 * Acts as a mathematical camera lens.
 * Measures the available screen width and scales the fixed 1200x750 canvas to fit perfectly,
 * ensuring high-quality mobile rendering without breaking the fixed DOM node (needed for exports).
 */
export function PassportViewport({ children }: PassportViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 750;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const availableWidth = entries[0].contentRect.width;
      
      // Calculate scale to fit width (with a tiny 1px buffer to prevent edge bleeding)
      const newScale = Math.min(availableWidth / CANVAS_WIDTH, 1);
      setScale(newScale);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex items-center justify-center overflow-hidden"
      // We reserve the exact scaled height so the page doesn't layout shift or collapse
      style={{ height: `${CANVAS_HEIGHT * scale}px` }}
    >
      <div 
        className="origin-top-left flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}