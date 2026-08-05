import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmphasisCardProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

/** Shared pitch highlight — soft rotating accent ring (Telegram blue). */
export function EmphasisCard({
  children,
  className,
  ...props
}: EmphasisCardProps) {
  return (
    <div className={cn("pitch-glow-border", className)} {...props}>
      <div className="rounded-[11px] bg-card px-4 py-4">{children}</div>
    </div>
  );
}
