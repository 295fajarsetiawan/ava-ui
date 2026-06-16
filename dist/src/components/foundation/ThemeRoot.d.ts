import { HTMLAttributes, ReactNode } from 'react';
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
export declare function ThemeRoot({ children, mode, primaryColor, primaryHoverColor, onPrimaryColor, secondaryColor, secondaryHoverColor, secondaryTextColor, dangerColor, successColor, warningColor, infoColor, backgroundColor, surfaceColor, surfaceMutedColor, textColor, mutedColor, borderColor, radius, shadow, className, style, ...props }: ThemeRootProps): import("react").JSX.Element;
