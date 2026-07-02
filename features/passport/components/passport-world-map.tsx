import React from "react";

export function PassportWorldMap() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
      {/* The map is slightly offset to the right so it doesn't collide 
        with the dense text block on the left side of the Identity component.
      */}
      <div className="w-[110%] h-[110%] ml-24 mt-12 opacity-[0.20] mix-blend-screen">
        <img 
          src="/passport/world-map.webp" 
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}