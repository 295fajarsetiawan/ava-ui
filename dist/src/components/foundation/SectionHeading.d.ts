import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
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
export declare function SectionHeading({ align, as, className, description, descriptionProps, eyebrow, eyebrowProps, gap, lines, maxWidth, style, title, titleProps, ...props }: SectionHeadingProps): import("react").JSX.Element;
