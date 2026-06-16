import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
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
export declare function useAppLayout(): AppLayoutContextValue | null;
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
declare function AppLayoutRoot({ aside, asideOpen, asideWidth, children, className, defaultAsideOpen, defaultSidebarOpen, navbar, navbarHeight, onAsideOpenChange, onSidebarOpenChange, sidebar, sidebarOpen, sidebarWidth, style, ...props }: AppLayoutProps): import("react").JSX.Element;
declare function MenuToggle({ className, icon, label, onClick, ...props }: AppLayoutTriggerProps): import("react").JSX.Element;
declare function AsideTrigger({ className, icon, label, onClick, ...props }: AppLayoutTriggerProps): import("react").JSX.Element;
export declare const AppLayout: typeof AppLayoutRoot & {
    AsideTrigger: typeof AsideTrigger;
    MenuToggle: typeof MenuToggle;
};
export {};
