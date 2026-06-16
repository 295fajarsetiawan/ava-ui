import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface AppLayoutContextValue {
  asideOpen: boolean;
  closeAside: () => void;
  closeSidebar: () => void;
  openAside: () => void;
  openSidebar: () => void;
  sidebarOpen: boolean;
  toggleAside: () => void;
  toggleSidebar: () => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null);

export function useAppLayout() {
  return useContext(AppLayoutContext);
}

export interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  aside?: ReactNode;
  asideOpen?: boolean;
  asideWidth?: string;
  children: ReactNode;
  defaultAsideOpen?: boolean;
  defaultSidebarOpen?: boolean;
  navbar?: ReactNode;
  navbarHeight?: string;
  onAsideOpenChange?: (open: boolean) => void;
  onSidebarOpenChange?: (open: boolean) => void;
  sidebar?: ReactNode;
  sidebarOpen?: boolean;
  sidebarWidth?: string;
}

export interface AppLayoutTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M15 5v14" />
    </svg>
  );
}

function AppLayoutRoot({
  aside,
  asideOpen,
  asideWidth = "320px",
  children,
  className = "",
  defaultAsideOpen = false,
  defaultSidebarOpen = true,
  navbar,
  navbarHeight = "64px",
  onAsideOpenChange,
  onSidebarOpenChange,
  sidebar,
  sidebarOpen,
  sidebarWidth = "280px",
  style,
  ...props
}: AppLayoutProps) {
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(defaultSidebarOpen);
  const [internalAsideOpen, setInternalAsideOpen] = useState(defaultAsideOpen);
  const isSidebarControlled = sidebarOpen !== undefined;
  const isAsideControlled = asideOpen !== undefined;
  const currentSidebarOpen = isSidebarControlled ? Boolean(sidebarOpen) : internalSidebarOpen;
  const currentAsideOpen = isAsideControlled ? Boolean(asideOpen) : internalAsideOpen;

  const setSidebarOpen = (nextOpen: boolean) => {
    if (!isSidebarControlled) setInternalSidebarOpen(nextOpen);
    onSidebarOpenChange?.(nextOpen);
  };

  const setAsideOpen = (nextOpen: boolean) => {
    if (!isAsideControlled) setInternalAsideOpen(nextOpen);
    onAsideOpenChange?.(nextOpen);
  };

  const contextValue = useMemo<AppLayoutContextValue>(
    () => ({
      asideOpen: currentAsideOpen,
      closeAside: () => setAsideOpen(false),
      closeSidebar: () => setSidebarOpen(false),
      openAside: () => setAsideOpen(true),
      openSidebar: () => setSidebarOpen(true),
      sidebarOpen: currentSidebarOpen,
      toggleAside: () => setAsideOpen(!currentAsideOpen),
      toggleSidebar: () => setSidebarOpen(!currentSidebarOpen)
    }),
    [currentAsideOpen, currentSidebarOpen]
  );

  const layoutStyle = {
    "--rpc-app-layout-aside-width": asideWidth,
    "--rpc-app-layout-aside-track": aside && currentAsideOpen ? asideWidth : "0px",
    "--rpc-app-layout-navbar-height": navbarHeight,
    "--rpc-app-layout-sidebar-track": sidebar && currentSidebarOpen ? sidebarWidth : "0px",
    "--rpc-app-layout-sidebar-width": sidebarWidth,
    ...style
  } as CSSProperties;

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div
        className={cx(
          "rpc-app-layout",
          currentSidebarOpen && "rpc-app-layout--sidebar-open",
          currentAsideOpen && "rpc-app-layout--aside-open",
          className
        )}
        style={layoutStyle}
        {...props}
      >
        <div className="rpc-app-layout__body">
          {sidebar ? (
            <aside className="rpc-app-layout__sidebar" aria-label="Application sidebar">
              {sidebar}
            </aside>
          ) : null}

          <div className="rpc-app-layout__workspace">
            {navbar ? <div className="rpc-app-layout__navbar">{navbar}</div> : null}
            <main className="rpc-app-layout__main">{children}</main>
          </div>

          {aside ? (
            <aside className="rpc-app-layout__aside" aria-label="Application details panel">
              {aside}
            </aside>
          ) : null}
        </div>

        <button className="rpc-app-layout__overlay" onClick={() => setSidebarOpen(false)} type="button" aria-label="Close sidebar" />
        <button className="rpc-app-layout__aside-overlay" onClick={() => setAsideOpen(false)} type="button" aria-label="Close aside panel" />
      </div>
    </AppLayoutContext.Provider>
  );
}

function MenuToggle({ className = "", icon, label = "Toggle menu", onClick, ...props }: AppLayoutTriggerProps) {
  const layout = useAppLayout();

  return (
    <button
      aria-label={label}
      aria-pressed={layout?.sidebarOpen}
      className={cx("rpc-app-layout__trigger", className)}
      onClick={(event) => {
        layout?.toggleSidebar();
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      {icon ?? <MenuIcon />}
    </button>
  );
}

function AsideTrigger({ className = "", icon, label = "Toggle details panel", onClick, ...props }: AppLayoutTriggerProps) {
  const layout = useAppLayout();

  return (
    <button
      aria-label={label}
      aria-pressed={layout?.asideOpen}
      className={cx("rpc-app-layout__trigger", className)}
      onClick={(event) => {
        layout?.toggleAside();
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      {icon ?? <PanelIcon />}
    </button>
  );
}

export const AppLayout = Object.assign(AppLayoutRoot, {
  AsideTrigger,
  MenuToggle
});
