"use client";

import {
  Building2,
  Factory,
  HardHat,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { PairScrollSpy } from "@/components/pitch/PairScrollSpy";
import {
  AUDIENCE_GROUPS,
  type AudienceGroup,
} from "@/lib/audience-groups";
import { cn } from "@/lib/utils";

const GROUP_ICONS: Record<string, LucideIcon> = {
  builder: Building2,
  contractor: HardHat,
  partner: Users,
  fabricator: Factory,
};

export function AudiencesScreen() {
  const [activeId, setActiveId] = useState(AUDIENCE_GROUPS[0].id);
  const active =
    AUDIENCE_GROUPS.find((g) => g.id === activeId) ?? AUDIENCE_GROUPS[0];

  return (
    <article className="flex flex-col gap-3">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        چهار گروه اصلی مشتری
      </h1>

      <section className="rounded-[12px] bg-card px-4 py-3" aria-label="مقدمه">
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          هر گروه خریدار آهن دردسر خودش را دارد — و برای هر کدام،{" "}
          <strong className="font-semibold text-foreground">
            فیچر اختصاصی
          </strong>{" "}
          در وب‌اپ آینده تعریف می‌شود.
        </p>
      </section>

      <div
        role="tablist"
        aria-label="انتخاب گروه مشتری"
        className="grid grid-cols-2 gap-2"
      >
        {AUDIENCE_GROUPS.map((group) => {
          const selected = group.id === active.id;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              id={`audience-tab-${group.id}`}
              aria-selected={selected}
              aria-controls="audience-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              className={cn(
                "min-h-12 rounded-[10px] px-2 py-2.5 text-center text-[0.75rem] font-semibold leading-snug transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-muted-foreground",
              )}
            >
              {group.tabLabel}
            </button>
          );
        })}
      </div>

      <section
        role="tabpanel"
        id="audience-panel"
        aria-labelledby={`audience-tab-${active.id}`}
        className="rounded-[12px] bg-card px-4 pt-4 pb-2"
      >
        <AudienceDetail group={active} />
      </section>
    </article>
  );
}

function AudienceDetail({ group }: { group: AudienceGroup }) {
  const Icon = GROUP_ICONS[group.id] ?? Building2;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <span
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-secondary text-primary"
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <h2 className="min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug text-foreground">
          {group.title}
        </h2>
      </div>

      <PairScrollSpy key={group.id} listKey={group.id} count={group.rows.length}>
        {(itemRef) => (
          <ul className="flex flex-col">
            {group.rows.map((row, index) => {
              const isLast = index === group.rows.length - 1;
              return (
                <li
                  key={`${group.id}-${row.feature}`}
                  ref={itemRef(index)}
                  data-pair-index={index}
                  className={cn(
                    "flex flex-col gap-1.5 py-3",
                    !isLast && "border-b border-border",
                    isLast && "pb-6",
                  )}
                >
                  <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground/70">
                      دردسر:{" "}
                    </span>
                    {row.pain}
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-foreground">
                    <strong className="font-bold text-primary">
                      {row.feature}
                    </strong>
                    <span className="text-muted-foreground"> — </span>
                    <span className="text-[0.875rem] text-foreground/90">
                      {row.detail}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </PairScrollSpy>
    </div>
  );
}
