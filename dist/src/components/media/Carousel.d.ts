import { HTMLAttributes, ReactNode } from 'react';
export interface CarouselItem {
    id?: string;
    imageSrc?: string;
    imageAlt?: string;
    thumbnailSrc?: string;
    title?: string;
    description?: string;
    content?: ReactNode;
    thumbnailContent?: ReactNode;
}
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    items: CarouselItem[];
    activeIndex?: number;
    initialIndex?: number;
    onSlideChange?: (index: number, item: CarouselItem) => void;
    loop?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    pauseOnHover?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    showThumbnails?: boolean;
    aspectRatio?: string;
    ariaLabel?: string;
}
export declare function Carousel({ items, activeIndex, initialIndex, onSlideChange, loop, autoPlay, autoPlayInterval, pauseOnHover, showArrows, showDots, showThumbnails, aspectRatio, ariaLabel, className, ...props }: CarouselProps): import("react").JSX.Element;
