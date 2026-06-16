import type { HTMLAttributes, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  sticky?: boolean;
}

export interface NavbarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface NavbarBrandProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface NavbarSectionProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children: ReactNode;
}

function NavbarRoot({ children, className = "", maxWidth = "xl", sticky = false, ...props }: NavbarProps) {
  return (
    <nav className={cx("rpc-navbar", `rpc-navbar--${maxWidth}`, sticky && "rpc-navbar--sticky", className)} {...props}>
      {children}
    </nav>
  );
}

function Header({ children, className = "", ...props }: NavbarHeaderProps) {
  return (
    <div className={cx("rpc-navbar__header", className)} {...props}>
      {children}
    </div>
  );
}

function Brand({ children, className = "", ...props }: NavbarBrandProps) {
  return (
    <div className={cx("rpc-navbar__brand", className)} {...props}>
      {children}
    </div>
  );
}

function Section({ align = "start", children, className = "", ...props }: NavbarSectionProps) {
  return (
    <div className={cx("rpc-navbar__section", `rpc-navbar__section--${align}`, className)} {...props}>
      {children}
    </div>
  );
}

function Spacer() {
  return <span className="rpc-navbar__spacer" aria-hidden="true" />;
}

export const Navbar = Object.assign(NavbarRoot, {
  Brand,
  Header,
  Section,
  Spacer
});
