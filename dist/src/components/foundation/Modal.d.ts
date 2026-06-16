import { default as React, HTMLAttributes, ReactNode } from 'react';
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    isOpen: boolean;
    onClose?: () => void;
    title?: ReactNode;
    children?: ReactNode;
    closeOnOverlayClick?: boolean;
}
export declare function Modal({ isOpen, onClose, title, children, className, closeOnOverlayClick, ...props }: ModalProps): React.JSX.Element | null;
export default Modal;
