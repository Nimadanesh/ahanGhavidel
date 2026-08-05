"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type PairScrollSpyProps = {
  /** Stable key when list identity changes (e.g. active group id) */
  listKey: string;
  count: number;
  children: (itemRef: (index: number) => (el: HTMLElement | null) => void) => ReactNode;
  className?: string;
};

/**
 * Right-hand tick rail for pain–solution pairs, driven by natural page
 * (document) scroll. No inner scroll container — content flows in the page.
 *
 * Active = the last pair whose top has crossed the anchor line (~30% of the
 * viewport height). At the top of the list nothing has crossed → first tick;
 * once all pairs have crossed (scrolled to the end) → last tick.
 * scroll events do not bubble, so a capture-phase window listener picks up
 * the shell's scrolling <main>.
 */
export function PairScrollSpy({
  listKey,
  count,
  children,
  className,
}: PairScrollSpyProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const itemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, count);
    let frame: number | null = null;

    const sync = () => {
      if (count === 0) return;
      const anchor = window.innerHeight * 0.3;
      let current = 0;
      for (let i = 0; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= anchor) current = i;
      }
      setActive(current);
    };

    const schedule = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        sync();
      });
    };

    const initFrame = requestAnimationFrame(sync);
    window.addEventListener("scroll", schedule, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      cancelAnimationFrame(initFrame);
      window.removeEventListener("scroll", schedule, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("resize", schedule);
    };
  }, [count, listKey]);

  function scrollToPair(index: number) {
    const el = itemRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ block: "start", behavior: "smooth" });
    setActive(index);
  }

  const railHeight = count > 0 ? count * 18 + (count - 1) * 4 : 0;

  return (
    <div
      className={cn("relative flex flex-row-reverse items-start", className)}
    >
      <div className="min-w-0 flex-1 pr-3">{children(itemRef)}</div>

      <div
        className="sticky top-[4.5rem] flex w-px shrink-0 flex-col gap-1"
        style={{ height: railHeight || undefined }}
        role="navigation"
        aria-label="موقعیت جفت دردسر و راه‌حل"
      >
        {Array.from({ length: count }, (_, index) => {
          const isActive = index === active;
          return (
            <button
              key={`${listKey}-tick-${index}`}
              type="button"
              aria-label={`جفت ${index + 1} از ${count}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollToPair(index)}
              className={cn(
                "h-[18px] w-px shrink-0 rounded-full transition-colors duration-150 ease-[var(--ease-out)]",
                isActive ? "bg-foreground" : "bg-muted-foreground/50",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
