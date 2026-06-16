import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type CategoryCardAlign = "left" | "center" | "right";

export type CategoryCardLineAs = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface CategoryCardLine {
  id?: string;
  content: ReactNode;
  as?: CategoryCardLineAs;
  className?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: CSSProperties["fontStyle"];
  fontWeight?: CSSProperties["fontWeight"];
  letterSpacing?: string;
  lineHeight?: string;
  margin?: string;
  textTransform?: CSSProperties["textTransform"];
  style?: CSSProperties;
}

export interface CategoryCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  align?: CategoryCardAlign;
  as?: "article" | "div" | "section";
  backgroundColor?: string;
  borderColor?: string;
  children?: ReactNode;
  contentClassName?: string;
  gap?: string;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  iconBorderColor?: string;
  iconBoxSize?: string;
  iconClassName?: string;
  iconColor?: string;
  iconSize?: string;
  lines?: CategoryCardLine[];
  maxWidth?: string;
  minHeight?: string;
  padding?: string;
  radius?: string;
  subtitle?: ReactNode;
  subtitleProps?: Omit<CategoryCardLine, "content">;
  title?: ReactNode;
  titleProps?: Omit<CategoryCardLine, "content">;
}

function renderLine(line: CategoryCardLine, index: number) {
  const Component = line.as ?? "p";
  const style = {
    "--rpc-category-card-line-color": line.color,
    "--rpc-category-card-line-family": line.fontFamily,
    "--rpc-category-card-line-size": line.fontSize,
    "--rpc-category-card-line-style": line.fontStyle,
    "--rpc-category-card-line-weight": line.fontWeight,
    "--rpc-category-card-line-letter-spacing": line.letterSpacing,
    "--rpc-category-card-line-height": line.lineHeight,
    "--rpc-category-card-line-margin": line.margin,
    "--rpc-category-card-line-transform": line.textTransform,
    ...line.style
  } as CSSProperties;

  return (
    <Component className={cx("rpc-category-card__line", line.className)} key={line.id ?? index} style={style}>
      {line.content}
    </Component>
  );
}

export function CategoryCard({
  align = "center",
  as = "article",
  backgroundColor,
  borderColor,
  children,
  className = "",
  contentClassName = "",
  gap = "1.35rem",
  icon,
  iconBackgroundColor,
  iconBorderColor,
  iconBoxSize,
  iconClassName = "",
  iconColor,
  iconSize,
  lines,
  maxWidth,
  minHeight,
  padding,
  radius,
  style,
  subtitle,
  subtitleProps,
  title,
  titleProps,
  ...props
}: CategoryCardProps) {
  const Component = as;
  const resolvedLines =
    lines ??
    [
      title
        ? {
            as: "h3" as const,
            className: "rpc-category-card__line--title",
            content: title,
            ...titleProps
          }
        : null,
      subtitle
        ? {
            as: "p" as const,
            className: "rpc-category-card__line--subtitle",
            content: subtitle,
            ...subtitleProps
          }
        : null
    ].filter(Boolean) as CategoryCardLine[];

  const cardStyle = {
    "--rpc-category-card-bg": backgroundColor,
    "--rpc-category-card-border": borderColor,
    "--rpc-category-card-gap": gap,
    "--rpc-category-card-icon-bg": iconBackgroundColor,
    "--rpc-category-card-icon-border": iconBorderColor,
    "--rpc-category-card-icon-color": iconColor,
    "--rpc-category-card-icon-box-size": iconBoxSize,
    "--rpc-category-card-icon-size": iconSize,
    "--rpc-category-card-max-width": maxWidth,
    "--rpc-category-card-min-height": minHeight,
    "--rpc-category-card-padding": padding,
    "--rpc-category-card-radius": radius,
    ...style
  } as CSSProperties;

  return (
    <Component className={cx("rpc-category-card", `rpc-category-card--${align}`, className)} style={cardStyle} {...props}>
      {icon ? <div className={cx("rpc-category-card__icon", iconClassName)}>{icon}</div> : null}
      <div className={cx("rpc-category-card__content", contentClassName)}>
        {resolvedLines.map(renderLine)}
        {children}
      </div>
    </Component>
  );
}
