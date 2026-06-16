import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Checkbox, RadioGroup, Switch } from "./Choices";
import { DatePicker } from "./DatePicker";
import { Input, InputEmail, InputNumber, InputPassword, TextArea } from "./Input";
import { MultiSelect, Select, type SelectLoadOptions } from "./Select";
import { UploadArea } from "./UploadArea";
import { cx, type SelectOption } from "./formUtils";

export type FormBuilderValues = Record<string, unknown>;
export type FormFieldName<TValues extends FormBuilderValues> = Extract<keyof TValues, string>;

export type FormFieldKind =
  | "text"
  | "textarea"
  | "otp"
  | "checkbox"
  | "switch"
  | "radio"
  | "range"
  | "rating"
  | "color"
  | "date"
  | "time"
  | "date-range"
  | "select"
  | "datetime"
  | "file";

export interface DateRangeValue {
  start?: string;
  end?: string;
}

export interface FormFieldRenderProps {
  accept?: string;
  allowPasswordToggle?: boolean;
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  hint?: ReactNode;
  inputClassName?: string;
  length?: number;
  max?: number | string;
  min?: number | string;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  searchPlaceholder?: string;
  searchable?: boolean;
  step?: number;
  type?: "text" | "search" | "url" | "tel" | "email" | "password" | "number";
}

export interface FormFieldRenderContext<TValues extends FormBuilderValues> {
  field: FormFieldConfig<TValues>;
  value: unknown;
  values: Partial<TValues>;
  error?: ReactNode;
  setValue: (value: unknown) => void;
}

export interface FormFieldConfig<TValues extends FormBuilderValues = FormBuilderValues> {
  kind: FormFieldKind;
  name: FormFieldName<TValues>;
  label?: ReactNode;
  row?: string;
  options?: SelectOption[];
  loadOptions?: SelectLoadOptions;
  props?: FormFieldRenderProps;
  render?: (context: FormFieldRenderContext<TValues>) => ReactNode;
}

export interface FormBuilderProps<TValues extends FormBuilderValues = FormBuilderValues> {
  actions?: ReactNode;
  className?: string;
  columns?: number;
  defaultValues?: Partial<TValues>;
  errors?: Partial<Record<FormFieldName<TValues>, ReactNode>>;
  fields: FormFieldConfig<TValues>[];
  onReset?: () => void;
  onSubmit?: (values: Partial<TValues>, event: FormEvent<HTMLFormElement>) => void;
  onValuesChange?: (values: Partial<TValues>, changedName: FormFieldName<TValues>, value: unknown) => void;
  resetLabel?: ReactNode;
  showActions?: boolean;
  submitLabel?: ReactNode;
  values?: Partial<TValues>;
}

interface RenderableField {
  name: string;
  label?: ReactNode;
  props?: FormFieldRenderProps;
}

function getDefaultValue(kind: FormFieldKind, multiple?: boolean) {
  if (kind === "checkbox" || kind === "switch") return false;
  if (kind === "range" || kind === "rating") return 0;
  if (kind === "date-range") return { start: "", end: "" };
  if (kind === "file") return multiple ? [] : null;
  if (kind === "select" && multiple) return [];
  return "";
}

function getValue<TValues extends FormBuilderValues>(
  values: Partial<TValues>,
  field: FormFieldConfig<TValues>
) {
  return values[field.name] ?? getDefaultValue(field.kind, field.props?.multiple);
}

function buildRows<TValues extends FormBuilderValues>(fields: FormFieldConfig<TValues>[]) {
  const rows: Array<{ id: string; fields: FormFieldConfig<TValues>[] }> = [];
  const rowMap = new Map<string, { id: string; fields: FormFieldConfig<TValues>[] }>();

  fields.forEach((field, index) => {
    const rowId = field.row ?? `__single_${index}`;
    const existingRow = rowMap.get(rowId);

    if (existingRow) {
      existingRow.fields.push(field);
      return;
    }

    const row = { id: rowId, fields: [field] };
    rowMap.set(rowId, row);
    rows.push(row);
  });

  return rows;
}

function NativeField({
  error,
  field,
  type,
  value,
  onChange
}: {
  error?: ReactNode;
  field: RenderableField;
  type: "time" | "datetime-local" | "color";
  value: string;
  onChange: (value: string) => void;
}) {
  const props = field.props ?? {};

  return (
    <label className={cx("rpc-form-field", props.className, error && "rpc-form-field--error")}>
      {field.label ? (
        <span className="rpc-form-field__label">
          {field.label}
          {props.required ? <span className="rpc-form-field__required">*</span> : null}
        </span>
      ) : null}
      <span className={cx("rpc-input-wrap", type === "color" && "rpc-input-wrap--color")}>
        <input
          className={cx("rpc-form-input", props.inputClassName)}
          disabled={props.disabled}
          max={typeof props.max === "string" ? props.max : undefined}
          min={typeof props.min === "string" ? props.min : undefined}
          name={field.name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={props.placeholder}
          required={props.required}
          type={type}
          value={value}
        />
      </span>
      {error ?? props.hint ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? props.hint}</span> : null}
    </label>
  );
}

function OtpField({
  error,
  field,
  value,
  onChange
}: {
  error?: ReactNode;
  field: RenderableField;
  value: string;
  onChange: (value: string) => void;
}) {
  const props = field.props ?? {};
  const length = props.length ?? 6;
  const characters = value.padEnd(length, " ").slice(0, length).split("");

  return (
    <label className={cx("rpc-form-field", props.className, error && "rpc-form-field--error")}>
      {field.label ? (
        <span className="rpc-form-field__label">
          {field.label}
          {props.required ? <span className="rpc-form-field__required">*</span> : null}
        </span>
      ) : null}
      <span className="rpc-form-otp" role="group" aria-label={typeof field.label === "string" ? field.label : field.name}>
        {characters.map((character, index) => (
          <input
            aria-label={`Digit ${index + 1}`}
            className={cx("rpc-form-otp__input", props.inputClassName)}
            disabled={props.disabled}
            inputMode="numeric"
            key={`${field.name}-${index}`}
            maxLength={1}
            onChange={(event) => {
              const nextCharacters = characters.map((item) => item.trim());
              nextCharacters[index] = event.target.value.slice(-1);
              onChange(nextCharacters.join("").slice(0, length));
              event.currentTarget.nextElementSibling instanceof HTMLInputElement &&
                event.target.value &&
                event.currentTarget.nextElementSibling.focus();
            }}
            required={props.required}
            value={character.trim()}
          />
        ))}
      </span>
      {error ?? props.hint ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? props.hint}</span> : null}
    </label>
  );
}

function RangeField({
  error,
  field,
  value,
  onChange
}: {
  error?: ReactNode;
  field: RenderableField;
  value: number;
  onChange: (value: number) => void;
}) {
  const props = field.props ?? {};

  return (
    <label className={cx("rpc-form-field", "rpc-form-range", props.className, error && "rpc-form-field--error")}>
      {field.label ? (
        <span className="rpc-form-field__label">
          {field.label}
          {props.required ? <span className="rpc-form-field__required">*</span> : null}
        </span>
      ) : null}
      <span className="rpc-form-range__top">
        <input
          disabled={props.disabled}
          max={Number(props.max ?? 100)}
          min={Number(props.min ?? 0)}
          name={field.name}
          onChange={(event) => onChange(Number(event.target.value))}
          required={props.required}
          step={props.step ?? 1}
          type="range"
          value={value}
        />
        <strong>{value}</strong>
      </span>
      {error ?? props.hint ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? props.hint}</span> : null}
    </label>
  );
}

function RatingField({
  error,
  field,
  value,
  onChange
}: {
  error?: ReactNode;
  field: RenderableField;
  value: number;
  onChange: (value: number) => void;
}) {
  const props = field.props ?? {};
  const max = Number(props.max ?? 5);

  return (
    <div className={cx("rpc-form-field", props.className, error && "rpc-form-field--error")}>
      {field.label ? (
        <span className="rpc-form-field__label">
          {field.label}
          {props.required ? <span className="rpc-form-field__required">*</span> : null}
        </span>
      ) : null}
      <div className="rpc-form-rating" role="radiogroup" aria-label={typeof field.label === "string" ? field.label : field.name}>
        {Array.from({ length: max }, (_, index) => {
          const rating = index + 1;
          return (
            <button
              aria-checked={value === rating}
              className={cx("rpc-form-rating__item", rating <= value && "rpc-form-rating__item--active")}
              disabled={props.disabled}
              key={rating}
              onClick={() => onChange(rating)}
              role="radio"
              type="button"
            >
              ★
            </button>
          );
        })}
      </div>
      {error ?? props.hint ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? props.hint}</span> : null}
    </div>
  );
}

export function FormBuilder<TValues extends FormBuilderValues = FormBuilderValues>({
  actions,
  className = "",
  columns = 2,
  defaultValues,
  errors,
  fields,
  onReset,
  onSubmit,
  onValuesChange,
  resetLabel = "Reset",
  showActions = true,
  submitLabel = "Submit",
  values
}: FormBuilderProps<TValues>) {
  const [internalValues, setInternalValues] = useState<Partial<TValues>>(defaultValues ?? {});
  const currentValues = useMemo(() => ({ ...internalValues, ...values }), [internalValues, values]);
  const rows = useMemo(() => buildRows(fields), [fields]);

  const updateValue = (name: FormFieldName<TValues>, nextValue: unknown) => {
    const nextValues = {
      ...currentValues,
      [name]: nextValue
    } as Partial<TValues>;

    if (!values) {
      setInternalValues(nextValues);
    }

    onValuesChange?.(nextValues, name, nextValue);
  };

  const renderField = (field: FormFieldConfig<TValues>) => {
    const props = field.props ?? {};
    const value = getValue(currentValues, field);
    const error = errors?.[field.name];
    const helperText = props.hint;
    const common = {
      className: props.className,
      disabled: props.disabled,
      error,
      helperText,
      inputClassName: props.inputClassName,
      label: field.label,
      name: field.name,
      placeholder: props.placeholder,
      required: props.required
    };

    if (field.render) {
      return field.render({
        error,
        field,
        setValue: (nextValue) => updateValue(field.name, nextValue),
        value,
        values: currentValues
      });
    }

    if (field.kind === "textarea") {
      return (
        <TextArea
          {...common}
          maxLength={typeof props.max === "number" ? props.max : undefined}
          onChange={(event) => updateValue(field.name, event.target.value)}
          rows={props.rows}
          value={String(value ?? "")}
        />
      );
    }

    if (field.kind === "otp") {
      return <OtpField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} value={String(value ?? "")} />;
    }

    if (field.kind === "checkbox") {
      return (
        <Checkbox
          checked={Boolean(value)}
          description={props.description}
          disabled={props.disabled}
          error={error}
          label={field.label}
          name={field.name}
          onChange={(event) => updateValue(field.name, event.target.checked)}
          required={props.required}
        />
      );
    }

    if (field.kind === "switch") {
      return (
        <Switch
          checked={Boolean(value)}
          description={props.description}
          disabled={props.disabled}
          error={error}
          label={field.label}
          name={field.name}
          onChange={(event) => updateValue(field.name, event.target.checked)}
          required={props.required}
        />
      );
    }

    if (field.kind === "radio") {
      return (
        <RadioGroup
          {...common}
          onValueChange={(nextValue) => updateValue(field.name, nextValue)}
          options={field.options ?? []}
          value={String(value ?? "")}
        />
      );
    }

    if (field.kind === "range") {
      return <RangeField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} value={Number(value ?? 0)} />;
    }

    if (field.kind === "rating") {
      return <RatingField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} value={Number(value ?? 0)} />;
    }

    if (field.kind === "color") {
      return <NativeField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} type="color" value={String(value || "#2563eb")} />;
    }

    if (field.kind === "date") {
      return (
        <DatePicker
          {...common}
          maxDate={typeof props.max === "string" ? props.max : undefined}
          minDate={typeof props.min === "string" ? props.min : undefined}
          onValueChange={(nextValue) => updateValue(field.name, nextValue)}
          value={String(value ?? "")}
        />
      );
    }

    if (field.kind === "time") {
      return <NativeField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} type="time" value={String(value ?? "")} />;
    }

    if (field.kind === "datetime") {
      return <NativeField error={error} field={field} onChange={(nextValue) => updateValue(field.name, nextValue)} type="datetime-local" value={String(value ?? "")} />;
    }

    if (field.kind === "date-range") {
      const rangeValue = (value && typeof value === "object" ? value : {}) as DateRangeValue;

      return (
        <div className={cx("rpc-form-field", props.className, error && "rpc-form-field--error")}>
          {field.label ? (
            <span className="rpc-form-field__label">
              {field.label}
              {props.required ? <span className="rpc-form-field__required">*</span> : null}
            </span>
          ) : null}
          <div className="rpc-form-date-range">
            <DatePicker
              maxDate={typeof props.max === "string" ? props.max : undefined}
              minDate={typeof props.min === "string" ? props.min : undefined}
              onValueChange={(nextValue) => updateValue(field.name, { ...rangeValue, start: nextValue })}
              placeholder="Start date"
              value={rangeValue.start ?? ""}
            />
            <DatePicker
              maxDate={typeof props.max === "string" ? props.max : undefined}
              minDate={rangeValue.start || (typeof props.min === "string" ? props.min : undefined)}
              onValueChange={(nextValue) => updateValue(field.name, { ...rangeValue, end: nextValue })}
              placeholder="End date"
              value={rangeValue.end ?? ""}
            />
          </div>
          {error ?? helperText ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{error ?? helperText}</span> : null}
        </div>
      );
    }

    if (field.kind === "select") {
      if (props.multiple) {
        return (
          <MultiSelect
            {...common}
            loadOptions={field.loadOptions}
            onValueChange={(nextValue) => updateValue(field.name, nextValue)}
            options={field.options}
            searchPlaceholder={props.searchPlaceholder}
            searchable={props.searchable}
            value={Array.isArray(value) ? value.map(String) : []}
          />
        );
      }

      return (
        <Select
          {...common}
          loadOptions={field.loadOptions}
          onValueChange={(nextValue) => updateValue(field.name, nextValue)}
          options={field.options}
          searchPlaceholder={props.searchPlaceholder}
          searchable={props.searchable}
          value={String(value ?? "")}
        />
      );
    }

    if (field.kind === "file") {
      const currentFiles = Array.isArray(value) ? (value as File[]) : value instanceof File ? [value] : [];

      return (
        <UploadArea
          accept={props.accept}
          disabled={props.disabled}
          error={error}
          files={currentFiles}
          helperText={helperText}
          label={field.label}
          multiple={props.multiple}
          name={field.name}
          onFilesChange={(nextFiles) => updateValue(field.name, props.multiple ? nextFiles : nextFiles[0] ?? null)}
          required={props.required}
        />
      );
    }

    if (props.type === "number") {
      return (
        <InputNumber
          {...common}
          max={typeof props.max === "number" ? props.max : undefined}
          min={typeof props.min === "number" ? props.min : undefined}
          onValueChange={(nextValue) => updateValue(field.name, nextValue)}
          step={props.step}
          value={typeof value === "number" || typeof value === "string" ? value : ""}
        />
      );
    }

    if (props.type === "password" && props.allowPasswordToggle !== false) {
      return (
        <InputPassword
          {...common}
          onChange={(event) => updateValue(field.name, event.target.value)}
          showStrength
          value={String(value ?? "")}
        />
      );
    }

    if (props.type === "email") {
      return (
        <InputEmail
          {...common}
          onChange={(event) => updateValue(field.name, event.target.value)}
          value={String(value ?? "")}
        />
      );
    }

    return (
      <Input
        {...common}
        onChange={(event) => updateValue(field.name, event.target.value)}
        type={props.type === "search" || props.type === "url" || props.type === "tel" ? props.type : "text"}
        value={String(value ?? "")}
      />
    );
  };

  return (
    <form
      className={cx("rpc-form-builder", className)}
      onReset={(event) => {
        event.preventDefault();
        setInternalValues(defaultValues ?? {});
        onReset?.();
      }}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(currentValues, event);
      }}
      style={{ "--rpc-form-builder-columns": columns } as CSSProperties}
    >
      {rows.map((row) => (
        <div className="rpc-form-builder__row" key={row.id}>
          {row.fields.map((field) => (
            <div className="rpc-form-builder__field" key={field.name}>
              {renderField(field)}
            </div>
          ))}
        </div>
      ))}

      {showActions ? (
        <div className="rpc-form-builder__actions">
          {actions ?? (
            <>
              <button className="rpc-form-builder__button rpc-form-builder__button--ghost" type="reset">
                {resetLabel}
              </button>
              <button className="rpc-form-builder__button" type="submit">
                {submitLabel}
              </button>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
}
