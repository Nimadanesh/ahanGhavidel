import { Phone } from "lucide-react";

const CONTACT_PHONE = "+989123456789";

export function PitchHeader() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-[max(env(safe-area-inset-top),8px)]"
      role="banner"
    >
      <div className="flex w-full max-w-[480px] items-center gap-4">
        {/* Right: Brand pill (~70%) — first in code so RTL puts it on right */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-border/50 bg-card/80 ps-1 pe-3 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.18)] backdrop-blur-md">
          {/* gh initials avatar */}
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-[0.75rem] font-bold text-primary-foreground"
            aria-hidden
          >
            gh
          </div>

          {/* Text lines */}
          <div className="flex min-w-0 flex-col gap-2 pe-1">
            <p className="text-[0.75rem] font-semibold leading-none text-foreground">
              توسعه کسب و کار - نرم افزار
            </p>
            <p className="text-[0.625rem] font-medium leading-none text-muted-foreground">
              آهن‌فروشی قویدل • بناب
            </p>
          </div>
        </div>

        {/* Left: Call-only pill — second in code so RTL puts it on left */}
        <a
          href={`tel:${CONTACT_PHONE}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/50 bg-card/80 text-primary shadow-[0_2px_12px_rgba(0,0,0,0.18)] backdrop-blur-md transition-transform active:scale-95"
          aria-label="تماس"
        >
          <Phone className="size-5" strokeWidth={1.75} />
        </a>
      </div>
    </header>
  );
}
