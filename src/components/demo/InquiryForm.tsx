"use client";

import { Check } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DarkSelect, type DarkSelectOption } from "@/components/ui/dark-select";
import {
  JALALI_MONTHS,
  PRODUCT_OPTIONS,
  QUANTITY_DEFAULT_KG,
  QUANTITY_MAX_KG,
  QUANTITY_MIN_KG,
  QUANTITY_STEP_KG,
  formatJalali,
  formatQuantity,
  todayJalali,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type LogisticsMode = "seller" | "self" | null;

type FormErrors = Partial<Record<string, string>>;

/* ─── Mill combobox options ─── */

const MILL_PRESET_OPTIONS: DarkSelectOption[] = [
  { value: "zafar", label: "کارخانه ظفر" },
  { value: "shahin", label: "کارخانه شاهین بناب" },
  { value: "__custom__", label: "انتخاب کارخانه" },
];

/* ─── Hooks ─── */

function useQuantityState() {
  const [kg, setKg] = useState(QUANTITY_DEFAULT_KG);
  const [rawInput, setRawInput] = useState(String(QUANTITY_DEFAULT_KG));

  const display = useMemo(() => {
    if (kg < 1000) return { value: kg, unit: "kg" as const };
    const tons = kg / 1000;
    const rounded = Math.round(tons * 10) / 10;
    return { value: rounded, unit: "tons" as const };
  }, [kg]);

  const syncRawFromKg = useCallback((newKg: number) => {
    const d =
      newKg < 1000
        ? { value: newKg, unit: "kg" as const }
        : {
            value: Math.round((newKg / 1000) * 10) / 10,
            unit: "tons" as const,
          };
    setRawInput(String(d.value));
  }, []);

  const onSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newKg = Number.parseInt(e.target.value, 10);
      setKg(newKg);
      syncRawFromKg(newKg);
    },
    [syncRawFromKg],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRawInput(e.target.value);
    },
    [],
  );

  const onInputBlur = useCallback(() => {
    const raw = Number.parseFloat(rawInput);
    if (!Number.isFinite(raw) || raw <= 0) {
      syncRawFromKg(kg);
      return;
    }
    const converted = display.unit === "tons" ? raw * 1000 : raw;
    const clamped = Math.round(
      Math.max(QUANTITY_MIN_KG, Math.min(QUANTITY_MAX_KG, converted)),
    );
    setKg(clamped);
    syncRawFromKg(clamped);
  }, [rawInput, display.unit, kg, syncRawFromKg]);

  return {
    kg,
    display,
    rawInput,
    onSliderChange,
    onInputChange,
    onInputBlur,
  };
}

function useDatePicker() {
  const today = todayJalali();
  const [day, setDay] = useState(today.jd);
  const [month, setMonth] = useState(today.jm);
  const [year, setYear] = useState(1405);

  const daysInMonth = useMemo(() => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return year % 4 === 3 ? 30 : 29;
  }, [month, year]);

  const clampDay = useCallback(
    (d: number) => Math.max(1, Math.min(daysInMonth, d)),
    [daysInMonth],
  );

  const onDayChange = useCallback(
    (v: string) => {
      setDay(clampDay(Number.parseInt(v, 10)));
    },
    [clampDay],
  );

  const onMonthChange = useCallback(
    (v: string) => {
      const m = Number.parseInt(v, 10);
      setMonth(m);
      setDay((d) => clampDay(d));
    },
    [clampDay],
  );

  const onYearChange = useCallback((v: string) => {
    setYear(Number.parseInt(v, 10));
  }, []);

  const dayOptions: DarkSelectOption[] = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) => {
        const d = String(i + 1);
        return { value: d, label: d };
      }),
    [daysInMonth],
  );

  const monthOptions: DarkSelectOption[] = useMemo(
    () => JALALI_MONTHS.map((name, i) => ({ value: String(i + 1), label: name })),
    [],
  );

  const yearOptions: DarkSelectOption[] = [
    { value: "1405", label: "1405" },
  ];

  return {
    day,
    month,
    year,
    dayOptions,
    monthOptions,
    yearOptions,
    onDayChange,
    onMonthChange,
    onYearChange,
  };
}

/* ─── Main form ─── */

export function InquiryForm() {
  const [product, setProduct] = useState("");
  const [millPreset, setMillPreset] = useState("");
  const [millCustom, setMillCustom] = useState("");
  const quantity = useQuantityState();
  const datePicker = useDatePicker();
  const [logistics, setLogistics] = useState<LogisticsMode>(null);
  const [address, setAddress] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [truckTime, setTruckTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!product) e.product = "لطفاً محصول را انتخاب کنید";
    if (quantity.kg < QUANTITY_MIN_KG || quantity.kg > QUANTITY_MAX_KG) {
      e.quantity = "مقدار مجاز نیست";
    }
    if (!logistics) e.logistics = "لطفاً نحوه بارگیری را انتخاب کنید";
    if (logistics === "seller") {
      if (!address.trim()) e.address = "لطفاً آدرس را وارد کنید";
    }
    return e;
  }, [product, quantity.kg, logistics, address]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      setErrors(errs);
      if (Object.keys(errs).length === 0) {
        setSubmitted(true);
      }
    },
    [validate],
  );

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/15">
          <Check className="size-7 text-primary" strokeWidth={2} />
        </span>
        <p className="text-[1.0625rem] font-semibold text-foreground">
          درخواست ثبت شد
        </p>
        <p className="max-w-[280px] text-[0.875rem] leading-relaxed text-muted-foreground">
          پیش‌فاکتور به‌زودی ارسال می‌شود.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* 1 — Product */}
      <FieldGroup label="محصول" error={errors.product}>
        <DarkSelect
          value={product}
          onValueChange={(v) => {
            setProduct(v);
            setErrors((prev) => ({ ...prev, product: undefined }));
          }}
          options={[...PRODUCT_OPTIONS]}
          placeholder="انتخاب محصول"
        />
      </FieldGroup>

      {/* 2 — Mill (combobox) */}
      <FieldGroup label="کارخانه مدنظر">
        <DarkSelect
          value={millPreset}
          onValueChange={(v) => {
            setMillPreset(v);
            if (v !== "__custom__") setMillCustom("");
          }}
          options={MILL_PRESET_OPTIONS}
          placeholder="انتخاب کارخانه"
        />
        {millPreset === "__custom__" && (
          <input
            type="text"
            value={millCustom}
            onChange={(e) => setMillCustom(e.target.value)}
            placeholder="نام کارخانه را بنویسید"
            className="mt-2 h-12 w-full rounded-[10px] bg-input px-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
          />
        )}
      </FieldGroup>

      {/* 3 — Quantity */}
      <FieldGroup
        label="مقدار مورد نیاز"
        error={errors.quantity}
        value={formatQuantity(quantity.kg)}
      >
        <input
          type="range"
          min={QUANTITY_MIN_KG}
          max={QUANTITY_MAX_KG}
          step={QUANTITY_STEP_KG}
          value={quantity.kg}
          onChange={quantity.onSliderChange}
          className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-primary [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={QUANTITY_MIN_KG}
            max={QUANTITY_MAX_KG}
            step={QUANTITY_STEP_KG}
            value={quantity.rawInput}
            onChange={quantity.onInputChange}
            onBlur={quantity.onInputBlur}
            className="h-10 w-24 rounded-[10px] bg-input px-3 text-center text-[0.9375rem] tabular-nums text-foreground [color-scheme:dark]"
          />
          <span className="text-[0.8125rem] text-muted-foreground">
            {quantity.display.unit === "kg" ? "کیلوگرم" : "تن"}
          </span>
        </div>
      </FieldGroup>

      {/* 4 — Delivery date (Jalali) */}
      <FieldGroup label="زمان تحویل">
        <div className="flex gap-2">
          <DarkSelect
            value={String(datePicker.day)}
            onValueChange={datePicker.onDayChange}
            options={datePicker.dayOptions}
            placeholder="روز"
            className="flex-1"
          />
          <DarkSelect
            value={String(datePicker.month)}
            onValueChange={datePicker.onMonthChange}
            options={datePicker.monthOptions}
            placeholder="ماه"
            className="flex-1"
          />
          <DarkSelect
            value={String(datePicker.year)}
            onValueChange={datePicker.onYearChange}
            options={datePicker.yearOptions}
            placeholder="سال"
            className="flex-1"
          />
        </div>
        <p className="mt-1 text-[0.75rem] text-muted-foreground">
          {formatJalali(datePicker.year, datePicker.month, datePicker.day)}
        </p>
      </FieldGroup>

      {/* 5 — Logistics mode */}
      <FieldGroup label="نحوه بارگیری" error={errors.logistics}>
        <SegmentGroup
          options={[
            { value: "seller", label: "به عهده شما" },
            { value: "self", label: "به عهده خودم" },
          ]}
          value={logistics ?? ""}
          onChange={(v) => {
            setLogistics(v as LogisticsMode);
            setErrors((prev) => ({ ...prev, logistics: undefined }));
          }}
        />
      </FieldGroup>

      {/* 5.1 — Seller delivery fields */}
      {logistics === "seller" && (
        <div className="flex flex-col gap-4 rounded-[12px] bg-surface-2/50 p-4">
          <FieldGroup label="آدرس" error={errors.address}>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((prev) => ({ ...prev, address: undefined }));
              }}
              placeholder="آدرس محل تخلیه"
              className="h-12 w-full rounded-[10px] bg-input px-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
            />
          </FieldGroup>
          <FieldGroup label="ساعت مناسب تحویل">
            <input
              type="text"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              placeholder="مثلاً ۹ تا ۱۲"
              className="h-12 w-full rounded-[10px] bg-input px-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
            />
          </FieldGroup>
          <FieldGroup label="توضیحات محل تخلیه">
            <input
              type="text"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="مثلاً درب کارگاه، کوچه باریک…"
              className="h-12 w-full rounded-[10px] bg-input px-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
            />
          </FieldGroup>
        </div>
      )}

      {/* 5.2 — Self pickup fields */}
      {logistics === "self" && (
        <div className="flex flex-col gap-4 rounded-[12px] bg-surface-2/50 p-4">
          <FieldGroup label="زمان ارسال ماشین">
            <input
              type="text"
              value={truckTime}
              onChange={(e) => setTruckTime(e.target.value)}
              placeholder="چه زمانی ماشین می‌فرستید؟"
              className="h-12 w-full rounded-[10px] bg-input px-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
            />
          </FieldGroup>
        </div>
      )}

      {/* 6 — Notes */}
      <FieldGroup label="توضیحات">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="توضیحات لازم را اینجا بنویسید."
          rows={3}
          className="w-full rounded-[10px] bg-input px-3 py-2.5 text-[0.9375rem] leading-relaxed text-foreground placeholder:text-muted-foreground"
        />
      </FieldGroup>

      {/* 7 — CTA */}
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-[10px] text-[0.9375rem]"
      >
        دریافت پیش‌فاکتور
      </Button>
    </form>
  );
}

/* ─── Shared sub-components ─── */

function FieldGroup({
  label,
  error,
  value,
  children,
}: {
  label: string;
  error?: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-[0.8125rem] font-medium text-foreground">
          {label}
        </label>
        {value && (
          <span className="tnum text-[0.8125rem] font-semibold text-primary">
            {value}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-[0.75rem] text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SegmentGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2" role="radiogroup">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-10 flex-1 rounded-[10px] px-2 py-2 text-[0.8125rem] font-semibold transition-colors duration-150 active:scale-[0.97]",
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-surface-2 text-muted-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
