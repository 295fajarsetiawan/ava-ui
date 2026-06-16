import { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
export declare function Button({ children, className, variant, size, ...props }: ButtonProps): import("react").JSX.Element;
