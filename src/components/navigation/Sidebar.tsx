import {
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { useAppLayout } from "./AppLayout";

export interface SidebarItem {
  id: string;
  label: ReactNode;
  href?: string;
  url?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  children?: SidebarItem[];
  defaultOpen?: boolean;
  active?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (item: SidebarItem) => void;
}

export interface SidebarProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  brand?: ReactNode;
  brandIcon?: ReactNode;
  brandHref?: string;
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  activeId?: string | null;
  defaultActiveId?: string | null;
  onActiveChange?: (activeId: string | null, item: SidebarItem | null) => void;
  openIds?: string[];
  defaultOpenIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
  header?: ReactNode;
  headerIcon?: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
  mobileLabel?: string;
  variant?: "shell" | "navigation";
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  showCollapseToggle?: boolean;
  collapseLabel?: string;
  expandLabel?: string;
  width?: string;
  collapsedWidth?: string;
  height?: string;
  minHeight?: string;
  background?: string;
  surfaceColor?: string;
  textColor?: string;
  mutedColor?: string;
  borderColor?: string;
  activeColor?: string;
  activeTextColor?: string;
}

export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: string;
}

export interface SidebarMobileProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids));
}

function collectDefaultOpenIds(items: SidebarItem[], result: string[] = []) {
  items.forEach((item) => {
    if (item.defaultOpen && item.children?.length) {
      result.push(item.id);
    }

    if (item.children?.length) {
      collectDefaultOpenIds(item.children, result);
    }
  });

  return result;
}

function findItemById(items: SidebarItem[], itemId: string): SidebarItem | null {
  for (const item of items) {
    if (item.id === itemId) return item;

    if (item.children?.length) {
      const match = findItemById(item.children, itemId);
      if (match) return match;
    }
  }

  return null;
}

function getItemText(item: SidebarItem) {
  if (typeof item.label === "string" && item.label.trim()) {
    return item.label.trim();
  }

  if (item.ariaLabel) return item.ariaLabel;

  return `Sidebar item ${item.id}`;
}

function hasActiveChild(item: SidebarItem, activeId: string | null): boolean {
  if (!activeId || !item.children?.length) {
    return false;
  }

  return item.children.some((child) => child.id === activeId || hasActiveChild(child, activeId));
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cx("rpc-sidebar__chevron", isOpen && "rpc-sidebar__chevron--open")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CollapseIcon({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M9 5v14" />
      <path d={isCollapsed ? "m14 9 3 3-3 3" : "m17 9-3 3 3 3"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SidebarTrigger({ className = "", icon, label = "Toggle sidebar", onClick, ...props }: SidebarTriggerProps) {
  const layout = useAppLayout();

  return (
    <button
      aria-label={label}
      aria-pressed={layout?.sidebarOpen}
      className={cx("rpc-sidebar-trigger", className)}
      onClick={(event) => {
        layout?.toggleSidebar();
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      {icon ?? <CollapseIcon isCollapsed={!layout?.sidebarOpen} />}
    </button>
  );
}

function SidebarMobile({ children, className = "", ...props }: SidebarMobileProps) {
  return (
    <div className={cx("rpc-sidebar-mobile", className)} {...props}>
      {children}
    </div>
  );
}

function renderBrand(brand: ReactNode, brandIcon: ReactNode, brandHref?: string) {
  const content = (
    <>
      {brandIcon ? <span className="rpc-sidebar__brand-icon">{brandIcon}</span> : null}
      {brand ? <span className="rpc-sidebar__brand-text">{brand}</span> : null}
    </>
  );

  if (brandHref) {
    return (
      <a className="rpc-sidebar__brand" href={brandHref}>
        {content}
      </a>
    );
  }

  return <div className="rpc-sidebar__brand">{content}</div>;
}

interface SidebarItemListProps {
  items: SidebarItem[];
  activeId: string | null;
  openSet: Set<string>;
  depth: number;
  isCollapsed: boolean;
  onActivate: (item: SidebarItem) => void;
  onToggle: (item: SidebarItem) => void;
}

function SidebarItemList({
  items,
  activeId,
  openSet,
  depth,
  isCollapsed,
  onActivate,
  onToggle
}: SidebarItemListProps) {
  return (
    <ul
      className={cx("rpc-sidebar__list", depth > 0 && "rpc-sidebar__list--nested")}
      role={depth === 0 ? "list" : "group"}
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = hasChildren && openSet.has(item.id);
        const isActive = activeId ? activeId === item.id || hasActiveChild(item, activeId) : Boolean(item.active);

        const itemClassName = cx(
          "rpc-sidebar__item",
          isActive && "rpc-sidebar__item--active",
          item.disabled && "rpc-sidebar__item--disabled",
          hasChildren && "rpc-sidebar__item--branch"
        );

        const content = (
          <>
            {item.icon ? <span className="rpc-sidebar__item-icon">{item.icon}</span> : null}
            <span className="rpc-sidebar__item-label">{item.label}</span>
            {item.badge ? <span className="rpc-sidebar__badge">{item.badge}</span> : null}
            {hasChildren ? <ChevronIcon isOpen={isOpen} /> : null}
          </>
        );

        return (
          <li
            className={cx(
              "rpc-sidebar__list-item",
              hasChildren && "rpc-sidebar__list-item--branch",
              isOpen && "rpc-sidebar__list-item--open",
              isActive && "rpc-sidebar__list-item--active"
            )}
            key={item.id}
          >
            {item.href || item.url ? (
              <a
                aria-current={isActive ? "page" : undefined}
                aria-disabled={item.disabled || undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
                aria-label={item.ariaLabel ?? getItemText(item)}
                className={itemClassName}
                href={item.disabled ? undefined : item.href ?? item.url}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                    return;
                  }

                  if (hasChildren) onToggle(item);
                  onActivate(item);
                }}
              >
                {content}
              </a>
            ) : (
              <button
                aria-current={isActive ? "page" : undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
                aria-label={item.ariaLabel ?? getItemText(item)}
                className={itemClassName}
                disabled={item.disabled}
                onClick={() => {
                  if (hasChildren) onToggle(item);
                  onActivate(item);
                }}
                type="button"
              >
                {content}
              </button>
            )}

            {hasChildren && (isOpen || isCollapsed) ? (
              <SidebarItemList
                activeId={activeId}
                depth={depth + 1}
                isCollapsed={isCollapsed}
                items={item.children ?? []}
                onActivate={onActivate}
                onToggle={onToggle}
                openSet={openSet}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function SidebarRoot({
  brand = "ava-ui",
  brandIcon,
  brandHref,
  items,
  footerItems = [],
  activeId,
  defaultActiveId = null,
  onActiveChange,
  openIds,
  defaultOpenIds = [],
  onOpenChange,
  header,
  headerIcon,
  children,
  ariaLabel = "Sidebar navigation",
  mobileLabel = "Open sidebar",
  variant = "shell",
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  showCollapseToggle = true,
  collapseLabel = "Hide sidebar",
  expandLabel = "Show sidebar",
  width = "320px",
  collapsedWidth = "72px",
  height = "auto",
  minHeight = "720px",
  background = "var(--rpc-color-background)",
  surfaceColor = "var(--rpc-color-surface)",
  textColor = "var(--rpc-color-text)",
  mutedColor = "var(--rpc-color-muted)",
  borderColor = "var(--rpc-color-border)",
  activeColor = "var(--rpc-color-secondary)",
  activeTextColor = "var(--rpc-color-text)",
  className = "",
  style,
  ...props
}: SidebarProps) {
  const mergedItems = useMemo(() => [...items, ...footerItems], [footerItems, items]);

  const firstActiveId = useMemo(
    () => activeId ?? defaultActiveId ?? mergedItems.find((item) => item.active)?.id ?? null,
    [activeId, defaultActiveId, mergedItems]
  );

  const defaultNestedOpenIds = useMemo(
    () => uniqueIds([...defaultOpenIds, ...collectDefaultOpenIds(mergedItems)]),
    [defaultOpenIds, mergedItems]
  );

  const [internalActiveId, setInternalActiveId] = useState<string | null>(firstActiveId);
  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultNestedOpenIds);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isActiveControlled = activeId !== undefined;
  const isOpenControlled = openIds !== undefined;
  const isCollapsedControlled = collapsed !== undefined;

  const currentActiveId = isActiveControlled ? activeId ?? null : internalActiveId;
  const currentOpenIds = isOpenControlled ? openIds ?? [] : internalOpenIds;
  const isCollapsed = isCollapsedControlled ? Boolean(collapsed) : internalCollapsed;

  const openSet = useMemo(() => new Set(currentOpenIds), [currentOpenIds]);

  useEffect(() => {
    if (!isActiveControlled && currentActiveId && !findItemById(mergedItems, currentActiveId)) {
      setInternalActiveId(defaultActiveId ?? null);
    }
  }, [currentActiveId, defaultActiveId, isActiveControlled, mergedItems]);

  const setNextOpenIds = (nextOpenIds: string[]) => {
    if (!isOpenControlled) {
      setInternalOpenIds(nextOpenIds);
    }

    onOpenChange?.(nextOpenIds);
  };

  const handleToggle = (item: SidebarItem) => {
    const nextOpenIds = openSet.has(item.id)
      ? currentOpenIds.filter((openId) => openId !== item.id)
      : [...currentOpenIds, item.id];

    setNextOpenIds(uniqueIds(nextOpenIds));
  };

  const handleCollapsedChange = (nextCollapsed: boolean) => {
    if (!isCollapsedControlled) {
      setInternalCollapsed(nextCollapsed);
    }

    onCollapsedChange?.(nextCollapsed);
  };

  const handleActivate = (item: SidebarItem) => {
    if (!isActiveControlled) {
      setInternalActiveId(item.id);
    }

    onActiveChange?.(item.id, item);
    item.onClick?.(item);
    setIsMobileOpen(false);
  };

  const sidebarStyle = {
    "--rpc-sidebar-active": activeColor,
    "--rpc-sidebar-active-text": activeTextColor,
    "--rpc-sidebar-bg": background,
    "--rpc-sidebar-border": borderColor,
    "--rpc-sidebar-muted": mutedColor,
    "--rpc-sidebar-surface": surfaceColor,
    "--rpc-sidebar-text": textColor,
    "--rpc-sidebar-width": width,
    "--rpc-sidebar-collapsed-width": collapsedWidth,
    "--rpc-sidebar-height": height,
    "--rpc-sidebar-min-height": minHeight,
    ...style
  } as CSSProperties;

  const sidebarContent = (
    <aside className="rpc-sidebar__panel" aria-label={ariaLabel}>
      <div className="rpc-sidebar__top">
        <div className="rpc-sidebar__panel-header">
          {renderBrand(brand, brandIcon, brandHref)}
          {showCollapseToggle ? (
            <button
              aria-label={isCollapsed ? expandLabel : collapseLabel}
              aria-pressed={isCollapsed}
              className="rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--panel"
              onClick={() => handleCollapsedChange(!isCollapsed)}
              type="button"
            >
              <CollapseIcon isCollapsed={isCollapsed} />
            </button>
          ) : null}
        </div>

        <nav className="rpc-sidebar__nav" aria-label={ariaLabel}>
          <SidebarItemList
            activeId={currentActiveId}
            depth={0}
            isCollapsed={isCollapsed}
            items={items}
            onActivate={handleActivate}
            onToggle={handleToggle}
            openSet={openSet}
          />
        </nav>
      </div>

      {footerItems.length ? (
        <nav className="rpc-sidebar__footer" aria-label={`${ariaLabel} footer`}>
          <SidebarItemList
            activeId={currentActiveId}
            depth={0}
            isCollapsed={isCollapsed}
            items={footerItems}
            onActivate={handleActivate}
            onToggle={handleToggle}
            openSet={openSet}
          />
        </nav>
      ) : null}
    </aside>
  );

  if (variant === "navigation") {
    return (
      <div
        className={cx(
          "rpc-sidebar",
          "rpc-sidebar--navigation",
          isCollapsed && "rpc-sidebar--collapsed",
          className
        )}
        style={sidebarStyle}
        {...props}
      >
        {sidebarContent}
      </div>
    );
  }

  return (
    <div
      className={cx(
        "rpc-sidebar",
        isMobileOpen && "rpc-sidebar--mobile-open",
        isCollapsed && "rpc-sidebar--collapsed",
        className
      )}
      style={sidebarStyle}
      {...props}
    >
      <div
        className="rpc-sidebar__mobile-overlay"
        onClick={() => setIsMobileOpen(false)}
        role="presentation"
      />

      {sidebarContent}

      <main className="rpc-sidebar__content">
        <header className="rpc-sidebar__content-header">
          <button
            className="rpc-sidebar__mobile-trigger"
            onClick={() => setIsMobileOpen(true)}
            type="button"
          >
            <MenuIcon />
            <span className="rpc-sr-only">{mobileLabel}</span>
          </button>
          {showCollapseToggle ? (
            <button
              aria-label={isCollapsed ? expandLabel : collapseLabel}
              aria-pressed={isCollapsed}
              className="rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--content"
              onClick={() => handleCollapsedChange(!isCollapsed)}
              type="button"
            >
              <CollapseIcon isCollapsed={isCollapsed} />
            </button>
          ) : null}

          {headerIcon ? <span className="rpc-sidebar__content-icon">{headerIcon}</span> : null}
          {header ? <div className="rpc-sidebar__content-title">{header}</div> : null}
        </header>

        <div className="rpc-sidebar__content-body">{children}</div>
      </main>
    </div>
  );
}

export const Sidebar = Object.assign(SidebarRoot, {
  Mobile: SidebarMobile,
  Trigger: SidebarTrigger
});
