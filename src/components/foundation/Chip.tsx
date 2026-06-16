import type { HTMLAttributes, ReactNode } from "react";

export type ChipColor = "default" | "success" | "warning" | "danger" | "info";
export type ChipVariant = "soft" | "solid" | "outline";
export type ChipSize = "sm" | "md";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
}

export function Chip({
  children,
  color = "default",
  variant = "soft",
  size = "md",
  className = "",
  ...props
}: ChipProps) {
  return (
    <span
      className={["rpc-chip", `rpc-chip--${color}`, `rpc-chip--${variant}`, `rpc-chip--${size}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
