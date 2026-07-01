import React from "react";
import { Download, Share, Loader2 } from "lucide-react";

interface PassportActionsProps {
  onExport: (action: "share" | "download") => void;
  isExporting: boolean;
  canShareNative: boolean;
}

export function PassportActions({ onExport, isExporting, canShareNative }: PassportActionsProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-8 flex items-center justify-center gap-4 px-4">
      
      {/* Native Share Button */}
      {canShareNative && (
        <button
          onClick={() => onExport("share")}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F9E596] text-[#0A1128] font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] cursor-pointer"
        >
          {isExporting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Wait...</span>
            </>
          ) : (
            <>
              <Share size={18} strokeWidth={2} />
              <span>Share</span>
            </>
          )}
        </button>
      )}

      {/* Download Button */}
      <button
        onClick={() => onExport("download")}
        disabled={isExporting}
        className={`flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 uppercase tracking-wider text-sm border cursor-pointer
          ${canShareNative 
            ? 'flex-1 bg-[#0A1128] text-[#F3E5AB] border-[#D4AF37]/30 hover:bg-[#060B19] hover:border-[#D4AF37]/50' 
            : 'w-3/4 mx-auto bg-gradient-to-r from-[#D4AF37] to-[#F9E596] text-[#0A1128] border-transparent shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]'
          }`}
      >
        {isExporting && !canShareNative ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Download size={18} strokeWidth={2} />
            <span>Download</span>
          </>
        )}
      </button>
      
    </div>
  );
}