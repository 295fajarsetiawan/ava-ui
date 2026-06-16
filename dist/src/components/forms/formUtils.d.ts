import { ReactNode } from 'react';
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
export declare function cx(...classes: unknown[]): string;
export declare function getByPath(source: unknown, path?: string): unknown;
export declare function normalizeEndpoint(endpoint: string | SelectEndpointConfig): SelectEndpointConfig;
export declare function mapDefaultOption(item: unknown): SelectOption;
export declare function buildEndpointUrl(config: SelectEndpointConfig, search: string, page: number): string;
