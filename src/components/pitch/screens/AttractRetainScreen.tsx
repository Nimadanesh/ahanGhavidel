import { CheckStepList } from "@/components/pitch/CheckStepList";
import { EmphasisCard } from "@/components/pitch/EmphasisCard";

const ATTRACT_RETAIN_STEPS = [
  "راه‌های جدید برای جذب مشتری کنار ارتباطات سنتی",
  "نگه داشتن مشتری بعد از اولین خرید",
  "استفاده هم‌زمان از اعتماد قدیمی و امکانات دیجیتال",
] as const;

export function AttractRetainScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        ابزار جذب و نگه‌داشت مشتری
      </h1>

      {/* Frame 1 — calm intro */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="مقایسه سایت و وب‌اپ"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            سایت معمولی ≈{" "}
            <span className="font-medium text-foreground/90">ویترین آنلاین</span>
            .
          </p>
          <p>
            وب‌اپ کمک می‌کند{" "}
            <strong className="font-semibold text-foreground">
              مستقیم‌تر و مؤثرتر
            </strong>{" "}
            با مشتری وصل شوید.
          </p>
        </div>
      </section>

      {/* Frame 2 — connected capabilities */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="قابلیت‌ها"
      >
        <CheckStepList items={ATTRACT_RETAIN_STEPS} />
      </section>

      {/* Closing goal */}
      <section aria-label="هدف">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            هدف جایگزینی تلفن نیست؛ هدف این است مشتری{" "}
            <strong className="font-bold text-primary">زودتر و راحت‌تر</strong>{" "}
            به شما برسد.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
