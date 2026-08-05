export function WhyNowScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        چرا الان؟
      </h1>

      {/* Frame 1 — timing context */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="زمینه"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            وب‌اپ حرفه‌ای فقط یک پلتفرم جدید نیست؛ فرصتی برای{" "}
            <strong className="font-semibold text-foreground">
              بهتر کردن روند کار
            </strong>
            ، جذب و نگه‌داشت مشتری است.
          </p>
          <p>
            متناسب با{" "}
            <strong className="font-semibold text-foreground">
              همین کسب‌وکار
            </strong>{" "}
            و موقعیت{" "}
            <strong className="font-semibold text-foreground">بناب</strong>.
          </p>
          <p>
            سرمایه‌گذاری به‌عنوان{" "}
            <strong className="font-semibold text-primary">
              رشد هوشمند
            </strong>
            ، نه فقط هزینه.
          </p>
        </div>
      </section>

      {/* Frame 2 — SEO insight */}
      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="سئو و دیده شدن"
      >
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            سئو و دیده شدن
          </strong>{" "}
          وقتی وب‌اپ بر اساس نیاز واقعی مشتری فیچر می‌سازد، با سایت
          عمومیِ ویترینی زمین تا آسمان فرق دارد: ابزار مفید (قیمت،
          ماشین‌حساب، راهنما) هم ارزش می‌دهد هم شانس دیده شدن را روی همان
          ارزش سوار می‌کند.
        </p>
      </section>
    </article>
  );
}
