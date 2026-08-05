import { Store } from "lucide-react";

export function PitchHeader() {
  return (
    <header
      className="shrink-0 border-b border-border bg-background/95 px-4 pt-[max(env(safe-area-inset-top),0px)] backdrop-blur"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-[480px] items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-secondary text-primary"
          aria-hidden
        >
          <Store className="size-5" strokeWidth={1.75} />
        </div>
        <div className="flex min-w-0 flex-col gap-2 text-start">
          <p className="text-[0.8125rem] font-semibold leading-none text-foreground">
            توسعه کسب و کار - نرم افزار
          </p>
          <p className="text-[0.6875rem] font-medium leading-none text-muted-foreground">
            آهن فروشی قویدل . بناب
          </p>
        </div>
      </div>
    </header>
  );
}
