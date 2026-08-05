import { InquiryForm } from "@/components/demo/InquiryForm";

export function InquiryFormScreen() {
  return (
    <article className="flex flex-1 flex-col gap-5">
      <h1 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-foreground">
        استعلام / درخواست سریع
      </h1>

      <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
        مشخصات را وارد کنید تا پیش‌فاکتور آماده شود.
      </p>

      <InquiryForm />
    </article>
  );
}
