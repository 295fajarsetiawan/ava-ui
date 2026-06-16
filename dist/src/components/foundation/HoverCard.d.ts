import { HTMLAttributes, ReactNode } from 'react';
export interface HoverCardStat {
    label: ReactNode;
    value: ReactNode;
}
export interface HoverCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    isOpen?: boolean;
    avatar?: ReactNode;
    avatarSrc?: string;
    avatarAlt?: string;
    avatarFallback?: ReactNode;
    title: ReactNode;
    handle?: ReactNode;
    description?: ReactNode;
    stats?: HoverCardStat[];
    footer?: ReactNode;
    children?: ReactNode;
}
export declare function HoverCard({ isOpen, avatar, avatarSrc, avatarAlt, avatarFallback, title, handle, description, stats, footer, children, id, className, ...props }: HoverCardProps): import("react").JSX.Element;
