import { EmphasisCard } from "@/components/pitch/EmphasisCard";

export function FeatureBridgeScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        آماده‌سازی نمونه تعاملی
      </h1>

      {/* Frame 1 — context */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            در صفحه بعد، به‌جای توضیح بیشتر، یک فیچر را{" "}
            <strong className="font-semibold text-foreground">
              خودتان لمس می‌کنید
            </strong>
            :
          </p>
          <p>
            ثبت یک{" "}
            <strong className="font-semibold text-primary">
              استعلام یا درخواست سریع
            </strong>{" "}
            — همان مسیری که مشتری می‌تواند نیازش را بفرستد و زودتر به شما
            برسد.
          </p>
        </div>
      </section>

      {/* Closing goal */}
      <section aria-label="هدف">
        <EmphasisCard>
          <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
            هدف، جایگزین کردن تماس تلفنی نیست؛ فقط یک{" "}
            <strong className="font-bold text-primary">
              راه ساده‌تر
            </strong>{" "}
            برای شروع گفت‌وگوست.
          </p>
        </EmphasisCard>
      </section>
    </article>
  );
}
