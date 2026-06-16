import { HTMLAttributes, ReactNode } from 'react';
export type DataGridSortDirection = "ascending" | "descending";
export interface DataGridHeaderContext<T> {
    column: DataGridColumn<T>;
    isSorted: boolean;
    sortDirection?: DataGridSortDirection;
}
export interface DataGridColumn<T> {
    id: string;
    header: ReactNode | ((context: DataGridHeaderContext<T>) => ReactNode);
    accessorKey?: keyof T & string;
    cell?: (item: T, rowIndex: number) => ReactNode;
    isRowHeader?: boolean;
    allowsSorting?: boolean;
    width?: string | number;
    align?: "left" | "center" | "right";
    className?: string;
    searchable?: boolean;
    hideable?: boolean;
}
export interface DataGridFilterOption {
    id: string;
    label: string;
    value: string;
}
export interface DataGridFilter<T> {
    id: string;
    label: string;
    accessorKey?: keyof T & string;
    options: DataGridFilterOption[];
}
export interface DataGridQuery {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: DataGridSortDirection;
    search?: string;
    filters?: Record<string, string[]>;
    visibleColumns?: string[];
}
export interface DataGridResponse<T> {
    data: T[];
    total?: number;
}
export type DataGridAuthConfig = {
    type: "bearer";
    token: string;
} | {
    type: "basic";
    username: string;
    password: string;
} | {
    type: "apiKey";
    key: string;
    value: string;
    in?: "header" | "query";
} | {
    type: "custom";
    headers: Record<string, string>;
};
export interface DataGridEndpointConfig<T> {
    url: string;
    method?: "GET" | "POST";
    headers?: Record<string, string>;
    auth?: DataGridAuthConfig;
    dataPath?: string;
    totalPath?: string;
    responseMapper?: (payload: unknown) => DataGridResponse<T> | T[];
    queryParams?: (query: DataGridQuery) => Record<string, string | number | boolean | Array<string | number | boolean> | undefined>;
    body?: (query: DataGridQuery) => unknown;
}
export interface DataGridAction<T> {
    id: string;
    name: string;
    icon?: ReactNode;
    color?: "default" | "primary" | "success" | "warning" | "danger" | string;
    disabled?: boolean;
    onClick: (row: T, rowIndex: number) => void;
}
export interface DataGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
    columns: DataGridColumn<T>[];
    data?: T[];
    endpoint?: string | DataGridEndpointConfig<T>;
    fetchData?: (query: DataGridQuery) => Promise<DataGridResponse<T> | T[]>;
    requestInit?: RequestInit;
    pageSize?: number;
    pageSizeOptions?: number[];
    initialSortBy?: string;
    initialSortDirection?: DataGridSortDirection;
    searchable?: boolean;
    searchPlaceholder?: string;
    initialSearch?: string;
    onSearchChange?: (value: string) => void;
    filters?: DataGridFilter<T>[];
    initialFilters?: Record<string, string[]>;
    onFiltersChange?: (filters: Record<string, string[]>) => void;
    columnVisibility?: boolean;
    defaultVisibleColumns?: string[];
    visibleColumns?: string[];
    onVisibleColumnsChange?: (columns: string[]) => void;
    emptyState?: ReactNode;
    loadingState?: ReactNode;
    errorState?: ReactNode | ((error: Error) => ReactNode);
    getRowKey?: (row: T, index: number) => string;
    onRowClick?: (row: T) => void;
    striped?: boolean;
    hoverable?: boolean;
    compact?: boolean;
    tone?: "light" | "dark";
    selectable?: boolean;
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    onSelectionChange?: (selectedKeys: string[], selectedRows: T[]) => void;
    actions?: DataGridAction<T>[];
    mobileMode?: "table" | "card" | "auto";
    cardBreakpoint?: "mobile" | "tablet";
    renderCard?: (row: T, rowIndex: number) => ReactNode;
    title?: ReactNode;
    description?: ReactNode;
}
export declare function DataGrid<T>({ columns, data, endpoint, fetchData, requestInit, pageSize, pageSizeOptions, initialSortBy, initialSortDirection, searchable, searchPlaceholder, initialSearch, onSearchChange, filters, initialFilters, onFiltersChange, columnVisibility, defaultVisibleColumns, visibleColumns, onVisibleColumnsChange, emptyState, loadingState, errorState, getRowKey, onRowClick, striped, hoverable, compact, tone, selectable, defaultSelectedKeys, selectedKeys, onSelectionChange, actions, mobileMode, cardBreakpoint, renderCard, title, description, className, ...props }: DataGridProps<T>): import("react").JSX.Element;
