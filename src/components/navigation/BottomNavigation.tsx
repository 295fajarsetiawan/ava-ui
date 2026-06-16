import { useEffect, useMemo, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

export interface BottomNavigationItem {
  id: string;
  name: ReactNode;
  href?: string;
  url?: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface BottomNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  items: BottomNavigationItem[];
  activeId?: string | null;
  defaultActiveId?: string | null;
  onActiveChange?: (activeId: string | null, item: BottomNavigationItem | null) => void;
  ariaLabel?: string;
  showLabels?: boolean;
  placement?: "inline" | "fixed";
  maxWidth?: string;
  background?: string;
  borderColor?: string;
  textColor?: string;
  mutedColor?: string;
  activeColor?: string;
  activeTextColor?: string;
  className?: string;
  style?: CSSProperties;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function DefaultItemIcon({ label }: { label: ReactNode }) {
  const fallback = typeof label === "string" && label.trim() ? label.trim().slice(0, 1).toUpperCase() : "•";

  return <span aria-hidden="true" className="rpc-bottom-nav__fallback-icon">{fallback}</span>;
}

function getItemLabel(item: BottomNavigationItem) {
  if (typeof item.name === "string" && item.name.trim()) {
    return item.name.trim();
  }

  if (typeof item.ariaLabel === "string" && item.ariaLabel.trim()) {
    return item.ariaLabel.trim();
  }

  return `Navigation item ${item.id}`;
}

export function BottomNavigation({
  items,
  activeId,
  defaultActiveId = null,
  onActiveChange,
  ariaLabel = "Bottom navigation",
  showLabels = true,
  placement = "inline",
  maxWidth = "720px",
  background = "var(--rpc-color-surface)",
  borderColor = "var(--rpc-color-border)",
  textColor = "var(--rpc-color-text)",
  mutedColor = "var(--rpc-color-muted)",
  activeColor = "var(--rpc-color-primary)",
  activeTextColor = "#ffffff",
  className = "",
  style,
  ...props
}: BottomNavigationProps) {
  const initialActiveId = useMemo(
    () => activeId ?? defaultActiveId ?? items.find((item) => item.active)?.id ?? null,
    [activeId, defaultActiveId, items]
  );
  const [internalActiveId, setInternalActiveId] = useState<string | null>(initialActiveId);
  const isControlled = activeId !== undefined;
  const currentActiveId = isControlled ? activeId ?? null : internalActiveId;

  useEffect(() => {
    if (!isControlled && currentActiveId && !items.some((item) => item.id === currentActiveId)) {
      const nextActiveId = defaultActiveId ?? items.find((item) => item.active)?.id ?? null;
      setInternalActiveId(nextActiveId);
    }
  }, [currentActiveId, defaultActiveId, isControlled, items]);

  const handleActivate = (item: BottomNavigationItem) => {
    if (!isControlled) {
      setInternalActiveId(item.id);
    }

    onActiveChange?.(item.id, item);
    item.onClick?.();
  };

  const bottomNavStyle = {
    "--rpc-bottom-nav-active": activeColor,
    "--rpc-bottom-nav-active-text": activeTextColor,
    "--rpc-bottom-nav-bg": background,
    "--rpc-bottom-nav-border": borderColor,
    "--rpc-bottom-nav-max-width": maxWidth,
    "--rpc-bottom-nav-muted": mutedColor,
    "--rpc-bottom-nav-text": textColor,
    ...style
  } as CSSProperties;

  return (
    <nav
      aria-label={ariaLabel}
      className={cx("rpc-bottom-nav", placement === "fixed" && "rpc-bottom-nav--fixed", className)}
      style={bottomNavStyle}
      {...props}
    >
      <ul className="rpc-bottom-nav__list">
        {items.map((item) => {
          const isActive = currentActiveId === item.id;
          const label = getItemLabel(item);
          const sharedClassName = cx(
            "rpc-bottom-nav__item",
            isActive && "rpc-bottom-nav__item--active",
            item.disabled && "rpc-bottom-nav__item--disabled"
          );
          const icon = isActive ? item.activeIcon ?? <PlusIcon /> : item.icon ?? <DefaultItemIcon label={item.name} />;
          const ariaLabel = item.ariaLabel ?? label;
          const showLabel = showLabels && !isActive;

          if (item.href || item.url) {
            const href = item.href ?? item.url ?? "#";

            return (
              <li className="rpc-bottom-nav__item-wrap" key={item.id}>
                <a
                  aria-current={isActive ? "page" : undefined}
                  aria-label={ariaLabel}
                  className={sharedClassName}
                  href={item.disabled ? undefined : href}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault();
                      return;
                    }

                    handleActivate(item);
                  }}
                >
                  <span className="rpc-bottom-nav__icon">{icon}</span>
                  {showLabel ? <span className="rpc-bottom-nav__label">{item.name}</span> : <span className="rpc-sr-only">{label}</span>}
                </a>
              </li>
            );
          }

          return (
            <li className="rpc-bottom-nav__item-wrap" key={item.id}>
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={ariaLabel}
                className={sharedClassName}
                disabled={item.disabled}
                onClick={() => handleActivate(item)}
                type="button"
              >
                <span className="rpc-bottom-nav__icon">{icon}</span>
                {showLabel ? <span className="rpc-bottom-nav__label">{item.name}</span> : <span className="rpc-sr-only">{label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
