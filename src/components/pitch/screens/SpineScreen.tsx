import { EmphasisCard } from "@/components/pitch/EmphasisCard";
import {
  NumberedFeatureList,
  type NumberedFeatureItem,
} from "@/components/pitch/NumberedFeatureList";

const SPINE_FEATURES: NumberedFeatureItem[] = [
  {
    title: "تابلو قیمت روز",
    description: (
      <>
        قیمت میلگرد کارخانه بناب (مثلاً فولاد بناب، شاهین بناب، …) + قیمت دم در
        مغازه؛ به‌روزرسانی باید به‌سادگی{" "}
        <strong className="font-medium text-foreground">
          یک پیام تلگرام یا حدود ۳ کلیک
        </strong>{" "}
        باشد.
      </>
    ),
  },
  {
    title: "ماشین‌حساب وزن و قیمت",
    description: (
      <>
        جدول وزن استاندارد شاخه — سایز{" "}
        <span className="tnum font-medium text-foreground">۸</span> (≈
        <span className="tnum"> ۴٫۷۴ کیلو</span>) تا سایز{" "}
        <span className="tnum font-medium text-foreground">۳۲</span>.
      </>
    ),
  },
  {
    title: "هشدار قیمت پیامکی",
    description: (
      <>
        وقتی اینترنت قطع است،{" "}
        <strong className="font-medium text-foreground">
          پیامک قابل اتکاست
        </strong>
        .
      </>
    ),
  },
  {
    title: "پنل ادمین ساده",
    description: (
      <>
        به‌روز کردن قیمت، دیدن سفارش و رزرو، و{" "}
        <strong className="font-semibold text-primary">
          لیست تلفن مشتری
        </strong>{" "}
        — این لیست دارایی واقعی کسب‌وکار است.
      </>
    ),
  },
  {
    title: "نصب PWA",
    description: (
      <>
        بدون استور؛ آخرین قیمت‌های دیده‌شده{" "}
        <span className="font-medium text-foreground">آفلاین</span> هم در
        دسترس‌اند.
      </>
    ),
  },
];

export function SpineScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        ستون فقرات اپ ·{" "}
        <span className="text-primary">فیچرهای مشترک</span>
      </h1>

      {/* Frame 1 — calm intro */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="مقدمه"
      >
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          پنج فیچر مشترک که{" "}
          <strong className="font-semibold text-foreground">
            ستون فقرات اپ آینده
          </strong>{" "}
          را می‌سازند.
        </p>
      </section>

      {/* Frame 2 — five numbered pillars */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="فیچرهای مشترک"
      >
        <NumberedFeatureList items={SPINE_FEATURES} />
      </section>

      {/* Risk closer */}
      <section aria-label="ریسک شماره ۱">
        <EmphasisCard>
          <div className="flex flex-col gap-2 text-[0.9375rem] leading-relaxed text-foreground">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-primary">
              ریسک شماره ۱
            </p>
            <p className="font-medium">
              اگر آپدیت قیمت سخت باشد، محصول ظرف چند روز{" "}
              <strong className="font-bold text-primary">رها می‌شود</strong>؛
              سادگی طراحی{" "}
              <strong className="font-bold text-foreground">اجباری</strong>{" "}
              است.
            </p>
          </div>
        </EmphasisCard>
      </section>
    </article>
  );
}
