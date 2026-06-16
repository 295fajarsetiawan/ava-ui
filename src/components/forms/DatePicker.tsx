import { useEffect, useId, useMemo, useRef, useState, type InputHTMLAttributes } from "react";
import { cx, type FormFieldBaseProps } from "./formUtils";

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "value">,
    FormFieldBaseProps {
  clearable?: boolean;
  disabledDate?: (date: Date) => boolean;
  maxDate?: string;
  minDate?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

const dayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" });
const monthFormatter = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });

function toDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function sameDay(first: Date | null, second: Date | null) {
  return Boolean(
    first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
  );
}

export function DatePicker({
  className = "",
  clearable = true,
  defaultValue,
  disabled,
  disabledDate,
  error,
  fullWidth = true,
  helperText,
  id,
  label,
  maxDate,
  minDate,
  name,
  onValueChange,
  placeholder = "YYYY-MM-DD",
  required,
  value,
  ...props
}: DatePickerProps) {
  const fallbackId = useId();
  const inputId = id ?? name ?? fallbackId;
  const [isOpen, setIsOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ""));
  const currentValue = value ?? innerValue;
  const selectedDate = toDate(currentValue);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date());
  const rootRef = useRef<HTMLDivElement | null>(null);
  const min = toDate(minDate);
  const max = toDate(maxDate);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (selectedDate) setVisibleMonth(selectedDate);
  }, [currentValue]);

  const days = useMemo(() => {
    const start = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const end = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0);
    const firstOffset = start.getDay();
    const result: Date[] = [];

    for (let index = 0; index < firstOffset; index += 1) {
      result.push(new Date(start.getFullYear(), start.getMonth(), index - firstOffset + 1));
    }

    for (let day = 1; day <= end.getDate(); day += 1) {
      result.push(new Date(start.getFullYear(), start.getMonth(), day));
    }

    while (result.length % 7 !== 0) {
      const last = result[result.length - 1];
      result.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
    }

    return result;
  }, [visibleMonth]);

  const weekDays = useMemo(() => {
    const base = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) => dayFormatter.format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + index)).slice(0, 2));
  }, []);

  const isDisabled = (date: Date) => {
    if (min && date < min) return true;
    if (max && date > max) return true;
    return disabledDate?.(date) ?? false;
  };

  const commit = (nextValue: string) => {
    if (value === undefined) setInnerValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div
      className={cx(
        "rpc-form-field",
        "rpc-date-picker",
        fullWidth && "rpc-form-field--full",
        disabled && "rpc-form-field--disabled",
        error && "rpc-form-field--error",
        className
      )}
      ref={rootRef}
    >
      {label ? (
        <label className="rpc-form-field__label" htmlFor={inputId}>
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </label>
      ) : null}
      <span className="rpc-input-wrap">
        <input
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-invalid={Boolean(error) || undefined}
          className="rpc-form-input"
          disabled={disabled}
          id={inputId}
          max={maxDate}
          min={minDate}
          name={name}
          onChange={(event) => commit(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          type="text"
          value={currentValue}
          {...props}
        />
        {clearable && currentValue ? (
          <button aria-label="Clear date" className="rpc-select__clear" onClick={() => commit("")} type="button">
            x
          </button>
        ) : null}
        <button aria-label="Open calendar" className="rpc-date-picker__button" disabled={disabled} onClick={() => setIsOpen((next) => !next)} type="button">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <path d="M8 2v4M16 2v4M3 10h18" />
          </svg>
        </button>
      </span>
      {isOpen ? (
        <div className="rpc-date-picker__calendar" role="dialog" aria-label="Choose date">
          <div className="rpc-date-picker__header">
            <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))} type="button">
              ‹
            </button>
            <strong>{monthFormatter.format(visibleMonth)}</strong>
            <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))} type="button">
              ›
            </button>
          </div>
          <div className="rpc-date-picker__grid">
            {weekDays.map((day) => (
              <span className="rpc-date-picker__weekday" key={day}>
                {day}
              </span>
            ))}
            {days.map((day) => {
              const optionValue = toInputValue(day);
              const outside = day.getMonth() !== visibleMonth.getMonth();
              return (
                <button
                  className={cx(
                    "rpc-date-picker__day",
                    outside && "rpc-date-picker__day--outside",
                    sameDay(day, selectedDate) && "rpc-date-picker__day--selected"
                  )}
                  disabled={isDisabled(day)}
                  key={optionValue}
                  onClick={() => {
                    commit(optionValue);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {error ?? helperText ? (
        <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? helperText}</span>
      ) : null}
    </div>
  );
}
