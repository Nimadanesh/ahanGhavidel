"use client";

import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export type DarkSelectOption = {
  value: string;
  label: string;
};

type DarkSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: DarkSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function DarkSelect({
  value,
  onValueChange,
  options,
  placeholder = "انتخاب کنید",
  className,
  disabled,
}: DarkSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const select = useCallback(
    (val: string) => {
      onValueChange(val);
      setOpen(false);
    },
    [onValueChange],
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-[10px] bg-input px-3 text-start text-[0.9375rem] transition-colors",
          selectedLabel ? "text-foreground" : "text-muted-foreground",
          disabled && "opacity-50",
        )}
      >
        <span className="min-w-0 truncate">
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[10px] border border-border bg-card py-1 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
        >
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={selected}
                onClick={() => select(o.value)}
                className={cn(
                  "cursor-pointer px-3 py-2.5 text-[0.875rem] leading-snug transition-colors",
                  selected
                    ? "bg-accent font-semibold text-primary"
                    : "text-foreground hover:bg-surface-2",
                )}
              >
                {o.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
