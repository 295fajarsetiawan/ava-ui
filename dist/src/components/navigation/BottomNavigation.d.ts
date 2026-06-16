import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
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
export declare function BottomNavigation({ items, activeId, defaultActiveId, onActiveChange, ariaLabel, showLabels, placement, maxWidth, background, borderColor, textColor, mutedColor, activeColor, activeTextColor, className, style, ...props }: BottomNavigationProps): import("react").JSX.Element;
