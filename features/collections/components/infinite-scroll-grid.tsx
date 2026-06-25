"use client";

import React, { useState, useEffect, useRef } from "react";
import { CollectibleDto, PassportResponseDto } from "@/app/api/passport/route";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { DropCategory, DropRarity } from "@/features/drops/types/drop.types";
import { Loader2 } from "lucide-react";
import { ArtifactViewerModal } from "@/features/collections/components/artifact-viewer-modal"; // <-- NEW IMPORT

interface InfiniteScrollGridProps {
  initialNextCursor: string | null;
  initialHasMore: boolean;
}

export function InfiniteScrollGrid({ initialNextCursor, initialHasMore }: InfiniteScrollGridProps) {
  const [items, setItems] = useState<CollectibleDto[]>([]);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [fetching, setFetching] = useState<boolean>(false);
  
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || fetching) return;

    const currentTarget = observerTarget.current;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !fetching) {
          setFetching(true);
          try {
            const res = await fetch(`/api/passport?cursor=${encodeURIComponent(cursor || "")}`);
            if (!res.ok) throw new Error("Failed pagination load");
            
            const data: PassportResponseDto = await res.json();
            setItems((prev) => [...prev, ...data.collectibles]);
            setCursor(data.nextCursor);
            setHasMore(data.hasMore);
          } catch (err) {
            console.error("[INFINITE_SCROLL_PAGING_ERROR]:", err);
          } finally {
            setFetching(false);
          }
        }
      },
      { threshold: 0.1, rootMargin: "200px" } // Load early before user hits the bottom
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [cursor, hasMore, fetching]);

  return (
    <>
      {/* Client-side appended items render sequentially here inside the parent grid flow */}
      {items.map((drop) => (
        <ArtifactViewerModal key={drop.id} item={drop}>
          <div className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            <DropStamp
              name={drop.name}
              category={drop.category as DropCategory}
              rarity={drop.rarity as DropRarity}
              points={drop.points}
              isRevealed={true} // Vault items are always visible
            />
          </div>
        </ArtifactViewerModal>
      ))}

      {/* Hidden Intersection Tracking Anchor block */}
      {hasMore && (
        <div 
          ref={observerTarget} 
          // FIXED: Changed from col-span-2/3/4 to col-span-full to span the entire bottom row cleanly
          className="col-span-full w-full flex items-center justify-center py-8 min-h-[60px]"
        >
          {fetching && <Loader2 className="text-zinc-600 animate-spin" size={24} />}
        </div>
      )}
    </>
  );
}