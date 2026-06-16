import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, className = "", ...props }: CardProps) {
  return (
    <section className={["rpc-card", className].filter(Boolean).join(" ")} {...props}>
      {title ? <h3 className="rpc-card__title">{title}</h3> : null}
      <div className="rpc-card__body">{children}</div>
    </section>
  );
}
