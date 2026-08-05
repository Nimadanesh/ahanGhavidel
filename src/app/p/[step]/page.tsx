import { redirect } from "next/navigation";

import { PitchScreen } from "@/components/pitch/PitchScreen";
import { PitchShell } from "@/components/pitch/PitchShell";
import { parsePitchStep } from "@/lib/pitch-screens";

type PageProps = {
  params: Promise<{ step: string }>;
};

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({
    step: String(i + 1),
  }));
}

export default async function PitchStepPage({ params }: PageProps) {
  const { step: raw } = await params;
  const step = parsePitchStep(raw);

  if (step === null) {
    redirect("/p/1");
  }

  return (
    <PitchShell step={step}>
      <PitchScreen step={step} />
    </PitchShell>
  );
}
