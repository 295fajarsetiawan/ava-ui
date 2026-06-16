import React from "react";
import type { ReactNode } from "react";
import type { ModalProps } from "./Modal";
import { Modal } from "./Modal";

export interface ConfirmAction {
  label: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | string;
}

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  message?: ReactNode;
  actions?: ConfirmAction[];
}

export function ConfirmModal({ isOpen, onClose, title, message, actions, ...props }: ConfirmModalProps) {
  const defaultActions: ConfirmAction[] = [
    { label: "Cancel", onClick: onClose ?? (() => {}), variant: "secondary" },
    { label: "Yes", onClick: onClose ?? (() => {}), variant: "primary" }
  ];

  const renderActions = (actions ?? defaultActions).map((a, i) => (
    <button key={i} className={["rpc-button", a.variant === "primary" ? "rpc-button--primary" : "rpc-button--secondary"].join(" ")} onClick={a.onClick}>
      {a.label}
    </button>
  ));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} {...props}>
      <div style={{ marginBottom: "1rem" }}>{message}</div>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>{renderActions}</div>
    </Modal>
  );
}

export default ConfirmModal;
