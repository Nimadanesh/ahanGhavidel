import type { PitchStep } from "@/lib/pitch-screens";

type PlaceholderScreenProps = {
  step: PitchStep;
};

export function PlaceholderScreen({ step }: PlaceholderScreenProps) {
  return (
    <article className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
      <p className="text-[0.9375rem] font-semibold text-foreground">
        صفحه {step}
      </p>
      <p className="text-[0.8125rem] text-muted-foreground">به‌زودی</p>
    </article>
  );
}
