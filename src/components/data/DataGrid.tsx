import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode
} from "react";

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

export type DataGridAuthConfig =
  | {
      type: "bearer";
      token: string;
    }
  | {
      type: "basic";
      username: string;
      password: string;
    }
  | {
      type: "apiKey";
      key: string;
      value: string;
      in?: "header" | "query";
    }
  | {
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

interface ResolvedPayload<T> {
  rows: T[];
  total: number;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getValueByPath<T>(row: T, key?: keyof T & string) {
  if (!key) {
    return undefined;
  }

  return row[key];
}

function compareValues(a: unknown, b: unknown) {
  if (a === b) {
    return 0;
  }

  if (a == null) {
    return 1;
  }

  if (b == null) {
    return -1;
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
}

function getDefaultRowKey<T>(row: T, index: number) {
  const candidate = row as { id?: string | number };

  if (candidate.id !== undefined && candidate.id !== null) {
    return String(candidate.id);
  }

  return String(index);
}

function getResolvedRows<T>(result: DataGridResponse<T> | T[]): ResolvedPayload<T> {
  if (Array.isArray(result)) {
    return { rows: result, total: result.length };
  }

  return {
    rows: result.data ?? [],
    total: result.total ?? result.data?.length ?? 0
  };
}

function getByPath(payload: unknown, path?: string) {
  if (!path) {
    return undefined;
  }

  return path.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, payload);
}

function getEndpointUrl<T>(endpoint: string | DataGridEndpointConfig<T>) {
  return typeof endpoint === "string" ? endpoint : endpoint.url;
}

function getEndpointMethod<T>(endpoint: string | DataGridEndpointConfig<T>) {
  return typeof endpoint === "string" ? "GET" : endpoint.method ?? "GET";
}

function getEndpointAuth<T>(endpoint: string | DataGridEndpointConfig<T>) {
  return typeof endpoint === "string" ? undefined : endpoint.auth;
}

function getEndpointHeaders<T>(endpoint: string | DataGridEndpointConfig<T>) {
  return typeof endpoint === "string" ? undefined : endpoint.headers;
}

function buildAuthHeaders(auth?: DataGridAuthConfig) {
  if (!auth) {
    return {};
  }

  if (auth.type === "bearer") {
    return { Authorization: `Bearer ${auth.token}` };
  }

  if (auth.type === "basic") {
    return { Authorization: `Basic ${window.btoa(`${auth.username}:${auth.password}`)}` };
  }

  if (auth.type === "apiKey" && (auth.in ?? "header") === "header") {
    return { [auth.key]: auth.value };
  }

  if (auth.type === "custom") {
    return auth.headers;
  }

  return {};
}

function resolveEndpointPayload<T>(payload: unknown, endpoint: string | DataGridEndpointConfig<T>) {
  if (typeof endpoint !== "string" && endpoint.responseMapper) {
    return endpoint.responseMapper(payload);
  }

  if (Array.isArray(payload)) {
    return payload as T[];
  }

  const dataPath = typeof endpoint === "string" ? undefined : endpoint.dataPath;
  const totalPath = typeof endpoint === "string" ? undefined : endpoint.totalPath;
  const rows = dataPath ? getByPath(payload, dataPath) : getByPath(payload, "data") ?? getByPath(payload, "items");
  const total = totalPath ? getByPath(payload, totalPath) : getByPath(payload, "total") ?? getByPath(payload, "meta.total");

  return {
    data: Array.isArray(rows) ? (rows as T[]) : [],
    total: typeof total === "number" ? total : Array.isArray(rows) ? rows.length : 0
  };
}

function buildRemoteUrl<T>(endpoint: string | DataGridEndpointConfig<T>, query: DataGridQuery) {
  const url = new URL(getEndpointUrl(endpoint), window.location.href);
  const auth = getEndpointAuth(endpoint);
  const defaultParams =
    typeof endpoint === "string" || !endpoint.queryParams
      ? {
          page: query.page,
          pageSize: query.pageSize,
          sortBy: query.sortBy,
          sortDirection: query.sortDirection,
          search: query.search,
          filters: query.filters ? JSON.stringify(query.filters) : undefined,
          visibleColumns: query.visibleColumns?.join(",")
        }
      : endpoint.queryParams(query);

  Object.entries(defaultParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      url.searchParams.delete(key);
      value.forEach((entry) => {
        url.searchParams.append(key, String(entry));
      });
      return;
    }

    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  if (auth?.type === "apiKey" && (auth.in ?? "header") === "query") {
    url.searchParams.set(auth.key, auth.value);
  }

  return url.toString();
}

function buildRequestInit<T>(
  endpoint: string | DataGridEndpointConfig<T>,
  query: DataGridQuery,
  requestInit?: RequestInit
): RequestInit {
  const method = getEndpointMethod(endpoint);
  const headers = new Headers(requestInit?.headers);
  const endpointHeaders = getEndpointHeaders(endpoint);
  const authHeaders = buildAuthHeaders(getEndpointAuth(endpoint));

  Object.entries(endpointHeaders ?? {}).forEach(([key, value]) => {
    headers.set(key, value);
  });

  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const init: RequestInit = {
    ...requestInit,
    headers,
    method
  };

  if (typeof endpoint !== "string" && endpoint.body) {
    const body = endpoint.body(query);

    if (body !== undefined) {
      headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
      init.body = typeof body === "string" ? body : JSON.stringify(body);
    }
  }

  return init;
}

function GridCheckbox({
  indeterminate,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return <input ref={inputRef} type="checkbox" className="rpc-datagrid__checkbox" {...props} />;
}

function isNamedActionColor(value: string) {
  return ["default", "primary", "success", "warning", "danger"].includes(value);
}

export function DataGrid<T>({
  columns,
  data = [],
  endpoint,
  fetchData,
  requestInit,
  pageSize = 8,
  pageSizeOptions = [5, 8, 12, 20],
  initialSortBy,
  initialSortDirection = "ascending",
  searchable = true,
  searchPlaceholder = "Search...",
  initialSearch = "",
  onSearchChange,
  filters = [],
  initialFilters = {},
  onFiltersChange,
  columnVisibility = true,
  defaultVisibleColumns,
  visibleColumns,
  onVisibleColumnsChange,
  emptyState = "No data available.",
  loadingState = "Loading data...",
  errorState = "Failed to load data.",
  getRowKey = getDefaultRowKey,
  onRowClick,
  striped = true,
  hoverable = true,
  compact = false,
  tone = "dark",
  selectable = false,
  defaultSelectedKeys = [],
  selectedKeys,
  onSelectionChange,
  actions = [],
  mobileMode = "auto",
  cardBreakpoint = "tablet",
  renderCard,
  title,
  description,
  className = "",
  ...props
}: DataGridProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState<DataGridSortDirection | undefined>(
    initialSortDirection && initialSortBy ? initialSortDirection : undefined
  );
  const [remoteRows, setRemoteRows] = useState<T[]>([]);
  const [remoteTotal, setRemoteTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(Boolean(endpoint || fetchData));
  const [error, setError] = useState<Error | null>(null);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [search, setSearch] = useState(initialSearch);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(initialFilters);
  const [internalVisibleColumns, setInternalVisibleColumns] = useState(
    defaultVisibleColumns ?? columns.map((column) => column.id)
  );
  const [openActionKey, setOpenActionKey] = useState<string | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const isRemote = Boolean(endpoint || fetchData);
  const resolvedSelectedKeys = selectedKeys ?? internalSelectedKeys;
  const selectedSet = useMemo(() => new Set(resolvedSelectedKeys), [resolvedSelectedKeys]);
  const resolvedVisibleColumns = visibleColumns ?? internalVisibleColumns;
  const visibleColumnSet = useMemo(() => new Set(resolvedVisibleColumns), [resolvedVisibleColumns]);
  const displayColumns = useMemo(
    () => columns.filter((column) => visibleColumnSet.has(column.id)),
    [columns, visibleColumnSet]
  );

  useEffect(() => {
    setPageSizeState(pageSize);
  }, [pageSize]);

  useEffect(() => {
    if (!initialSortBy) {
      return;
    }

    setSortBy(initialSortBy);
    setSortDirection(initialSortDirection);
  }, [initialSortBy, initialSortDirection]);

  useEffect(() => {
    setPage(1);
  }, [data, endpoint, fetchData, search, activeFilters, resolvedVisibleColumns]);

  useEffect(() => {
    if (!isRemote) {
      return;
    }

    const controller = new AbortController();
    let active = true;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const query: DataGridQuery = {
          page,
          pageSize: pageSizeState,
          sortBy,
          sortDirection,
          search,
          filters: activeFilters,
          visibleColumns: resolvedVisibleColumns
        };

        const payload = fetchData
          ? await fetchData(query)
          : await fetch(buildRemoteUrl(endpoint!, query), {
              ...buildRequestInit(endpoint!, query, requestInit),
              signal: controller.signal
            }).then(async (response) => {
              if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
              }

              const payload = (await response.json()) as unknown;

              return resolveEndpointPayload(payload, endpoint!);
            });

        const resolved = getResolvedRows(payload);

        if (!active) {
          return;
        }

        setRemoteRows(resolved.rows);
        setRemoteTotal(resolved.total);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError : new Error("Unknown error"));
        setRemoteRows([]);
        setRemoteTotal(0);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    activeFilters,
    endpoint,
    fetchData,
    isRemote,
    page,
    pageSizeState,
    requestInit,
    resolvedVisibleColumns,
    search,
    sortBy,
    sortDirection
  ]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setOpenActionKey(null);
        setIsFilterMenuOpen(false);
        setIsColumnMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenActionKey(null);
        setIsFilterMenuOpen(false);
        setIsColumnMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const filteredLocalRows = useMemo(() => {
    if (isRemote) {
      return data;
    }

    const searchableColumns = columns.filter((column) => column.searchable !== false);
    const normalizedSearch = search.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch =
        !normalizedSearch ||
        searchableColumns.some((column) => {
          const value = getValueByPath(row, column.accessorKey ?? (column.id as keyof T & string));
          return String(value ?? "").toLowerCase().includes(normalizedSearch);
        });

      const matchesFilters = filters.every((filter) => {
        const selectedValues = activeFilters[filter.id] ?? [];

        if (selectedValues.length === 0) {
          return true;
        }

        const value = getValueByPath(row, filter.accessorKey ?? (filter.id as keyof T & string));
        return selectedValues.includes(String(value ?? ""));
      });

      return matchesSearch && matchesFilters;
    });
  }, [activeFilters, columns, data, filters, isRemote, search]);

  const sortedLocalRows = useMemo(() => {
    if (isRemote || !sortBy || !sortDirection) {
      return filteredLocalRows;
    }

    const column = columns.find((entry) => entry.id === sortBy);

    if (!column) {
      return filteredLocalRows;
    }

    const accessorKey = column.accessorKey ?? (column.id as keyof T & string);

    return [...filteredLocalRows].sort((left, right) => {
      const result = compareValues(getValueByPath(left, accessorKey), getValueByPath(right, accessorKey));

      return sortDirection === "ascending" ? result : -result;
    });
  }, [columns, filteredLocalRows, isRemote, sortBy, sortDirection]);

  const total = isRemote ? remoteTotal : sortedLocalRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSizeState));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (safePage !== page) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const visibleRows = isRemote
    ? remoteRows
    : sortedLocalRows.slice((safePage - 1) * pageSizeState, safePage * pageSizeState);

  const visibleRowKeys = useMemo(
    () => visibleRows.map((row, rowIndex) => getRowKey(row, rowIndex)),
    [getRowKey, visibleRows]
  );

  const allVisibleSelected = selectable && visibleRowKeys.length > 0 && visibleRowKeys.every((key) => selectedSet.has(key));
  const someVisibleSelected =
    selectable && visibleRowKeys.some((key) => selectedSet.has(key)) && !allVisibleSelected;

  const getSelectedRowsForKeys = (keys: string[]) => {
    const nextSet = new Set(keys);
    return visibleRows.filter((row, rowIndex) => nextSet.has(getRowKey(row, rowIndex)));
  };

  const updateSelectedKeys = (nextKeys: string[]) => {
    if (selectedKeys === undefined) {
      setInternalSelectedKeys(nextKeys);
    }

    onSelectionChange?.(nextKeys, getSelectedRowsForKeys(nextKeys));
  };

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    onSearchChange?.(value);
  };

  const updateFilter = (filterId: string, value: string) => {
    const currentValues = activeFilters[filterId] ?? [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((entry) => entry !== value)
      : [...currentValues, value];
    const nextFilters = {
      ...activeFilters,
      [filterId]: nextValues
    };

    if (nextValues.length === 0) {
      delete nextFilters[filterId];
    }

    setActiveFilters(nextFilters);
    setPage(1);
    onFiltersChange?.(nextFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setPage(1);
    onFiltersChange?.({});
  };

  const updateVisibleColumns = (nextColumns: string[]) => {
    if (visibleColumns === undefined) {
      setInternalVisibleColumns(nextColumns);
    }

    onVisibleColumnsChange?.(nextColumns);
  };

  const toggleColumnVisibility = (columnId: string) => {
    const nextColumns = visibleColumnSet.has(columnId)
      ? resolvedVisibleColumns.filter((id) => id !== columnId)
      : [...resolvedVisibleColumns, columnId];

    updateVisibleColumns(nextColumns.length ? nextColumns : [columnId]);
  };

  const toggleSelectRow = (row: T, rowIndex: number) => {
    const key = getRowKey(row, rowIndex);
    const nextKeys = selectedSet.has(key)
      ? resolvedSelectedKeys.filter((value) => value !== key)
      : [...resolvedSelectedKeys, key];

    updateSelectedKeys(nextKeys);
  };

  const toggleSelectAllVisible = () => {
    if (!selectable) {
      return;
    }

    const nextKeys = allVisibleSelected
      ? resolvedSelectedKeys.filter((key) => !visibleRowKeys.includes(key))
      : Array.from(new Set([...resolvedSelectedKeys, ...visibleRowKeys]));

    updateSelectedKeys(nextKeys);
  };

  const toggleSort = (column: DataGridColumn<T>) => {
    if (!column.allowsSorting) {
      return;
    }

    const nextSortBy = column.id;
    let nextSortDirection: DataGridSortDirection = "ascending";

    if (sortBy === nextSortBy) {
      nextSortDirection = sortDirection === "ascending" ? "descending" : "ascending";
    }

    setSortBy(nextSortBy);
    setSortDirection(nextSortDirection);
    setPage(1);
  };

  const renderHeader = (column: DataGridColumn<T>) => {
    const isSorted = sortBy === column.id;
    const context: DataGridHeaderContext<T> = {
      column,
      isSorted,
      sortDirection: isSorted ? sortDirection : undefined
    };

    return typeof column.header === "function" ? column.header(context) : column.header;
  };

  const statusNode = (() => {
    if (error) {
      return typeof errorState === "function" ? errorState(error) : errorState;
    }

    if (isLoading) {
      return loadingState;
    }

    if (!visibleRows.length) {
      return emptyState;
    }

    return null;
  })();

  const pageStart = total === 0 ? 0 : (safePage - 1) * pageSizeState + 1;
  const pageEnd = total === 0 ? 0 : Math.min(safePage * pageSizeState, total);

  const baseColumnCount = displayColumns.length + (selectable ? 1 : 0) + (actions.length ? 1 : 0);
  const activeFilterCount = Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
  const shouldRenderCards = mobileMode !== "table";

  const renderDefaultCard = (row: T, rowIndex: number) => {
    const rowKey = getRowKey(row, rowIndex);
    const isRowSelected = selectedSet.has(rowKey);
    const isActionOpen = openActionKey === rowKey;
    const rowHeaderColumn = displayColumns.find((column) => column.isRowHeader) ?? displayColumns[0];
    const rowHeader = rowHeaderColumn
      ? rowHeaderColumn.cell
        ? rowHeaderColumn.cell(row, rowIndex)
        : String(getValueByPath(row, rowHeaderColumn.accessorKey ?? (rowHeaderColumn.id as keyof T & string)) ?? "")
      : null;
    const detailColumns = displayColumns.filter((column) => column.id !== rowHeaderColumn?.id);

    return (
      <article
        className={cx("rpc-datagrid-card", isRowSelected && "rpc-datagrid-card--selected")}
        key={rowKey}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
      >
        <div className="rpc-datagrid-card__header">
          {selectable ? (
            <div className="rpc-datagrid-card__select" onClick={(event) => event.stopPropagation()}>
              <GridCheckbox
                aria-label={`Select card ${rowIndex + 1}`}
                checked={isRowSelected}
                onChange={() => toggleSelectRow(row, rowIndex)}
              />
            </div>
          ) : null}
          <div className="rpc-datagrid-card__title">{rowHeader}</div>
          {actions.length ? (
            <div className="rpc-datagrid-card__actions" onClick={(event) => event.stopPropagation()}>
              <button
                aria-expanded={isActionOpen}
                aria-label={`Open actions for ${rowKey}`}
                className="rpc-datagrid__action-trigger"
                onClick={() => setOpenActionKey((current) => (current === rowKey ? null : rowKey))}
                type="button"
              >
                <span aria-hidden="true" className="rpc-datagrid__dots">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              {isActionOpen ? (
                <div className="rpc-datagrid__action-menu" role="menu">
                  {actions.map((action) => {
                    const iconClass =
                      typeof action.color === "string" && isNamedActionColor(action.color)
                        ? `rpc-datagrid__action-item--${action.color}`
                        : "";
                    const iconStyle =
                      typeof action.color === "string" && !isNamedActionColor(action.color)
                        ? { color: action.color }
                        : undefined;

                    return (
                      <button
                        className={cx("rpc-datagrid__action-item", iconClass, action.disabled && "rpc-datagrid__action-item--disabled")}
                        disabled={action.disabled}
                        key={action.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          action.onClick(row, rowIndex);
                          setOpenActionKey(null);
                        }}
                        role="menuitem"
                        style={iconStyle}
                        type="button"
                      >
                        {action.icon ? (
                          <span className="rpc-datagrid__action-icon" aria-hidden="true" style={iconStyle}>
                            {action.icon}
                          </span>
                        ) : null}
                        <span>{action.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <dl className="rpc-datagrid-card__fields">
          {detailColumns.map((column) => {
            const content = column.cell
              ? column.cell(row, rowIndex)
              : String(getValueByPath(row, column.accessorKey ?? (column.id as keyof T & string)) ?? "");

            return (
              <div className="rpc-datagrid-card__field" key={`${column.id}-${rowKey}`}>
                <dt>{typeof column.header === "string" ? column.header : column.id}</dt>
                <dd>{content}</dd>
              </div>
            );
          })}
        </dl>
      </article>
    );
  };

  return (
    <section
      ref={gridRef}
      className={cx(
        "rpc-datagrid",
        `rpc-datagrid--${tone}`,
        `rpc-datagrid--mobile-${mobileMode}`,
        `rpc-datagrid--card-${cardBreakpoint}`,
        compact && "rpc-datagrid--compact",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="rpc-datagrid__header">
          {title ? <h3 className="rpc-datagrid__title">{title}</h3> : null}
          {description ? <p className="rpc-datagrid__description">{description}</p> : null}
        </div>
      )}

      {(searchable || filters.length > 0 || columnVisibility) && (
        <div className="rpc-datagrid__toolbar">
          {filters.length > 0 ? (
            <div className="rpc-datagrid__filter-popover">
              <button
                aria-expanded={isFilterMenuOpen}
                className="rpc-datagrid__filter-trigger"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsFilterMenuOpen((value) => !value);
                }}
                type="button"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5h18l-7 8v5l-4 2v-7Z" />
                </svg>
                <span>Filter</span>
                {activeFilterCount > 0 ? <strong>{activeFilterCount}</strong> : null}
              </button>

              {isFilterMenuOpen ? (
                <div className="rpc-datagrid__filter-menu" onClick={(event) => event.stopPropagation()}>
                  <div className="rpc-datagrid__filter-menu-header">
                    <strong>Filter by</strong>
                    {activeFilterCount > 0 ? (
                      <button onClick={clearFilters} type="button">
                        Clear
                      </button>
                    ) : null}
                  </div>

                  {filters.map((filter) => (
                    <fieldset className="rpc-datagrid__filter-group" key={filter.id}>
                      <legend>{filter.label}</legend>
                      {filter.options.map((option) => (
                        <label className="rpc-datagrid__filter-option" key={option.id}>
                          <input
                            checked={(activeFilters[filter.id] ?? []).includes(option.value)}
                            onChange={() => updateFilter(filter.id, option.value)}
                            type="checkbox"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </fieldset>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {filters.length > 0 && searchable ? <span className="rpc-datagrid__toolbar-divider" /> : null}

          {searchable ? (
            <label className="rpc-datagrid__search">
              <span className="rpc-sr-only">Search rows</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                className="rpc-datagrid__search-input"
                onChange={(event) => updateSearch(event.target.value)}
                placeholder={searchPlaceholder}
                type="search"
                value={search}
              />
            </label>
          ) : null}

          {columnVisibility ? (
            <div className="rpc-datagrid__columns">
              <button
                aria-expanded={isColumnMenuOpen}
                className="rpc-datagrid__columns-trigger"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsColumnMenuOpen((value) => !value);
                }}
                type="button"
              >
                Columns
              </button>

              {isColumnMenuOpen ? (
                <div className="rpc-datagrid__columns-menu" onClick={(event) => event.stopPropagation()}>
                  {columns
                    .filter((column) => column.hideable !== false)
                    .map((column) => (
                      <label className="rpc-datagrid__columns-option" key={column.id}>
                        <input
                          checked={visibleColumnSet.has(column.id)}
                          onChange={() => toggleColumnVisibility(column.id)}
                          type="checkbox"
                        />
                        <span>{typeof column.header === "string" ? column.header : column.id}</span>
                      </label>
                    ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )}

      <div className="rpc-datagrid__table-wrap">
        <table
          className={cx(
            "rpc-datagrid__table",
            hoverable && "rpc-datagrid__table--hoverable",
            striped && "rpc-datagrid__table--striped"
          )}
        >
          <thead>
            <tr>
              {selectable ? (
                <th className="rpc-datagrid__th rpc-datagrid__th--select" scope="col">
                  <GridCheckbox
                    aria-label="Select all rows"
                    checked={Boolean(allVisibleSelected)}
                    indeterminate={someVisibleSelected}
                    onChange={toggleSelectAllVisible}
                  />
                </th>
              ) : null}

              {displayColumns.map((column) => {
                const isSorted = sortBy === column.id;
                const ariaSort = isSorted ? sortDirection ?? "ascending" : "none";

                return (
                  <th
                    aria-sort={column.allowsSorting ? ariaSort : undefined}
                    className={cx("rpc-datagrid__th", column.className, column.align && `rpc-datagrid__cell--${column.align}`)}
                    key={column.id}
                    scope="col"
                    style={column.width ? { width: typeof column.width === "number" ? `${column.width}px` : column.width } : undefined}
                  >
                    {column.allowsSorting ? (
                      <button className="rpc-datagrid__sort-button" onClick={() => toggleSort(column)} type="button">
                        <span>{renderHeader(column)}</span>
                        <span className="rpc-datagrid__sort-indicator" aria-hidden="true">
                          {isSorted ? (sortDirection === "ascending" ? "↑" : "↓") : "↕"}
                        </span>
                      </button>
                    ) : (
                      renderHeader(column)
                    )}
                  </th>
                );
              })}

              {actions.length ? (
                <th className="rpc-datagrid__th rpc-datagrid__th--actions" scope="col">
                  <span className="rpc-sr-only">Actions</span>
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {statusNode ? (
              <tr>
                <td className="rpc-datagrid__status" colSpan={baseColumnCount}>
                  {statusNode}
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rowIndex) => {
                const rowKey = getRowKey(row, rowIndex);
                const isRowSelected = selectedSet.has(rowKey);
                const isActionOpen = openActionKey === rowKey;

                return (
                  <tr
                    className={cx("rpc-datagrid__row", isRowSelected && "rpc-datagrid__row--selected")}
                    key={rowKey}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {selectable ? (
                      <td className="rpc-datagrid__cell rpc-datagrid__cell--select" onClick={(event) => event.stopPropagation()}>
                        <GridCheckbox
                          aria-label={`Select row ${rowIndex + 1}`}
                          checked={isRowSelected}
                          onChange={() => toggleSelectRow(row, rowIndex)}
                        />
                      </td>
                    ) : null}

                    {displayColumns.map((column, columnIndex) => {
                      const content = column.cell
                        ? column.cell(row, rowIndex)
                        : String(getValueByPath(row, column.accessorKey ?? (column.id as keyof T & string)) ?? "");

                      if (column.isRowHeader || columnIndex === 0) {
                        return (
                          <th
                            className={cx(
                              "rpc-datagrid__cell",
                              column.className,
                              column.align && `rpc-datagrid__cell--${column.align}`,
                              "rpc-datagrid__cell--row-header"
                            )}
                            key={`${column.id}-${rowKey}`}
                            scope="row"
                          >
                            {content}
                          </th>
                        );
                      }

                      return (
                        <td
                          className={cx(
                            "rpc-datagrid__cell",
                            column.className,
                            column.align && `rpc-datagrid__cell--${column.align}`
                          )}
                          key={`${column.id}-${rowKey}`}
                        >
                          {content}
                        </td>
                      );
                    })}

                    {actions.length ? (
                      <td className="rpc-datagrid__cell rpc-datagrid__cell--actions" onClick={(event) => event.stopPropagation()}>
                        <button
                          aria-expanded={isActionOpen}
                          aria-label={`Open actions for ${rowKey}`}
                          className="rpc-datagrid__action-trigger"
                          onClick={() => setOpenActionKey((current) => (current === rowKey ? null : rowKey))}
                          type="button"
                        >
                          <span aria-hidden="true" className="rpc-datagrid__dots">
                            <span />
                            <span />
                            <span />
                          </span>
                        </button>

                        {isActionOpen ? (
                          <div className="rpc-datagrid__action-menu" role="menu">
                            {actions.map((action) => {
                              const iconClass =
                                typeof action.color === "string" && isNamedActionColor(action.color)
                                  ? `rpc-datagrid__action-item--${action.color}`
                                  : "";
                              const iconStyle =
                                typeof action.color === "string" && !isNamedActionColor(action.color)
                                  ? { color: action.color }
                                  : undefined;

                              return (
                                <button
                                  className={cx("rpc-datagrid__action-item", iconClass, action.disabled && "rpc-datagrid__action-item--disabled")}
                                  disabled={action.disabled}
                                  style={iconStyle}
                                  key={action.id}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    action.onClick(row, rowIndex);
                                    setOpenActionKey(null);
                                  }}
                                  role="menuitem"
                                  type="button"
                                >
                                  {action.icon ? (
                                    <span className="rpc-datagrid__action-icon" aria-hidden="true" style={iconStyle}>
                                      {action.icon}
                                    </span>
                                  ) : null}
                                  <span>{action.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : null}
                      </td>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {shouldRenderCards ? (
        <div className="rpc-datagrid__cards">
          {statusNode ? (
            <div className="rpc-datagrid__status">{statusNode}</div>
          ) : (
            visibleRows.map((row, rowIndex) => (
              <div className="rpc-datagrid__card-shell" key={getRowKey(row, rowIndex)}>
                {renderCard ? renderCard(row, rowIndex) : renderDefaultCard(row, rowIndex)}
              </div>
            ))
          )}
        </div>
      ) : null}

      <div className="rpc-datagrid__footer">
        <div className="rpc-datagrid__summary">
          {total > 0 ? (
            <span>
              Showing {pageStart} to {pageEnd} of {total}
            </span>
          ) : (
            <span>Showing 0 rows</span>
          )}
        </div>

        <div className="rpc-datagrid__pagination">
          <label className="rpc-datagrid__page-size">
            <span>Rows</span>
            <select
              className="rpc-datagrid__select"
              value={pageSizeState}
              onChange={(event) => {
                setPageSizeState(Number(event.target.value));
                setPage(1);
              }}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="rpc-datagrid__pager">
            <button
              className="rpc-datagrid__pager-button"
              disabled={safePage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              type="button"
            >
              Previous
            </button>
            <span className="rpc-datagrid__pager-info">
              Page {safePage} of {totalPages}
            </span>
            <button
              className="rpc-datagrid__pager-button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
