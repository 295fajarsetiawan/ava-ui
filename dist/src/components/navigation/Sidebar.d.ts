import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
export interface SidebarItem {
    id: string;
    label: ReactNode;
    href?: string;
    url?: string;
    icon?: ReactNode;
    badge?: ReactNode;
    children?: SidebarItem[];
    defaultOpen?: boolean;
    active?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    onClick?: (item: SidebarItem) => void;
}
export interface SidebarProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    brand?: ReactNode;
    brandIcon?: ReactNode;
    brandHref?: string;
    items: SidebarItem[];
    footerItems?: SidebarItem[];
    activeId?: string | null;
    defaultActiveId?: string | null;
    onActiveChange?: (activeId: string | null, item: SidebarItem | null) => void;
    openIds?: string[];
    defaultOpenIds?: string[];
    onOpenChange?: (openIds: string[]) => void;
    header?: ReactNode;
    headerIcon?: ReactNode;
    children?: ReactNode;
    ariaLabel?: string;
    mobileLabel?: string;
    variant?: "shell" | "navigation";
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    showCollapseToggle?: boolean;
    collapseLabel?: string;
    expandLabel?: string;
    width?: string;
    collapsedWidth?: string;
    height?: string;
    minHeight?: string;
    background?: string;
    surfaceColor?: string;
    textColor?: string;
    mutedColor?: string;
    borderColor?: string;
    activeColor?: string;
    activeTextColor?: string;
}
export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactNode;
    label?: string;
}
export interface SidebarMobileProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare function SidebarTrigger({ className, icon, label, onClick, ...props }: SidebarTriggerProps): import("react").JSX.Element;
declare function SidebarMobile({ children, className, ...props }: SidebarMobileProps): import("react").JSX.Element;
declare function SidebarRoot({ brand, brandIcon, brandHref, items, footerItems, activeId, defaultActiveId, onActiveChange, openIds, defaultOpenIds, onOpenChange, header, headerIcon, children, ariaLabel, mobileLabel, variant, collapsed, defaultCollapsed, onCollapsedChange, showCollapseToggle, collapseLabel, expandLabel, width, collapsedWidth, height, minHeight, background, surfaceColor, textColor, mutedColor, borderColor, activeColor, activeTextColor, className, style, ...props }: SidebarProps): import("react").JSX.Element;
export declare const Sidebar: typeof SidebarRoot & {
    Mobile: typeof SidebarMobile;
    Trigger: typeof SidebarTrigger;
};
export {};
