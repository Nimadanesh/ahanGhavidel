"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function OnboardingScreen() {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        چرا وب‌اپ و سئو؟
      </h1>

      {/* Always-visible intro */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            گوگل از بین هزاران سایت، فقط چندتا را برای نتیجهٔ جستجوی شما نشان
            می‌دهد. بخشی از این انتخاب را می‌دانیم؛ بخشی‌اش هم جزو الگوریتم
            محرمانهٔ گوگل است.
          </p>
          <p>
            کاری که کمک می‌کند سایت شما وارد پیشنهادهای گوگل شود،{" "}
            <strong className="font-semibold text-foreground/80">
              سئو (SEO)
            </strong>{" "}
            است؛ یعنی ساختن و چیدن سایت به‌شکلی که گوگل آن را برای آن جستجو،
            گزینهٔ مناسب‌تری ببیند.
          </p>
        </div>
      </section>

      {/* Disclosure — مطالعه بیشتر */}
      <section aria-label="مطالعه بیشتر">
        <div
          className="overflow-hidden rounded-[12px] bg-card"
          aria-expanded={expanded}
        >
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="flex w-full items-center justify-between px-4 py-3 text-start text-[0.9375rem] font-medium text-foreground"
          >
            <span>مطالعه بیشتر</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-200"
              strokeWidth={1.75}
              style={{ transform: expanded ? "rotate(180deg)" : undefined }}
            />
          </button>

          {expanded && (
            <>
              <div className="mx-4 border-t border-border" />
              <div className="flex flex-col gap-3 px-4 pb-4 pt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <p>
                  یکی از سیگنال‌های مهم گوگل، رفتار واقعی کاربر است: چقدر در سایت
                  می‌ماند، بین صفحات جابه‌جا می‌شود، و آیا تجربه برایش مفید بوده
                  یا سریع خارج شده.
                </p>
                <p>
                  وب‌اپ یعنی اپلیکیشنی که داخل مرورگر باز می‌شود؛ نیازی به نصب
                  از فروشگاه‌ها ندارد و می‌تواند کاربر را مستقیم از نتیجهٔ جستجوی
                  گوگل — منبع بخش بزرگی از ترافیک روزمره — وارد ابزار شما کند.
                </p>
                <p>
                  اگر وب‌اپ نیاز مشتری را بشناسد، ساده و روان باشد و کاربر را
                  درگیر نگه دارد، شانس بیشتری دارید که گوگل شما را برای آن جستجو
                  جدی بگیرد.
                </p>
                <p className="font-medium text-foreground/80">
                  خلاصه: وب‌اپی که برای نیاز واقعی ساخته شده، هم پایهٔ سئو است و
                  هم زیرساخت فروش دیجیتال.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
