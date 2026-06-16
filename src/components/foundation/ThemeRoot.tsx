import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ThemeRootMode = "light" | "dark";

export interface ThemeRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  mode?: ThemeRootMode;
  primaryColor?: string;
  primaryHoverColor?: string;
  onPrimaryColor?: string;
  secondaryColor?: string;
  secondaryHoverColor?: string;
  secondaryTextColor?: string;
  dangerColor?: string;
  successColor?: string;
  warningColor?: string;
  infoColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  surfaceMutedColor?: string;
  textColor?: string;
  mutedColor?: string;
  borderColor?: string;
  radius?: string;
  shadow?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ThemeRoot({
  children,
  mode = "dark",
  primaryColor,
  primaryHoverColor,
  onPrimaryColor,
  secondaryColor,
  secondaryHoverColor,
  secondaryTextColor,
  dangerColor,
  successColor,
  warningColor,
  infoColor,
  backgroundColor,
  surfaceColor,
  surfaceMutedColor,
  textColor,
  mutedColor,
  borderColor,
  radius,
  shadow,
  className = "",
  style,
  ...props
}: ThemeRootProps) {
  const themeStyle = {
    "--rpc-color-background": backgroundColor,
    "--rpc-color-border": borderColor,
    "--rpc-color-muted": mutedColor,
    "--rpc-color-primary": primaryColor,
    "--rpc-color-primary-dark": primaryHoverColor,
    "--rpc-color-primary-hover": primaryHoverColor,
    "--rpc-color-on-primary": onPrimaryColor,
    "--rpc-color-secondary": secondaryColor,
    "--rpc-color-secondary-hover": secondaryHoverColor,
    "--rpc-color-secondary-text": secondaryTextColor,
    "--rpc-color-danger": dangerColor,
    "--rpc-color-success": successColor,
    "--rpc-color-warning": warningColor,
    "--rpc-color-info": infoColor,
    "--rpc-color-surface": surfaceColor,
    "--rpc-color-surface-muted": surfaceMutedColor,
    "--rpc-color-text": textColor,
    "--rpc-radius": radius,
    "--rpc-shadow": shadow,
    ...style
  } as CSSProperties;

  return (
    <div
      className={cx("rpc-theme-root", `rpc-theme-root--${mode}`, className)}
      data-rpc-theme={mode}
      style={themeStyle}
      {...props}
    >
      {children}
    </div>
  );
}
