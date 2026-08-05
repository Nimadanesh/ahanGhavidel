"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, type ReactNode, type TouchEvent } from "react";

import { PitchFooter } from "@/components/pitch/PitchFooter";
import { PitchHeader } from "@/components/pitch/PitchHeader";
import {
  PITCH_SCREEN_COUNT,
  pitchPath,
  type PitchStep,
} from "@/lib/pitch-screens";

type PitchShellProps = {
  step: PitchStep;
  children: ReactNode;
};

const SWIPE_THRESHOLD_PX = 56;

export function PitchShell({ step, children }: PitchShellProps) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    if (step <= 1) return;
    router.push(pitchPath((step - 1) as PitchStep));
  }, [router, step]);

  const goNext = useCallback(() => {
    if (step >= PITCH_SCREEN_COUNT) return;
    router.push(pitchPath((step + 1) as PitchStep));
  }, [router, step]);

  function onTouchStart(e: TouchEvent) {
    const t = e.changedTouches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    const t = e.changedTouches[0];
    if (!start || !t) return;

    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (Math.abs(dx) < Math.abs(dy)) return;

    // RTL: swipe toward start (right) → next; toward end (left) → prev
    if (dx > 0) goNext();
    else goPrev();
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background">
        <PitchHeader />
        <main
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-20 pb-[calc(5.5rem+max(env(safe-area-inset-bottom),0.75rem))]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* flex-1 fills main; content overflows so main scrolls naturally */}
          <div className="flex flex-1 flex-col">{children}</div>
        </main>
        <PitchFooter step={step} />
      </div>
    </div>
  );
}
