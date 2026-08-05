import { EmphasisCard } from "@/components/pitch/EmphasisCard";

export function ProductScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="max-w-full text-[clamp(0.9375rem,0.55rem+1.6vw,1.0625rem)] font-bold leading-snug tracking-[-0.02em] text-foreground">
        دستیار دیجیتال آهن‌فروشی{" "}
        <span className="text-primary">قویدل</span>
      </h1>

      {/* Frame 1 — calm product promise */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="وعده محصول"
      >
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          ابزاری که مشتری میلگرد را{" "}
          <strong className="font-semibold text-foreground">
            زودتر از رقبا
          </strong>{" "}
          به دفتر می‌رساند، خرید را ساده‌تر می‌کند، و دوباره برمی‌گرداند.
        </p>
      </section>

      {/* Frame 2 — critical scope note */}
      <section aria-label="نکته کلیدی">
        <EmphasisCard>
          <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-foreground">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-primary">
              نکته کلیدی
            </p>
            <p className="font-medium">
              ما{" "}
              <strong className="font-bold text-primary">
                فروش اینترنتی آهن با درگاه پرداخت
              </strong>{" "}
              نمی‌سازیم.
            </p>
            <p className="font-bold text-foreground">
              در بناب معمولاً میلگرد را با درگاه نمی‌خرند.
            </p>
            <p className="font-medium">
              ما ابزار{" "}
              <strong className="font-bold text-primary">جذب و نگه‌داشت</strong>{" "}
              می‌سازیم؛ معامله نهایی همان{" "}
              <strong className="font-semibold text-foreground">
                تلفن یا حضوری
              </strong>{" "}
              با اعتماد سنتی می‌ماند.
            </p>
          </div>
        </EmphasisCard>
      </section>
    </article>
  );
}
