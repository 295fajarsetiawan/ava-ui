import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface ImageHeroCardMeta {
  id?: string;
  icon?: ReactNode;
  label: ReactNode;
}

export interface ImageHeroCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  imageSrc: string;
  imageAlt?: string;
  badge?: ReactNode;
  title: ReactNode;
  meta?: ImageHeroCardMeta[];
  children?: ReactNode;
  width?: string;
  height?: string;
  contentWidth?: string;
  aspectRatio?: string;
  minHeight?: string;
  titleFontSize?: string;
  titleFontWeight?: CSSProperties["fontWeight"];
  titleLineHeight?: string;
  badgeFontSize?: string;
  metaFontSize?: string;
  bodyFontSize?: string;
  imagePosition?: string;
  overlay?: "soft" | "strong";
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ImageHeroCard({
  imageSrc,
  imageAlt = "",
  badge,
  title,
  meta = [],
  children,
  width = "100%",
  height,
  contentWidth = "min(760px, calc(100% - 2.7rem))",
  aspectRatio = "21 / 9",
  minHeight = "320px",
  titleFontSize = "clamp(1.8rem, 4vw, 3rem)",
  titleFontWeight = 800,
  titleLineHeight = "1.08",
  badgeFontSize = "0.78rem",
  metaFontSize = "clamp(0.95rem, 1.8vw, 1.12rem)",
  bodyFontSize = "1rem",
  imagePosition = "center",
  overlay = "strong",
  className = "",
  style,
  ...props
}: ImageHeroCardProps) {
  const cardStyle = {
    "--rpc-image-hero-card-aspect": aspectRatio,
    "--rpc-image-hero-card-body-size": bodyFontSize,
    "--rpc-image-hero-card-badge-size": badgeFontSize,
    "--rpc-image-hero-card-content-width": contentWidth,
    "--rpc-image-hero-card-height": height,
    "--rpc-image-hero-card-meta-size": metaFontSize,
    "--rpc-image-hero-card-min-height": minHeight,
    "--rpc-image-hero-card-position": imagePosition,
    "--rpc-image-hero-card-title-line-height": titleLineHeight,
    "--rpc-image-hero-card-title-size": titleFontSize,
    "--rpc-image-hero-card-title-weight": titleFontWeight,
    "--rpc-image-hero-card-width": width,
    ...style
  } as CSSProperties;

  return (
    <article
      className={cx("rpc-image-hero-card", `rpc-image-hero-card--${overlay}`, className)}
      style={cardStyle}
      {...props}
    >
      <img className="rpc-image-hero-card__image" src={imageSrc} alt={imageAlt} />
      <div className="rpc-image-hero-card__content">
        {badge ? <span className="rpc-image-hero-card__badge">{badge}</span> : null}
        <h3 className="rpc-image-hero-card__title">{title}</h3>

        {meta.length ? (
          <div className="rpc-image-hero-card__meta">
            {meta.map((item, index) => (
              <div className="rpc-image-hero-card__meta-item" key={item.id ?? index}>
                {item.icon ? <span className="rpc-image-hero-card__meta-icon">{item.icon}</span> : null}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {children ? <div className="rpc-image-hero-card__body">{children}</div> : null}
      </div>
    </article>
  );
}
