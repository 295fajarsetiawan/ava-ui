import { HTMLAttributes, ReactNode } from 'react';
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
export declare function Header({ brand, brandHref, navItems, activeNavId, search, actions, isAuthenticated, loginLabel, registerLabel, onLogin, onRegister, profile, profileMenuItems, profileMenuLabel, onLogout, logoutLabel, maxWidth, height, background, textColor, mutedColor, accentColor, borderColor, className, style, ...props }: HeaderProps): import("react").JSX.Element;
