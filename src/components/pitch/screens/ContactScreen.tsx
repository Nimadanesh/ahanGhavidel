export function ContactScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        تماس با ما
      </h1>

      <section
        className="rounded-[12px] bg-card px-4 py-4"
        aria-label="درباره ما"
      >
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">agentsTEAM</strong>{" "}
            تیم توسعه نرم‌افزار و وب‌اپ کسب‌وکار است.
          </p>
          <p>
            این تجربه یک{" "}
            <strong className="font-semibold text-primary">
              نمونه نمایشی
            </strong>{" "}
            برای آهن‌فروشی قویدل · بناب است.
          </p>
        </div>
      </section>
    </article>
  );
}
