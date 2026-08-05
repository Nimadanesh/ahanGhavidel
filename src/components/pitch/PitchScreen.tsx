import { AttractRetainScreen } from "@/components/pitch/screens/AttractRetainScreen";
import { AudiencesScreen } from "@/components/pitch/screens/AudiencesScreen";
import { ContactScreen } from "@/components/pitch/screens/ContactScreen";
import { ExportScreen } from "@/components/pitch/screens/ExportScreen";
import { FeatureBridgeScreen } from "@/components/pitch/screens/FeatureBridgeScreen";
import { InquiryFormScreen } from "@/components/pitch/screens/InquiryFormScreen";
import { IntroScreen } from "@/components/pitch/screens/IntroScreen";
import { OpsScreen } from "@/components/pitch/screens/OpsScreen";
import { PlaceholderScreen } from "@/components/pitch/screens/PlaceholderScreen";
import { ProductScreen } from "@/components/pitch/screens/ProductScreen";
import { SpineScreen } from "@/components/pitch/screens/SpineScreen";
import { TechShiftScreen } from "@/components/pitch/screens/TechShiftScreen";
import { WhyNowScreen } from "@/components/pitch/screens/WhyNowScreen";
import type { PitchStep } from "@/lib/pitch-screens";

type PitchScreenProps = {
  step: PitchStep;
};

export function PitchScreen({ step }: PitchScreenProps) {
  if (step === 1) {
    return <IntroScreen />;
  }

  if (step === 2) {
    return <ProductScreen />;
  }

  if (step === 3) {
    return <AttractRetainScreen />;
  }

  if (step === 4) {
    return <AudiencesScreen />;
  }

  if (step === 5) {
    return <SpineScreen />;
  }

  if (step === 6) {
    return <ExportScreen />;
  }

  if (step === 7) {
    return <OpsScreen />;
  }

  if (step === 8) {
    return <FeatureBridgeScreen />;
  }

  if (step === 9) {
    return <InquiryFormScreen />;
  }

  if (step === 10) {
    return <WhyNowScreen />;
  }

  if (step === 11) {
    return <TechShiftScreen />;
  }

  if (step === 12) {
    return <ContactScreen />;
  }

  return <PlaceholderScreen step={step} />;
}
