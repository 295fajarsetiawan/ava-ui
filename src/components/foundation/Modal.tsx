import React, { useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  closeOnOverlayClick?: boolean;
}

export function Modal({ isOpen, onClose, title, children, className = "", closeOnOverlayClick = true, ...props }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={["rpc-modal__overlay", className].filter(Boolean).join(" ")}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) onClose?.();
      }}
    >
      <div className="rpc-modal" {...props}>
        {title ? <div className="rpc-modal__header"><h3 className="rpc-modal__title">{title}</h3></div> : null}
        <div className="rpc-modal__body">{children}</div>
        {onClose ? (
          <button className="rpc-modal__close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
