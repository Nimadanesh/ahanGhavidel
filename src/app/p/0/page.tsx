"use client";

import { useRouter } from "next/navigation";

import { OnboardingScreen } from "@/components/pitch/screens/OnboardingScreen";
import { PitchHeader } from "@/components/pitch/PitchHeader";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background">
        <PitchHeader />
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-20 pb-24">
          <div className="flex flex-1 flex-col">
            <OnboardingScreen />
          </div>
        </main>

        {/* Fixed CTA at bottom — outside scroll */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center bg-background/80 px-4 pb-6 pt-3 backdrop-blur-md">
          <div className="w-full max-w-[480px]">
            <button
              type="button"
              onClick={() => router.push("/p/1")}
              className="h-12 w-full rounded-[10px] bg-primary text-[0.9375rem] font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
            >
              شروع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
