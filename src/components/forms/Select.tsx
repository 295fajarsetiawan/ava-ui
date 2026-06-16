import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  buildEndpointUrl,
  cx,
  getByPath,
  mapDefaultOption,
  normalizeEndpoint,
  type FormFieldBaseProps,
  type SelectEndpointConfig,
  type SelectOption
} from "./formUtils";

export type { SelectEndpointConfig, SelectOption } from "./formUtils";
export type SelectLoadOptions = (query: string, page: number) => Promise<SelectOption[]> | SelectOption[];

interface SelectBaseProps extends FormFieldBaseProps {
  className?: string;
  clearable?: boolean;
  disabled?: boolean;
  endpoint?: string | SelectEndpointConfig;
  loadOptions?: SelectLoadOptions;
  name?: string;
  options?: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
}

export interface SelectProps extends SelectBaseProps {
  defaultValue?: string;
  onValueChange?: (value: string, option: SelectOption | null) => void;
  value?: string;
}

export interface MultiSelectProps extends SelectBaseProps {
  defaultValue?: string[];
  maxVisibleTags?: number;
  onValueChange?: (value: string[], options: SelectOption[]) => void;
  value?: string[];
}

function useRemoteOptions(endpoint: string | SelectEndpointConfig | undefined, loadOptions: SelectLoadOptions | undefined, search: string) {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const config = useMemo(() => (endpoint ? normalizeEndpoint(endpoint) : null), [endpoint]);
  const canLoadMore = Boolean(config?.pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, endpoint, loadOptions]);

  useEffect(() => {
    if (!config && !loadOptions) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const request = loadOptions
      ? Promise.resolve(loadOptions(search, page))
      : fetch(buildEndpointUrl(config as SelectEndpointConfig, search, page), {
          headers: config?.headers,
          signal: controller.signal
        })
          .then((response) => {
            if (!response.ok) throw new Error(`Request failed ${response.status}`);
            return response.json();
          })
          .then((json) => {
            const endpointConfig = config as SelectEndpointConfig;
            const rawItems = getByPath(json, endpointConfig.dataPath);
            const list = Array.isArray(rawItems) ? rawItems : Array.isArray(json) ? json : [];
            return list.map((item) => (endpointConfig.mapOption ? endpointConfig.mapOption(item) : mapDefaultOption(item)));
          });

    request
      .then((nextOptions) => {
        setOptions((current) => (page === 1 ? nextOptions : [...current, ...nextOptions]));
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(requestError instanceof Error ? requestError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [config, loadOptions, page, search]);

  return {
    canLoadMore,
    error,
    isLoading,
    options,
    setPage
  };
}

function SelectChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ClearButton({ onClear }: { onClear: () => void }) {
  return (
    <button aria-label="Clear value" className="rpc-select__clear" onClick={onClear} type="button">
      x
    </button>
  );
}

export function Select({
  className = "",
  clearable = true,
  defaultValue = "",
  disabled,
  endpoint,
  error,
  fullWidth = true,
  helperText,
  label,
  loadOptions,
  name,
  onValueChange,
  options = [],
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  required,
  searchable = true,
  value
}: SelectProps) {
  const fallbackId = useId();
  const buttonId = `${name ?? fallbackId}-button`;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [innerValue, setInnerValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const remote = useRemoteOptions(endpoint, loadOptions, search);
  const allOptions = endpoint || loadOptions ? remote.options : options;
  const currentValue = value ?? innerValue;
  const selectedOption = allOptions.find((option) => option.value === currentValue) ?? null;
  const filteredOptions = endpoint || loadOptions
    ? allOptions
    : allOptions.filter((option) => `${option.label} ${option.description ?? ""}`.toLowerCase().includes(search.toLowerCase()));
  const message = error ?? helperText ?? remote.error;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const commit = (nextOption: SelectOption | null) => {
    const nextValue = nextOption?.value ?? "";
    if (value === undefined) setInnerValue(nextValue);
    onValueChange?.(nextValue, nextOption);
    setIsOpen(false);
  };

  return (
    <div
      className={cx(
        "rpc-form-field",
        "rpc-select",
        fullWidth && "rpc-form-field--full",
        disabled && "rpc-form-field--disabled",
        message && error && "rpc-form-field--error",
        className
      )}
      ref={rootRef}
    >
      {label ? (
        <label className="rpc-form-field__label" htmlFor={buttonId}>
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </label>
      ) : null}
      <input name={name} readOnly required={required} type="hidden" value={currentValue} />
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="rpc-select__trigger"
        disabled={disabled}
        id={buttonId}
        onClick={() => setIsOpen((next) => !next)}
        type="button"
      >
        <span className={cx(!selectedOption && "rpc-select__placeholder")}>{selectedOption?.label ?? placeholder}</span>
        {clearable && currentValue ? <ClearButton onClear={() => commit(null)} /> : null}
        <span className="rpc-select__chevron">
          <SelectChevron />
        </span>
      </button>
      {isOpen ? (
        <div className="rpc-select__popover">
          {searchable ? (
            <input
              autoFocus
              className="rpc-select__search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              value={search}
            />
          ) : null}
          <div className="rpc-select__list" role="listbox">
            {filteredOptions.map((option) => (
              <button
                aria-selected={option.value === currentValue}
                className={cx("rpc-select__option", option.value === currentValue && "rpc-select__option--selected")}
                disabled={option.disabled}
                key={option.value}
                onClick={() => commit(option)}
                role="option"
                type="button"
              >
                <span>{option.label}</span>
                {option.description ? <small>{option.description}</small> : null}
              </button>
            ))}
            {!remote.isLoading && filteredOptions.length === 0 ? <span className="rpc-select__empty">No options found.</span> : null}
            {remote.isLoading ? <span className="rpc-select__empty">Loading...</span> : null}
          </div>
          {endpoint && remote.canLoadMore ? (
            <button className="rpc-select__load" disabled={remote.isLoading} onClick={() => remote.setPage((page) => page + 1)} type="button">
              Load more
            </button>
          ) : null}
        </div>
      ) : null}
      {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
    </div>
  );
}

export function MultiSelect({
  className = "",
  clearable = true,
  defaultValue = [],
  disabled,
  endpoint,
  error,
  fullWidth = true,
  helperText,
  label,
  loadOptions,
  maxVisibleTags = 3,
  name,
  onValueChange,
  options = [],
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  required,
  searchable = true,
  value
}: MultiSelectProps) {
  const fallbackId = useId();
  const buttonId = `${name ?? fallbackId}-button`;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [innerValue, setInnerValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const remote = useRemoteOptions(endpoint, loadOptions, search);
  const allOptions = endpoint || loadOptions ? remote.options : options;
  const selectedValues = value ?? innerValue;
  const selectedOptions = selectedValues.map((item) => allOptions.find((option) => option.value === item)).filter(Boolean) as SelectOption[];
  const filteredOptions = endpoint || loadOptions
    ? allOptions
    : allOptions.filter((option) => `${option.label} ${option.description ?? ""}`.toLowerCase().includes(search.toLowerCase()));
  const message = error ?? helperText ?? remote.error;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const commit = (nextValues: string[]) => {
    const nextOptions = nextValues.map((item) => allOptions.find((option) => option.value === item)).filter(Boolean) as SelectOption[];
    if (value === undefined) setInnerValue(nextValues);
    onValueChange?.(nextValues, nextOptions);
  };

  const toggleOption = (option: SelectOption) => {
    if (option.disabled) return;
    commit(selectedValues.includes(option.value) ? selectedValues.filter((item) => item !== option.value) : [...selectedValues, option.value]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, option: SelectOption) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleOption(option);
    }
  };

  return (
    <div
      className={cx(
        "rpc-form-field",
        "rpc-select",
        "rpc-select--multi",
        fullWidth && "rpc-form-field--full",
        disabled && "rpc-form-field--disabled",
        className
      )}
      ref={rootRef}
    >
      {label ? (
        <label className="rpc-form-field__label" htmlFor={buttonId}>
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </label>
      ) : null}
      {selectedValues.map((item) => (
        <input key={item} name={name} readOnly type="hidden" value={item} />
      ))}
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="rpc-select__trigger rpc-select__trigger--multi"
        disabled={disabled}
        id={buttonId}
        onClick={() => setIsOpen((next) => !next)}
        type="button"
      >
        {selectedOptions.length ? (
          <span className="rpc-select__tags">
            {selectedOptions.slice(0, maxVisibleTags).map((option) => (
              <span className="rpc-select__tag" key={option.value}>
                {option.label}
              </span>
            ))}
            {selectedOptions.length > maxVisibleTags ? <span className="rpc-select__tag">+{selectedOptions.length - maxVisibleTags}</span> : null}
          </span>
        ) : (
          <span className="rpc-select__placeholder">{placeholder}</span>
        )}
        {clearable && selectedValues.length ? <ClearButton onClear={() => commit([])} /> : null}
        <span className="rpc-select__chevron">
          <SelectChevron />
        </span>
      </button>
      {isOpen ? (
        <div className="rpc-select__popover">
          {searchable ? (
            <input
              autoFocus
              className="rpc-select__search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              value={search}
            />
          ) : null}
          <div className="rpc-select__list" role="listbox" aria-multiselectable="true">
            {filteredOptions.map((option) => (
              <button
                aria-selected={selectedValues.includes(option.value)}
                className={cx("rpc-select__option", selectedValues.includes(option.value) && "rpc-select__option--selected")}
                disabled={option.disabled}
                key={option.value}
                onClick={() => toggleOption(option)}
                onKeyDown={(event) => onKeyDown(event, option)}
                role="option"
                type="button"
              >
                <span>{option.label}</span>
                {option.description ? <small>{option.description}</small> : null}
              </button>
            ))}
            {!remote.isLoading && filteredOptions.length === 0 ? <span className="rpc-select__empty">No options found.</span> : null}
            {remote.isLoading ? <span className="rpc-select__empty">Loading...</span> : null}
          </div>
          {endpoint && remote.canLoadMore ? (
            <button className="rpc-select__load" disabled={remote.isLoading} onClick={() => remote.setPage((page) => page + 1)} type="button">
              Load more
            </button>
          ) : null}
        </div>
      ) : null}
      {message ? <span className={cx("rpc-form-field__message", error && "rpc-form-field__message--error")}>{message}</span> : null}
    </div>
  );
}
