export const PITCH_SCREEN_COUNT = 12 as const;

export const SCREEN_ORDER = [
  "intro",
  "product",
  "attract-retain",
  "audiences",
  "spine",
  "export",
  "ops",
  "feature-bridge",
  "feature-demo",
  "why-now",
  "tech-shift",
  "contact",
] as const;

export type ScreenId = (typeof SCREEN_ORDER)[number];
export type PitchStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function isPitchStep(value: number): value is PitchStep {
  return Number.isInteger(value) && value >= 1 && value <= PITCH_SCREEN_COUNT;
}

export function parsePitchStep(raw: string): PitchStep | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !isPitchStep(n)) return null;
  return n;
}

export function screenIdForStep(step: PitchStep): ScreenId {
  return SCREEN_ORDER[step - 1];
}

export function pitchPath(step: PitchStep): string {
  return `/p/${step}`;
}
