"use client";

import React, { useEffect, useState, useRef } from "react";
import { PassportViewport } from "./passport-viewport";
import { PassportCard } from "./passport-card";
import { PassportActions } from "./passport-actions";
import { PassportGuestBanner } from "./passport-guest-banner";
import { PassportData } from "../types/passport";
import { FIFA_2026_CONFIG } from "../constants/tournament";
import { createGuestPassport, GUEST_STORAGE_KEY } from "../utils/guest-passport";
import { formatPassportDate } from "../utils/passport-date";
import { generatePassportId } from "../utils/passport-id";
import { exportStampClient } from "@/features/collections/utils/export-stamp";

interface PassportContainerProps {
  user?: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

export function PassportContainer({ user }: PassportContainerProps) {
  const [passportData, setPassportData] = useState<PassportData | null>(null);
  
  const passportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [canShareNative, setCanShareNative] = useState(false);

  useEffect(() => {
    if (user) {
      setPassportData({
        username: user.name,
        passportId: generatePassportId(FIFA_2026_CONFIG.prefix, user.id),
        issueDate: formatPassportDate(new Date(user.createdAt)),
        qrUrl: "https://passivoo.com/passport",
        isGuest: false,
      });
    } else {
      const storedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
      if (storedGuest) {
        setPassportData(JSON.parse(storedGuest));
      } else {
        const newGuest = createGuestPassport(FIFA_2026_CONFIG.prefix);
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(newGuest));
        setPassportData(newGuest);
      }
    }
  }, [user]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      const dummyFile = new File([""], "test.png", { type: "image/png" });
      setCanShareNative(navigator.canShare({ files: [dummyFile] }));
    }
  }, []);

  const handleExport = async (action: "share" | "download") => {
    if (!passportRef.current || isExporting || !passportData) return;

    try {
      setIsExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 150));

      const safeUsername = passportData.username.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filename = `passivoo-passport-${safeUsername}.png`;
      
      await exportStampClient(passportRef.current, { 
        filename,
        backgroundColor: "#0A1128", 
        action: action
      });

    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.name !== "AbortError") {
        alert("Failed to export passport. Please try again.");
      }
    } finally {
      setIsExporting(false);
    }
  };

  if (!passportData) {
    return <div className="w-full max-w-[1200px] aspect-[1200/750] mx-auto animate-pulse bg-zinc-900 rounded-[2rem]" />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center pb-12 pt-4">
      
      {passportData.isGuest && <PassportGuestBanner />}

      <PassportViewport>
        <PassportCard ref={passportRef} data={passportData} />
      </PassportViewport>
      
      <PassportActions 
        onExport={handleExport}
        isExporting={isExporting}
        canShareNative={canShareNative}
      />
    </div>
  );
}