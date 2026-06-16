import type { HTMLAttributes, ReactNode } from "react";

export interface HoverCardStat {
  label: ReactNode;
  value: ReactNode;
}

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  isOpen?: boolean;
  avatar?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: ReactNode;
  title: ReactNode;
  handle?: ReactNode;
  description?: ReactNode;
  stats?: HoverCardStat[];
  footer?: ReactNode;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getFallbackValue(title: ReactNode, avatarFallback?: ReactNode) {
  if (avatarFallback !== undefined) {
    return avatarFallback;
  }

  if (typeof title === "string" && title.trim()) {
    return title.trim().slice(0, 1).toUpperCase();
  }

  return "•";
}

export function HoverCard({
  isOpen,
  avatar,
  avatarSrc,
  avatarAlt,
  avatarFallback,
  title,
  handle,
  description,
  stats = [],
  footer,
  children,
  id,
  className = "",
  ...props
}: HoverCardProps) {
  const card = (includeChildren: boolean, panelClassName = className) => (
    <article className={cx("rpc-hover-card", panelClassName)} id={id} {...props}>
      <div className="rpc-hover-card__header">
        <div className="rpc-hover-card__avatar" aria-hidden="true">
          {avatarSrc ? <img alt={avatarAlt ?? ""} className="rpc-hover-card__avatar-image" src={avatarSrc} /> : null}
          {!avatarSrc ? (
            avatar ?? <span className="rpc-hover-card__avatar-fallback">{getFallbackValue(title, avatarFallback)}</span>
          ) : null}
        </div>

        <div className="rpc-hover-card__identity">
          <h3 className="rpc-hover-card__title">{title}</h3>
          {handle ? <p className="rpc-hover-card__handle">{handle}</p> : null}
        </div>
      </div>

      {description ? <p className="rpc-hover-card__description">{description}</p> : null}

      {stats.length ? (
        <dl className="rpc-hover-card__stats">
          {stats.map((stat, index) => (
            <div className="rpc-hover-card__stat" key={index}>
              <dt className="rpc-hover-card__stat-label">{stat.label}</dt>
              <dd className="rpc-hover-card__stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {includeChildren && children ? <div className="rpc-hover-card__content">{children}</div> : null}

      {footer ? <div className="rpc-hover-card__footer">{footer}</div> : null}
    </article>
  );

  if (isOpen !== undefined) {
    return (
      <div className={cx("rpc-hover-card-root", className)}>
        {isOpen ? card(false, "rpc-hover-card--floating") : null}
        {children ? <div className="rpc-hover-card__trigger">{children}</div> : null}
      </div>
    );
  }

  return card(true);
}
