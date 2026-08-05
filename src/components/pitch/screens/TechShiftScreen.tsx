import { EmphasisCard } from "@/components/pitch/EmphasisCard";

export function TechShiftScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        فناوری، هوش مصنوعی و عامل‌ها
      </h1>

      {/* Frame 1 — context */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            فناوری، هوش مصنوعی و عامل‌های نرم‌افزاری نحوه پاسخ به استعلام،
            اطلاع‌رسانی قیمت و پیگیری مشتری را در صنف‌های سنتی{" "}
            <strong className="font-semibold text-foreground">عوض می‌کنند</strong>.
          </p>
          <p>
            مغازه‌ای که از الان روی یک{" "}
            <strong className="font-semibold text-primary">
              وب‌اپ ساخت‌یافته
            </strong>{" "}
            کار کند، زودتر از مغازه‌ای که فقط تلفن و صفحه ثابت دارد
            می‌تواند قابلیت جدید اضافه کند.
          </p>
        </div>
      </section>

      {/* Closer */}
      <section aria-label="نکته کلیدی">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            لازم نیست{" "}
            <strong className="font-bold text-primary">
              «شرکت هوش مصنوعی»
            </strong>{" "}
            شوید؛ لازم است{" "}
            <strong className="font-bold text-foreground">
              ستون فقرات دیجیتال
            </strong>{" "}
            داشته باشید که ابزارها به آن وصل شوند.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
