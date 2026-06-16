import { HTMLAttributes, ReactNode } from 'react';
export type ChipColor = "default" | "success" | "warning" | "danger" | "info";
export type ChipVariant = "soft" | "solid" | "outline";
export type ChipSize = "sm" | "md";
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    color?: ChipColor;
    variant?: ChipVariant;
    size?: ChipSize;
}
export declare function Chip({ children, color, variant, size, className, ...props }: ChipProps): import("react").JSX.Element;
