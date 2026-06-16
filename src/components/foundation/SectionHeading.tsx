import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type SectionHeadingAlign = "left" | "center" | "right";

export type SectionHeadingLineAs = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface SectionHeadingLine {
  id?: string;
  content: ReactNode;
  as?: SectionHeadingLineAs;
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

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  align?: SectionHeadingAlign;
  as?: "header" | "div" | "section";
  eyebrow?: ReactNode;
  eyebrowProps?: Omit<SectionHeadingLine, "content">;
  title?: ReactNode;
  titleProps?: Omit<SectionHeadingLine, "content">;
  description?: ReactNode;
  descriptionProps?: Omit<SectionHeadingLine, "content">;
  lines?: SectionHeadingLine[];
  maxWidth?: string;
  gap?: string;
}

function renderLine(line: SectionHeadingLine, index: number) {
  const Component = line.as ?? "p";
  const style = {
    "--rpc-section-heading-line-color": line.color,
    "--rpc-section-heading-line-family": line.fontFamily,
    "--rpc-section-heading-line-size": line.fontSize,
    "--rpc-section-heading-line-style": line.fontStyle,
    "--rpc-section-heading-line-weight": line.fontWeight,
    "--rpc-section-heading-line-letter-spacing": line.letterSpacing,
    "--rpc-section-heading-line-height": line.lineHeight,
    "--rpc-section-heading-line-margin": line.margin,
    "--rpc-section-heading-line-transform": line.textTransform,
    ...line.style
  } as CSSProperties;

  return (
    <Component
      className={cx("rpc-section-heading__line", line.className)}
      key={line.id ?? index}
      style={style}
    >
      {line.content}
    </Component>
  );
}

export function SectionHeading({
  align = "center",
  as = "header",
  className = "",
  description,
  descriptionProps,
  eyebrow,
  eyebrowProps,
  gap = "0.65rem",
  lines,
  maxWidth = "min(900px, 100%)",
  style,
  title,
  titleProps,
  ...props
}: SectionHeadingProps) {
  const Component = as;
  const resolvedLines =
    lines ??
    [
      eyebrow
        ? {
            as: "span" as const,
            className: "rpc-section-heading__line--eyebrow",
            content: eyebrow,
            ...eyebrowProps
          }
        : null,
      title
        ? {
            as: "h2" as const,
            className: "rpc-section-heading__line--title",
            content: title,
            ...titleProps
          }
        : null,
      description
        ? {
            as: "p" as const,
            className: "rpc-section-heading__line--description",
            content: description,
            ...descriptionProps
          }
        : null
    ].filter(Boolean) as SectionHeadingLine[];

  const headingStyle = {
    "--rpc-section-heading-gap": gap,
    "--rpc-section-heading-max-width": maxWidth,
    ...style
  } as CSSProperties;

  return (
    <Component
      className={cx("rpc-section-heading", `rpc-section-heading--${align}`, className)}
      style={headingStyle}
      {...props}
    >
      {resolvedLines.map(renderLine)}
    </Component>
  );
}
