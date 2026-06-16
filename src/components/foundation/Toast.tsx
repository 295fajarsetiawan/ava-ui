import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ToastVariant = "info" | "success" | "error" | "warning";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

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

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children?: ReactNode; position?: ToastPosition }> = ({ children, position = "bottom-right" }) => {
  const [toasts, setToasts] = useState<ToastHandle[]>([]);

  const showToast = useCallback((opts: ToastOptions) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const toast: ToastHandle = { id, message: opts.message, variant: opts.variant ?? "info" };
    setToasts((s) => [...s, toast]);
    const timeout = opts.duration ?? 4000;
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), timeout);
  }, []);

  const remove = useCallback((id: string) => setToasts((s) => s.filter((t) => t.id !== id)), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={["rpc-toast-container", `rpc-toast-container--${position}`].join(" ")} aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={["rpc-toast", `rpc-toast--${t.variant}`].join(" ")} onClick={() => remove(t.id)}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export default ToastProvider;
