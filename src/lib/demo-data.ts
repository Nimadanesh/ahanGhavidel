export type ProductOption = {
  value: string;
  label: string;
};

export const PRODUCT_OPTIONS: ProductOption[] = [
  { value: "a3-8", label: "میلگرد A3 سایز ۸" },
  { value: "a3-10", label: "میلگرد A3 سایز ۱۰" },
  { value: "a3-12", label: "میلگرد A3 سایز ۱۲" },
  { value: "a3-14", label: "میلگرد A3 سایز ۱۴" },
  { value: "a3-16", label: "میلگرد A3 سایز ۱۶" },
  { value: "a3-18", label: "میلگرد A3 سایز ۱۸" },
  { value: "a3-20", label: "میلگرد A3 سایز ۲۰" },
  { value: "a3-22", label: "میلگرد A3 سایز ۲۲" },
  { value: "a3-25", label: "میلگرد A3 سایز ۲۵" },
  { value: "a2-12", label: "میلگرد A2 سایز ۱۲" },
  { value: "a2-14", label: "میلگرد A2 سایز ۱۴" },
  { value: "a2-16", label: "میلگرد A2 سایز ۱۶" },
] as const;

export type MillOption = {
  value: string;
  label: string;
};

export const MILL_OPTIONS: MillOption[] = [
  { value: "zafar", label: "فولاد ظفر" },
  { value: "shahin", label: "فولاد شاهین" },
  { value: "any", label: "مهم نیست" },
] as const;

export const QUANTITY_MIN_KG = 100;
export const QUANTITY_MAX_KG = 48_000;
export const QUANTITY_DEFAULT_KG = 1000;
export const QUANTITY_STEP_KG = 100;

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

/** Minimal Gregorian → Jalali converter (10-day algorithm). */
export function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number,
): { jy: number; jm: number; jd: number } {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let jm: number;
  let jd: number;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return { jy, jm, jd };
}

/** Return today's Jalali date. */
export function todayJalali(): { jy: number; jm: number; jd: number } {
  const now = new Date();
  return gregorianToJalali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
  );
}

/** Format Jalali date as a short display string. */
export function formatJalali(jy: number, jm: number, jd: number): string {
  return `${jd} ${JALALI_MONTHS[jm - 1]} ${jy}`;
}

/** Format quantity in kg as a human-readable string with unit. */
export function formatQuantity(kg: number): string {
  if (kg < 1000) {
    return `${kg.toLocaleString("fa-IR")} کیلوگرم`;
  }
  const tons = kg / 1000;
  const rounded = Math.round(tons * 10) / 10;
  if (rounded === Math.floor(rounded)) {
    return `${Math.floor(rounded).toLocaleString("fa-IR")} تن`;
  }
  return `${rounded.toLocaleString("fa-IR")} تن`;
}

/** Parse a quantity string (accepting tons or kg) back to kg. */
export function parseQuantityKg(raw: string): number | null {
  const n = Number.parseFloat(raw.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n);
}
