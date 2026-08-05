import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  PITCH_SCREEN_COUNT,
  pitchPath,
  type PitchStep,
} from "@/lib/pitch-screens";
import { cn } from "@/lib/utils";

type PitchFooterProps = {
  step: PitchStep;
};

export function PitchFooter({ step }: PitchFooterProps) {
  const isFirst = step <= 1;
  const isLast = step >= PITCH_SCREEN_COUNT;
  const prevStep = (step - 1) as PitchStep;
  const nextStep = (step + 1) as PitchStep;

  const iconBtn = buttonVariants({ variant: "ghost", size: "icon-lg" });

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 backdrop-blur"
      role="contentinfo"
    >
      <div className="mx-auto flex h-12 max-w-[480px] items-center justify-between gap-3">
        {isFirst ? (
          <span
            className={cn(iconBtn, "pointer-events-none opacity-40")}
            aria-disabled="true"
            aria-label="صفحه قبل"
          >
            <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
        ) : (
          <Link
            href={pitchPath(prevStep)}
            className={cn(iconBtn, "active:scale-[0.97]")}
            aria-label="صفحه قبل"
          >
            <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
          </Link>
        )}

        <p
          className="tnum min-w-[4.5rem] text-center text-[0.8125rem] font-medium text-muted-foreground"
          aria-live="polite"
        >
          {step} / {PITCH_SCREEN_COUNT}
        </p>

        {isLast ? (
          <span
            className={cn(iconBtn, "pointer-events-none opacity-40")}
            aria-disabled="true"
            aria-label="صفحه بعد"
          >
            <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
        ) : (
          <Link
            href={pitchPath(nextStep)}
            className={cn(iconBtn, "active:scale-[0.97]")}
            aria-label="صفحه بعد"
          >
            <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
          </Link>
        )}
      </div>
    </footer>
  );
}
