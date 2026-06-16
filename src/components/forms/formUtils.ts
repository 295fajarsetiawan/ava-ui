import type { ReactNode } from "react";

export type FormFieldStatus = "default" | "error" | "success";

export interface FormFieldBaseProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  meta?: unknown;
}

export interface SelectEndpointConfig<TItem = unknown> {
  url: string;
  dataPath?: string;
  searchParam?: string;
  pageParam?: string;
  limitParam?: string;
  pageSize?: number;
  queryParams?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  mapOption?: (item: TItem) => SelectOption;
}

export function cx(...classes: unknown[]) {
  return classes.filter((item): item is string => typeof item === "string" && item.length > 0).join(" ");
}

export function getByPath(source: unknown, path?: string): unknown {
  if (!path) return source;

  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
}

export function normalizeEndpoint(endpoint: string | SelectEndpointConfig): SelectEndpointConfig {
  return typeof endpoint === "string" ? { url: endpoint } : endpoint;
}

export function mapDefaultOption(item: unknown): SelectOption {
  if (item && typeof item === "object") {
    const record = item as Record<string, unknown>;
    const value = record.value ?? record.id ?? record.key ?? record.slug;
    const label = record.label ?? record.name ?? record.title ?? value;

    return {
      label: String(label ?? ""),
      value: String(value ?? label ?? ""),
      meta: item
    };
  }

  return {
    label: String(item ?? ""),
    value: String(item ?? "")
  };
}

export function buildEndpointUrl(config: SelectEndpointConfig, search: string, page: number) {
  const url = new URL(config.url, typeof window === "undefined" ? "http://localhost" : window.location.origin);
  const searchParam = config.searchParam ?? "search";
  const pageParam = config.pageParam ?? "page";
  const limitParam = config.limitParam ?? "limit";

  if (search) {
    url.searchParams.set(searchParam, search);
  }

  if (config.pageSize) {
    url.searchParams.set(pageParam, String(page));
    url.searchParams.set(limitParam, String(config.pageSize));
  }

  Object.entries(config.queryParams ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return config.url.startsWith("http") ? url.toString() : `${url.pathname}${url.search}`;
}
