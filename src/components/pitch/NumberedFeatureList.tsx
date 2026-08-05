import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type NumberedFeatureItem = {
  title: string;
  description: ReactNode;
};

type NumberedFeatureListProps = {
  items: readonly NumberedFeatureItem[];
  className?: string;
};

/** Vertical connected numbered pillars — RTL-first, DS tokens only. */
export function NumberedFeatureList({
  items,
  className,
}: NumberedFeatureListProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={item.title} className="flex gap-3">
            <div className="flex w-6 shrink-0 flex-col items-center">
              <span
                className="tnum flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.8125rem] font-bold text-primary"
                aria-hidden
              >
                {index + 1}
              </span>
              {!isLast ? (
                <span
                  className="my-1 min-h-4 w-px flex-1 bg-primary/35"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={cn("min-w-0 flex-1", isLast ? "pb-0" : "pb-5")}>
              <p className="text-[0.9375rem] font-semibold leading-snug text-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
