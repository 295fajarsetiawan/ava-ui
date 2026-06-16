import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cx, type FormFieldBaseProps, type SelectOption } from "./formUtils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    Omit<FormFieldBaseProps, "fullWidth"> {
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className = "", description, disabled, error, helperText, id, label, required, ...props },
  ref
) {
  const fallbackId = useId();
  const checkboxId = id ?? props.name ?? fallbackId;
  const message = error ?? helperText;

  return (
    <label className={cx("rpc-choice", disabled && "rpc-choice--disabled", error && "rpc-choice--error", className)} htmlFor={checkboxId}>
      <input
        aria-invalid={Boolean(error) || undefined}
        className="rpc-choice__native"
        disabled={disabled}
        id={checkboxId}
        ref={ref}
        required={required}
        type="checkbox"
        {...props}
      />
      <span className="rpc-choice__control" aria-hidden="true" />
      <span className="rpc-choice__content">
        {label ? (
          <span className="rpc-choice__label">
            {label}
            {required ? <span className="rpc-form-field__required">*</span> : null}
          </span>
        ) : null}
        {description ? <span className="rpc-choice__description">{description}</span> : null}
        {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
      </span>
    </label>
  );
});

export interface CheckboxGroupProps extends FormFieldBaseProps {
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  layout?: "horizontal" | "vertical";
  name?: string;
  onValueChange?: (values: string[]) => void;
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
}

export function CheckboxGroup({
  className = "",
  defaultValue = [],
  disabled,
  error,
  helperText,
  label,
  layout = "vertical",
  name,
  onValueChange,
  options,
  required,
  value
}: CheckboxGroupProps) {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const selectedValues = value ?? innerValue;
  const message = error ?? helperText;

  const toggleValue = (optionValue: string) => {
    const nextValue = selectedValues.includes(optionValue)
      ? selectedValues.filter((item) => item !== optionValue)
      : [...selectedValues, optionValue];

    if (value === undefined) setInnerValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <fieldset className={cx("rpc-choice-group", `rpc-choice-group--${layout}`, error && "rpc-choice-group--error", className)}>
      {label ? (
        <legend className="rpc-form-field__label">
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </legend>
      ) : null}
      <div className="rpc-choice-group__items">
        {options.map((option) => (
          <Checkbox
            checked={selectedValues.includes(option.value)}
            description={option.description}
            disabled={disabled || option.disabled}
            key={option.value}
            label={option.label}
            name={name}
            onChange={() => toggleValue(option.value)}
            value={option.value}
          />
        ))}
      </div>
      {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
    </fieldset>
  );
}

export interface RadioGroupProps extends FormFieldBaseProps {
  className?: string;
  disabled?: boolean;
  layout?: "horizontal" | "vertical";
  name?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
}

export function RadioGroup({
  className = "",
  defaultValue,
  disabled,
  error,
  helperText,
  label,
  layout = "vertical",
  name,
  onValueChange,
  options,
  required,
  value
}: RadioGroupProps) {
  const fallbackName = useId();
  const groupName = name ?? fallbackName;
  const [innerValue, setInnerValue] = useState(defaultValue ?? "");
  const selectedValue = value ?? innerValue;
  const message = error ?? helperText;

  return (
    <fieldset className={cx("rpc-choice-group", `rpc-choice-group--${layout}`, error && "rpc-choice-group--error", className)}>
      {label ? (
        <legend className="rpc-form-field__label">
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </legend>
      ) : null}
      <div className="rpc-choice-group__items">
        {options.map((option) => (
          <label
            className={cx("rpc-choice rpc-choice--radio", (disabled || option.disabled) && "rpc-choice--disabled")}
            key={option.value}
          >
            <input
              checked={selectedValue === option.value}
              className="rpc-choice__native"
              disabled={disabled || option.disabled}
              name={groupName}
              onChange={() => {
                if (value === undefined) setInnerValue(option.value);
                onValueChange?.(option.value);
              }}
              required={required}
              type="radio"
              value={option.value}
            />
            <span className="rpc-choice__control" aria-hidden="true" />
            <span className="rpc-choice__content">
              <span className="rpc-choice__label">{option.label}</span>
              {option.description ? <span className="rpc-choice__description">{option.description}</span> : null}
            </span>
          </label>
        ))}
      </div>
      {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
    </fieldset>
  );
}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    Omit<FormFieldBaseProps, "fullWidth"> {
  description?: ReactNode;
  onLabel?: ReactNode;
  offLabel?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className = "", description, disabled, error, helperText, id, label, offLabel = "Off", onLabel = "On", required, ...props },
  ref
) {
  const fallbackId = useId();
  const switchId = id ?? props.name ?? fallbackId;
  const message = error ?? helperText;

  return (
    <label className={cx("rpc-switch", disabled && "rpc-switch--disabled", error && "rpc-switch--error", className)} htmlFor={switchId}>
      <input
        aria-invalid={Boolean(error) || undefined}
        className="rpc-switch__native"
        disabled={disabled}
        id={switchId}
        ref={ref}
        required={required}
        type="checkbox"
        {...props}
      />
      <span className="rpc-switch__track" aria-hidden="true">
        <span className="rpc-switch__thumb" />
      </span>
      <span className="rpc-switch__content">
        {label ? (
          <span className="rpc-choice__label">
            {label}
            {required ? <span className="rpc-form-field__required">*</span> : null}
          </span>
        ) : null}
        {description ? <span className="rpc-choice__description">{description}</span> : null}
        <span className="rpc-switch__state">
          <span>{offLabel}</span>
          <span>{onLabel}</span>
        </span>
        {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
      </span>
    </label>
  );
});
