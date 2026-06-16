import { default as React, ReactNode } from 'react';
type ToastVariant = "info" | "success" | "error" | "warning";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
export interface ToastOptions {
    message: ReactNode;
    variant?: ToastVariant;
    duration?: number;
}
export interface ToastHandle {
    id: string;
    message: ReactNode;
    variant: ToastVariant;
}
type ToastContextValue = {
    showToast: (opts: ToastOptions) => void;
};
export declare const ToastProvider: React.FC<{
    children?: ReactNode;
    position?: ToastPosition;
}>;
export declare function useToast(): ToastContextValue;
export default ToastProvider;
