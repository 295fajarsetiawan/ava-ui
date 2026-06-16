import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
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
export declare function ImageHeroCard({ imageSrc, imageAlt, badge, title, meta, children, width, height, contentWidth, aspectRatio, minHeight, titleFontSize, titleFontWeight, titleLineHeight, badgeFontSize, metaFontSize, bodyFontSize, imagePosition, overlay, className, style, ...props }: ImageHeroCardProps): import("react").JSX.Element;
