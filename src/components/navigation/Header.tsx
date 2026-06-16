import {
  useEffect,
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

function renderAction(action: HeaderAction) {
  const content = (
    <>
      {action.icon ? <span className="rpc-header__action-icon">{action.icon}</span> : null}
      <span className="rpc-sr-only">{action.label}</span>
    </>
  );

  if (action.href && !action.disabled) {
    return (
      <a aria-label={action.label} className="rpc-header__icon-action" href={action.href} key={action.id}>
        {content}
      </a>
    );
  }

  return (
    <button
      aria-label={action.label}
      className="rpc-header__icon-action"
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
  const className = cx("rpc-header__profile-menu-item", item.danger && "rpc-header__profile-menu-item--danger");

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
  const profileRef = useRef<HTMLDivElement>(null);
  const isSearchControlled = Boolean(search && search.value !== undefined);
  const searchValue = search ? (isSearchControlled ? search.value ?? "" : internalSearch) : "";
  const headerStyle = {
    "--rpc-header-accent": accentColor,
    "--rpc-header-bg": background,
    "--rpc-header-border": borderColor,
    "--rpc-header-height": height,
    "--rpc-header-max-width": maxWidth,
    "--rpc-header-muted": mutedColor,
    "--rpc-header-text": textColor,
    ...style
  } as CSSProperties;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
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

  const brandNode = brandHref ? (
    <a className="rpc-header__brand" href={brandHref}>
      {brand}
    </a>
  ) : (
    <div className="rpc-header__brand">{brand}</div>
  );

  return (
    <header className={cx("rpc-header", className)} style={headerStyle} {...props}>
      <div className="rpc-header__inner">
        {brandNode}

        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          className="rpc-header__menu-toggle"
          onClick={() => setIsMenuOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={cx("rpc-header__content", isMenuOpen && "rpc-header__content--open")}>
          {navItems.length ? (
            <nav className="rpc-header__nav" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = item.active ?? activeNavId === item.id;
                const className = cx("rpc-header__nav-link", isActive && "rpc-header__nav-link--active");

                if (item.href && !item.disabled) {
                  return (
                    <a className={className} href={item.href} key={item.id} onClick={item.onClick}>
                      {item.label}
                    </a>
                  );
                }

                return (
                  <button className={className} disabled={item.disabled} key={item.id} onClick={item.onClick} type="button">
                    {item.label}
                  </button>
                );
              })}
            </nav>
          ) : null}

          <div className="rpc-header__right">
            {search ? (
              <form className="rpc-header__search" onSubmit={submitSearch} role="search">
                <label className="rpc-sr-only" htmlFor="rpc-header-search">
                  {search.label ?? "Search"}
                </label>
                <SearchIcon />
                <input
                  id="rpc-header-search"
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={search.placeholder ?? "Cari..."}
                  type="search"
                  value={searchValue}
                />
              </form>
            ) : null}

            {actions.length ? <div className="rpc-header__actions">{actions.map(renderAction)}</div> : null}

            {isAuthenticated ? (
              <div className="rpc-header__profile" ref={profileRef}>
                <button
                  aria-expanded={isProfileOpen}
                  aria-label={profileMenuLabel}
                  className="rpc-header__profile-trigger"
                  onClick={() => setIsProfileOpen((value) => !value)}
                  type="button"
                >
                  <span className="rpc-header__avatar">
                    {profile?.avatarSrc ? <img alt={profile.avatarAlt ?? ""} src={profile.avatarSrc} /> : profile?.avatar ?? "A"}
                  </span>
                  <span className="rpc-header__profile-name">{profile?.name ?? "Profile"}</span>
                  <ChevronIcon />
                </button>

                {isProfileOpen ? (
                  <div className="rpc-header__profile-menu">
                    {profile?.email ? <div className="rpc-header__profile-email">{profile.email}</div> : null}
                    {profileMenuItems.map(renderMenuItem)}
                    {onLogout ? (
                      <button className="rpc-header__profile-menu-item rpc-header__profile-menu-item--danger" onClick={onLogout} type="button">
                        {logoutLabel}
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rpc-header__auth">
                <button className="rpc-header__auth-button rpc-header__auth-button--login" onClick={onLogin} type="button">
                  <LoginIcon />
                  <span>{loginLabel}</span>
                </button>
                <button className="rpc-header__auth-button rpc-header__auth-button--register" onClick={onRegister} type="button">
                  <RegisterIcon />
                  <span>{registerLabel}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
