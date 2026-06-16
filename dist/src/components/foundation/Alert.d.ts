import { default as React, ReactNode, HTMLAttributes } from 'react';
export type AlertVariant = "info" | "success" | "error" | "warning";
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    variant?: AlertVariant;
    title?: ReactNode;
    children?: ReactNode;
    dismissible?: boolean;
    onClose?: () => void;
}
export declare function Alert({ variant, title, children, dismissible, onClose, className, ...props }: AlertProps): React.JSX.Element;
export default Alert;
