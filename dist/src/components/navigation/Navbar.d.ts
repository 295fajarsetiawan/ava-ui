import { HTMLAttributes, ReactNode } from 'react';
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
declare function NavbarRoot({ children, className, maxWidth, sticky, ...props }: NavbarProps): import("react").JSX.Element;
declare function Header({ children, className, ...props }: NavbarHeaderProps): import("react").JSX.Element;
declare function Brand({ children, className, ...props }: NavbarBrandProps): import("react").JSX.Element;
declare function Section({ align, children, className, ...props }: NavbarSectionProps): import("react").JSX.Element;
declare function Spacer(): import("react").JSX.Element;
export declare const Navbar: typeof NavbarRoot & {
    Brand: typeof Brand;
    Header: typeof Header;
    Section: typeof Section;
    Spacer: typeof Spacer;
};
export {};
