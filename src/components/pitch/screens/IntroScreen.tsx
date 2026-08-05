import { EmphasisCard } from "@/components/pitch/EmphasisCard";

export function IntroScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        <span className="block">چرا به جای یک سایت معمولی!</span>
        <span className="block">
          یک{" "}
          <span className="text-primary">وب اپ</span>
          {" "}
          حرفه ای
        </span>
      </h1>

      {/* Frame 1 — calm context */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            امروزه داشتن سایت برای هر کسب‌وکاری لازم به‌نظر می‌رسد؛ اما در رقابت
            امروز، آیا یک{" "}
            <span className="font-medium text-foreground/80">سایت معمولی</span>{" "}
            کافی است؟
          </p>
          <p>
            رقابت دیجیتال در صنف آهن بیشتر شده است. در{" "}
            <strong className="font-semibold text-foreground">بناب</strong> —
            چهارراه مهم این صنعت — هنوز خیلی از آهن‌فروش‌ها حتی سایت ساده هم
            ندارند و کاملاً سنتی کار می‌کنند.
          </p>
        </div>
      </section>

      {/* Frame 2 — primary attention: پیشنهاد ما */}
      <section aria-label="پیشنهاد">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            پیشنهاد ما: ساخت{" "}
            <strong className="font-bold text-primary">
              وب‌اپ حرفه‌ای مخصوص کسب‌وکار شما
            </strong>{" "}
            — نه فقط یک ویترین معمولی.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
