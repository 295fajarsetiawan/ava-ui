import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes
} from "react";
import { cx, type FormFieldBaseProps } from "./formUtils";

export type TextInputType = "text" | "search" | "url" | "tel" | "email" | "password";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix" | "type">,
    FormFieldBaseProps {
  inputClassName?: string;
  type?: TextInputType;
  prefix?: ReactNode;
  suffix?: ReactNode;
  validationMessage?: ReactNode;
}

function FieldShell({
  children,
  className,
  disabled,
  error,
  fullWidth = true,
  helperText,
  id,
  label,
  required
}: FormFieldBaseProps & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
}) {
  const message = error ?? helperText;

  return (
    <label
      className={cx(
        "rpc-form-field",
        fullWidth && "rpc-form-field--full",
        disabled && "rpc-form-field--disabled",
        error && "rpc-form-field--error",
        className
      )}
      htmlFor={id}
    >
      {label ? (
        <span className="rpc-form-field__label">
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </span>
      ) : null}
      {children}
      {message ? (
        <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span>
      ) : null}
    </label>
  );
}

function EyeIcon({ off = false }: { off?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
      {off ? <path d="m4 4 16 16" /> : null}
    </svg>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className = "",
    disabled,
    error,
    fullWidth,
    helperText,
    id,
    inputClassName,
    label,
    prefix,
    required,
    suffix,
    type = "text",
    validationMessage,
    ...props
  },
  ref
) {
  const fallbackId = useId();
  const inputId = id ?? props.name ?? fallbackId;
  const errorMessage = error ?? validationMessage;

  return (
    <FieldShell
      className={className}
      disabled={disabled}
      error={errorMessage}
      fullWidth={fullWidth}
      helperText={helperText}
      id={inputId}
      label={label}
      required={required}
    >
      <span className="rpc-input-wrap">
        {prefix ? <span className="rpc-input-wrap__affix">{prefix}</span> : null}
        <input
          aria-describedby={errorMessage || helperText ? `${inputId}-message` : undefined}
          aria-invalid={Boolean(errorMessage) || undefined}
          className={cx("rpc-form-input", inputClassName)}
          disabled={disabled}
          id={inputId}
          ref={ref}
          required={required}
          type={type}
          {...props}
        />
        {suffix ? <span className="rpc-input-wrap__affix">{suffix}</span> : null}
      </span>
    </FieldShell>
  );
});

export interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "prefix" | "suffix" | "type" | "value">,
    FormFieldBaseProps {
  formatNumber?: boolean;
  inputClassName?: string;
  onValueChange?: (value: number | null) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: number | string;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    className = "",
    disabled,
    error,
    formatNumber = false,
    fullWidth,
    helperText,
    id,
    inputClassName,
    label,
    max,
    min,
    onValueChange,
    prefix,
    required,
    step = 1,
    suffix,
    value,
    ...props
  },
  ref
) {
  const fallbackId = useId();
  const inputId = id ?? props.name ?? fallbackId;
  const [innerValue, setInnerValue] = useState<string>(value === undefined ? "" : String(value));
  const currentValue = value === undefined ? innerValue : String(value);

  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(String(value));
    }
  }, [value]);

  const numberValue = currentValue === "" ? null : Number(currentValue);
  const isFocused = typeof document !== "undefined" && document.activeElement?.id === inputId;
  const displayValue = formatNumber && !isFocused && numberValue !== null
    ? new Intl.NumberFormat().format(numberValue)
    : currentValue;

  const commit = (nextValue: string) => {
    if (value === undefined) setInnerValue(nextValue);
    onValueChange?.(nextValue === "" ? null : Number(nextValue));
  };

  const clamp = (next: number) => {
    let result = next;
    if (min !== undefined) result = Math.max(Number(min), result);
    if (max !== undefined) result = Math.min(Number(max), result);
    return result;
  };

  const stepBy = (direction: 1 | -1) => {
    const base = numberValue ?? Number(min ?? 0);
    commit(String(clamp(base + Number(step) * direction)));
  };

  return (
    <FieldShell
      className={className}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      id={inputId}
      label={label}
      required={required}
    >
      <span className="rpc-input-wrap rpc-input-wrap--number">
        {prefix ? <span className="rpc-input-wrap__affix">{prefix}</span> : null}
        <input
          aria-invalid={Boolean(error) || undefined}
          className={cx("rpc-form-input", inputClassName)}
          disabled={disabled}
          id={inputId}
          max={max}
          min={min}
          inputMode={formatNumber ? "decimal" : undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) => commit(formatNumber ? event.target.value.replace(/,/g, "") : event.target.value)}
          ref={ref}
          required={required}
          step={step}
          type={formatNumber ? "text" : "number"}
          value={displayValue}
          {...props}
        />
        <span className="rpc-number-stepper" aria-hidden={disabled}>
          <button disabled={disabled} onClick={() => stepBy(1)} tabIndex={-1} type="button">
            +
          </button>
          <button disabled={disabled} onClick={() => stepBy(-1)} tabIndex={-1} type="button">
            -
          </button>
        </span>
        {suffix ? <span className="rpc-input-wrap__affix">{suffix}</span> : null}
      </span>
    </FieldShell>
  );
});

export interface InputEmailProps extends Omit<InputProps, "type"> {
  validateOnBlur?: boolean;
}

export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(function InputEmail(
  { helperText = "Gunakan format email yang valid.", validateOnBlur = true, onBlur, error, ...props },
  ref
) {
  const [localError, setLocalError] = useState<ReactNode>(null);

  return (
    <Input
      error={error ?? localError}
      helperText={helperText}
      inputMode="email"
      onBlur={(event) => {
        if (validateOnBlur && event.currentTarget.value && !event.currentTarget.checkValidity()) {
          setLocalError("Format email belum valid.");
        } else {
          setLocalError(null);
        }

        onBlur?.(event);
      }}
      ref={ref}
      type="email"
      {...props}
    />
  );
});

export interface InputPasswordProps extends Omit<InputProps, "suffix" | "type"> {
  showStrength?: boolean;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword(
  { showStrength = true, value, defaultValue, helperText, error, ...props },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState(String(defaultValue ?? value ?? ""));
  const currentValue = value === undefined ? localValue : String(value ?? "");
  const strength = useMemo(() => {
    let score = 0;
    if (currentValue.length >= 8) score += 1;
    if (/[A-Z]/.test(currentValue)) score += 1;
    if (/[0-9]/.test(currentValue)) score += 1;
    if (/[^A-Za-z0-9]/.test(currentValue)) score += 1;
    return score;
  }, [currentValue]);

  const strengthLabel = ["Very weak", "Weak", "Medium", "Strong", "Excellent"][strength];

  return (
    <div className="rpc-password-field">
      <Input
        error={error}
        helperText={helperText}
        onChange={(event) => {
          if (value === undefined) setLocalValue(event.target.value);
          props.onChange?.(event);
        }}
        ref={ref}
        suffix={
          <button
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="rpc-password-toggle"
            onClick={() => setIsVisible((next) => !next)}
            type="button"
          >
            <EyeIcon off={isVisible} />
          </button>
        }
        type={isVisible ? "text" : "password"}
        value={value === undefined ? localValue : value}
        {...props}
      />
      <input hidden readOnly type={isVisible ? "text" : "password"} value={currentValue} />
      {showStrength ? (
        <div className="rpc-password-strength" aria-label={`Password strength ${strengthLabel}`}>
          <span className="rpc-password-strength__track">
            <span className={`rpc-password-strength__bar rpc-password-strength__bar--${strength}`} />
          </span>
          <span>{strengthLabel}</span>
        </div>
      ) : null}
    </div>
  );
});

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FormFieldBaseProps {
  autoResize?: boolean;
  inputClassName?: string;
  showCounter?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    autoResize = true,
    className = "",
    disabled,
    error,
    fullWidth,
    helperText,
    id,
    inputClassName,
    label,
    maxLength,
    onChange,
    required,
    showCounter = true,
    value,
    defaultValue,
    ...props
  },
  ref
) {
  const fallbackId = useId();
  const textAreaId = id ?? props.name ?? fallbackId;
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const [count, setCount] = useState(String(value ?? defaultValue ?? "").length);

  const resize = () => {
    const target = innerRef.current;
    if (!target || !autoResize) return;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(resize, [autoResize, value]);
  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  return (
    <FieldShell
      className={className}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      id={textAreaId}
      label={label}
      required={required}
    >
      <textarea
        aria-invalid={Boolean(error) || undefined}
        className={cx("rpc-form-textarea", inputClassName)}
        disabled={disabled}
        id={textAreaId}
        maxLength={maxLength}
        onChange={(event) => {
          setCount(event.target.value.length);
          resize();
          onChange?.(event);
        }}
        ref={innerRef}
        required={required}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
      {showCounter && maxLength ? (
        <span className="rpc-form-counter">
          {count}/{maxLength}
        </span>
      ) : null}
    </FieldShell>
  );
});
