import React, { memo } from "react";
import { QRCodeSVG } from "qrcode.react";

interface PassportQRCodeProps {
  url: string;
}

/**
 * Renders an SVG-based QR Code that is perfectly compatible with html-to-image.
 * Wrapped in React.memo to prevent unnecessary re-renders during state changes.
 */
export const PassportQRCode = memo(({ url }: PassportQRCodeProps) => {
  return (
    <div 
      className="w-14 h-14 rounded-md p-1 flex items-center justify-center opacity-85 text-[var(--passport-gold-dark)]"
      role="img"
      aria-label="Scan to view this Passivoo passport"
      style={{
        // Creates a physical "debossed" look directly in the leather
        backgroundColor: "var(--passport-bg-secondary)",
        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)",
        // We use opacity on the border color via color-mix to avoid hardcoding RGBA
        border: "1px solid color-mix(in srgb, var(--passport-gold-dark) 30%, transparent)"
      }}
    >
      <QRCodeSVG 
        value={url} 
        size={46} // Sized to fit precisely inside the 56px wrapper padding
        bgColor="transparent"
        // Uses currentColor to seamlessly inherit the gold token from the wrapper
        fgColor="currentColor" 
        level="L" // Low error correction prevents visual clutter for simple URLs
        includeMargin={false}
      />
    </div>
  );
});

PassportQRCode.displayName = "PassportQRCode";