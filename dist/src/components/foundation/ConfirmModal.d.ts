import { default as React, ReactNode } from 'react';
import { ModalProps } from './Modal';
export interface ConfirmAction {
    label: ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | string;
}
export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
    message?: ReactNode;
    actions?: ConfirmAction[];
}
export declare function ConfirmModal({ isOpen, onClose, title, message, actions, ...props }: ConfirmModalProps): React.JSX.Element;
export default ConfirmModal;
