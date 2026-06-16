import { HTMLAttributes, ReactNode } from 'react';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: ReactNode;
}
export declare function Card({ title, children, className, ...props }: CardProps): import("react").JSX.Element;
