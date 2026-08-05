import { EmphasisCard } from "@/components/pitch/EmphasisCard";

export function ExportScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        مسیر مشتری خارجی
      </h1>

      {/* Frame 1 — calm context */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            با توجه به{" "}
            <strong className="font-semibold text-foreground">
              روابط تجاری (مثلاً عراق)
            </strong>
            ، وب‌اپ می‌تواند از قابلیت ترجمه آنلاین استفاده کند.
          </p>
          <p>
            ارتباط غیرپارسی{" "}
            <strong className="font-semibold text-foreground">ساده‌تر</strong>{" "}
           ؛ کمتر شدن سوءتفاهم قیمت و سفارش؛ حس نزدیک‌تر برای خریدار خارجی.
          </p>
        </div>
      </section>

      {/* Closing scope note */}
      <section aria-label="اولویت">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            مسیر اختیاری و قابل گسترش؛ اولویت همچنان{" "}
            <strong className="font-bold text-primary">
              جذب و نگه‌داشت داخلی
            </strong>{" "}
            است.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
