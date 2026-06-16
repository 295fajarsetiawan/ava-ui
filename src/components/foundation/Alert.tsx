import React from "react";
import type { ReactNode, HTMLAttributes } from "react";

export type AlertVariant = "info" | "success" | "error" | "warning";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

export function Alert({ variant = "info", title, children, dismissible = false, onClose, className = "", ...props }: AlertProps) {
  return (
    <div className={["rpc-alert", `rpc-alert--${variant}`, className].filter(Boolean).join(" ")} role="status" {...props}>
      {title ? <div className="rpc-alert__title">{title}</div> : null}
      <div className="rpc-alert__body">{children}</div>
      {dismissible ? (
        <button className="rpc-alert__close" onClick={onClose} aria-label="Close alert">×</button>
      ) : null}
    </div>
  );
}

export default Alert;
