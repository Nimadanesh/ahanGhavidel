import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckStepListProps = {
  items: readonly string[];
  className?: string;
};

/** Vertical connected check-steps — RTL-first, DS tokens only. */
export function CheckStepList({ items, className }: CheckStepListProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((label, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={label} className="flex gap-3">
            <div className="flex w-6 shrink-0 flex-col items-center">
              <span
                className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                aria-hidden
              >
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              {!isLast ? (
                <span
                  className="my-1 w-px flex-1 min-h-4 bg-primary/35"
                  aria-hidden
                />
              ) : null}
            </div>
            <p
              className={cn(
                "min-w-0 flex-1 text-[0.9375rem] font-medium leading-snug text-foreground",
                isLast ? "pb-0" : "pb-4",
              )}
            >
              {label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
