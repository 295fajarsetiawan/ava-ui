import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
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
export declare function CategoryCard({ align, as, backgroundColor, borderColor, children, className, contentClassName, gap, icon, iconBackgroundColor, iconBorderColor, iconBoxSize, iconClassName, iconColor, iconSize, lines, maxWidth, minHeight, padding, radius, style, subtitle, subtitleProps, title, titleProps, ...props }: CategoryCardProps): import("react").JSX.Element;
