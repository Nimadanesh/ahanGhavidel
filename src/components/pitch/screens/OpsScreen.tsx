import { CheckStepList } from "@/components/pitch/CheckStepList";
import { EmphasisCard } from "@/components/pitch/EmphasisCard";

const OPS_CAPABILITIES = [
  "پیگیری درخواست‌ها و سفارش‌ها در یک جا",
  "سابقه پیش‌فاکتور و رزرو",
  "لیست تلفن مشتری از تعاملات",
  "کمتر پخش شدن اطلاعات بین دفتر، واتساپ و حافظه",
] as const;

export function OpsScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        عملیات داخلی دفتر
      </h1>

      {/* Frame 1 — capabilities */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="قابلیت‌ها"
      >
        <CheckStepList items={OPS_CAPABILITIES} />
      </section>

      {/* Key insight closer */}
      <section aria-label="نکته کلیدی">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            لیست تلفن جمع‌شده از اپ از{" "}
            <strong className="font-bold text-primary">
              باارزش‌ترین خروجی‌ها
            </strong>{" "}
            است.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
