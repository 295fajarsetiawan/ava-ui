import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode
} from "react";

export interface HeaderNavItem {
  id: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface HeaderAction {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface HeaderProfile {
  name: ReactNode;
  email?: ReactNode;
  avatar?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface HeaderProfileMenuItem {
  id: string;
  label: ReactNode;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface HeaderSearchConfig {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: ReactNode;
  brandHref?: string;
  navItems?: HeaderNavItem[];
  activeNavId?: string;
  search?: HeaderSearchConfig | false;
  actions?: HeaderAction[];
  isAuthenticated?: boolean;
  loginLabel?: ReactNode;
  registerLabel?: ReactNode;
  onLogin?: () => void;
  onRegister?: () => void;
  profile?: HeaderProfile;
  profileMenuItems?: HeaderProfileMenuItem[];
  profileMenuLabel?: string;
  onLogout?: () => void;
  logoutLabel?: ReactNode;
  maxWidth?: string;
  height?: string;
  background?: string;
  textColor?: string;
  mutedColor?: string;
  accentColor?: string;
  borderColor?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function renderAction(action: HeaderAction) {
  const content = (
    <>
      {action.icon ? <span className="inline-flex items-center justify-center text-inherit">{action.icon}</span> : null}
      <span className="sr-only">{action.label}</span>
    </>
  );

  if (action.href && !action.disabled) {
    return (
      <a
        aria-label={action.label}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8A704C]"
        href={action.href}
        key={action.id}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      aria-label={action.label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8A704C]"
      disabled={action.disabled}
      key={action.id}
      onClick={action.onClick}
      type="button"
    >
      {content}
    </button>
  );
}

function renderMenuItem(item: HeaderProfileMenuItem) {
  const className = cx(
    "block rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors duration-200",
    item.danger ? "text-rose-500 hover:bg-rose-50" : "text-gray-700 hover:bg-[#F7F2EB]"
  );

  if (item.href && !item.disabled) {
    return (
      <a className={className} href={item.href} key={item.id}>
        {item.label}
      </a>
    );
  }

  return (
    <button className={className} disabled={item.disabled} key={item.id} onClick={item.onClick} type="button">
      {item.label}
    </button>
  );
}

export function Header({
  brand = "ava-ui",
  brandHref,
  navItems = [],
  activeNavId,
  search = false,
  actions = [],
  isAuthenticated = false,
  loginLabel = "Login",
  registerLabel = "Register",
  onLogin,
  onRegister,
  profile,
  profileMenuItems = [],
  profileMenuLabel = "Open profile menu",
  onLogout,
  logoutLabel = "Logout",
  maxWidth = "1200px",
  height = "72px",
  background = "var(--rpc-color-surface)",
  textColor = "var(--rpc-color-text)",
  mutedColor = "var(--rpc-color-muted)",
  accentColor = "var(--rpc-color-primary)",
  borderColor = "var(--rpc-color-border)",
  className = "",
  style,
  ...props
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState(search && search.defaultValue ? search.defaultValue : "");
  const navPanelId = useId();
  const searchInputId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const isSearchControlled = Boolean(search && search.value !== undefined);
  const searchValue = search ? (isSearchControlled ? search.value ?? "" : internalSearch) : "";
  const headerStyle = {
    background,
    color: textColor,
    borderBottomColor: borderColor,
    ...style
  } as CSSProperties;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        return;
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const updateSearch = (value: string) => {
    if (!isSearchControlled) {
      setInternalSearch(value);
    }

    if (search) {
      search.onChange?.(value);
    }
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search) {
      search.onSubmit?.(searchValue);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const brandNode = brandHref ? (
    <a
      className="select-none whitespace-nowrap font-serif text-[clamp(1.7rem,2.8vw,3rem)] font-bold italic tracking-[-0.045em] drop-shadow-[0_2px_3px_rgba(90,69,28,0.2)]"
      href={brandHref}
      style={{ color: accentColor }}
    >
      {brand}
    </a>
  ) : (
    <div
      className="select-none whitespace-nowrap font-serif text-[clamp(1.7rem,2.8vw,3rem)] font-bold italic tracking-[-0.045em] drop-shadow-[0_2px_3px_rgba(90,69,28,0.2)]"
      style={{ color: accentColor }}
    >
      {brand}
    </div>
  );

  return (
    <header className={cx("sticky top-0 z-40 border-b border-[#E5DACE]/100 bg-[#FDFBF7]/95 backdrop-blur-md", className)} ref={headerRef} style={headerStyle} {...props}>
      <div className="mx-auto flex h-auto max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8" style={{ minHeight: height, maxWidth }}>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {brandNode}
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = item.active ?? activeNavId === item.id;
            const baseClass = cx(
              "border-b-2 px-1 py-1 text-xs font-bold uppercase tracking-[0.24em] transition-all duration-300",
              isActive
                ? "text-[#D4AF37]"
                : "border-transparent text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            );
            const activeStyle = isActive ? { borderBottomColor: accentColor, color: accentColor } : undefined;

            if (item.href && !item.disabled) {
              return (
                <a
                  className={baseClass}
                  href={item.href}
                  key={item.id}
                  style={activeStyle}
                  onClick={() => {
                    closeMenu();
                    item.onClick?.();
                  }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                className={baseClass}
                disabled={item.disabled}
                key={item.id}
                style={activeStyle}
                onClick={() => {
                  closeMenu();
                  item.onClick?.();
                }}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {actions.length ? <div className="flex items-center gap-2">{actions.map(renderAction)}</div> : null}

          {search ? (
            <form
              className="hidden items-center rounded-sm border border-[#E5DACE] bg-[#F7F2EB] px-3 py-1.5 transition-all focus-within:border-[#D4AF37] md:flex"
              onSubmit={submitSearch}
              role="search"
            >
              <label className="sr-only" htmlFor={searchInputId}>
                {search.label ?? "Search"}
              </label>
              <SearchIcon />
              <input
                className="w-24 bg-transparent text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:w-36"
                id={searchInputId}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder={search.placeholder ?? "Cari..."}
                type="search"
                value={searchValue}
              />
            </form>
          ) : null}

          {isAuthenticated ? (
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                aria-label={profileMenuLabel}
                className="inline-flex min-h-10 items-center gap-2 rounded-full px-1 pr-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors duration-200"
                style={{ backgroundColor: mutedColor, borderColor: mutedColor }}
                onClick={() => setIsProfileOpen((value) => !value)}
                type="button"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-[#8A704C]">
                  {profile?.avatarSrc ? <img alt={profile.avatarAlt ?? ""} src={profile.avatarSrc} /> : profile?.avatar ?? "A"}
                </span>
                <span className="hidden whitespace-nowrap lg:inline">{profile?.name ?? "Profile"}</span>
                <ChevronIcon />
              </button>

              {isProfileOpen ? (
                <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 grid min-w-[220px] gap-1 rounded-2xl border border-[#E5DACE] bg-[#FFF8F1] p-2 shadow-[0_20px_42px_rgba(71,51,28,0.18)]">
                  {profile?.email ? <div className="border-b border-[#E5DACE] px-3 pb-3 pt-2 text-xs text-gray-600">{profile.email}</div> : null}
                  {profileMenuItems.map(renderMenuItem)}
                  {onLogout ? (
                    <button className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-500 transition-colors duration-200 hover:bg-rose-50" onClick={onLogout} type="button">
                      {logoutLabel}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <button
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200"
                onClick={onLogin}
                style={{ backgroundColor: mutedColor, borderColor: mutedColor }}
                type="button"
              >
                <LoginIcon />
                <span>{loginLabel}</span>
              </button>
              <button
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-[#FAF7F2]"
                onClick={onRegister}
                style={{ borderColor: "#D5C7B3", color: mutedColor }}
                type="button"
              >
                <RegisterIcon />
                <span>{registerLabel}</span>
              </button>
            </div>
          )}

          {navItems.length ? (
            <button
              aria-controls={navPanelId}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A4B3A] transition-colors duration-200 hover:bg-[#FAF7F2] md:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          ) : null}
        </div>

        {navItems.length ? (
          <div className={cx("md:hidden", isMenuOpen ? "block" : "hidden")} id={navPanelId}>
            <nav className="mt-3 grid gap-2 border-t border-[#E5DACE] pt-3" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = item.active ?? activeNavId === item.id;
                const className = cx(
                  "rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors duration-200",
                  isActive ? "bg-[#F7F2EB]" : "text-gray-700 hover:bg-[#F7F2EB]"
                );
                const activeStyle = isActive ? { color: accentColor } : undefined;

                if (item.href && !item.disabled) {
                  return (
                    <a
                      className={className}
                      href={item.href}
                      key={item.id}
                      style={activeStyle}
                      onClick={() => {
                        closeMenu();
                        item.onClick?.();
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <button
                    className={className}
                    disabled={item.disabled}
                    key={item.id}
                    style={activeStyle}
                    onClick={() => {
                      closeMenu();
                      item.onClick?.();
                    }}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {search ? (
              <form className="mt-3 flex items-center rounded-sm border border-[#E5DACE] bg-[#F7F2EB] px-3 py-2 transition-all focus-within:border-[#D4AF37] md:hidden" onSubmit={submitSearch} role="search">
                <label className="sr-only" htmlFor={`${searchInputId}-mobile`}>
                  {search.label ?? "Search"}
                </label>
                <SearchIcon />
                <input
                  className="w-full bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400"
                  id={`${searchInputId}-mobile`}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={search.placeholder ?? "Cari..."}
                  type="search"
                  value={searchValue}
                />
              </form>
            ) : null}

            {!isAuthenticated ? (
              <div className="mt-3 grid gap-2 md:hidden">
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors duration-200"
                  onClick={onLogin}
                  style={{ backgroundColor: mutedColor, borderColor: mutedColor }}
                  type="button"
                >
                  <LoginIcon />
                  <span>{loginLabel}</span>
                </button>
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-[#FAF7F2]"
                  onClick={onRegister}
                  style={{ borderColor: "#D5C7B3", color: mutedColor }}
                  type="button"
                >
                  <RegisterIcon />
                  <span>{registerLabel}</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
