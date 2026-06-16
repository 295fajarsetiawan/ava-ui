import { HTMLAttributes, ReactNode } from 'react';
export interface SlideData {
    id: number;
    image: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    tagline: string;
    discountBadge?: string;
    ctaText: string;
    endpoint?: string;
    targetPage?: string;
    targetParams?: any;
}
export interface HeroSliderHighlight {
    id?: string;
    icon?: ReactNode;
    label: ReactNode;
}
export interface HeroSliderNavigatePayload {
    slide: SlideData;
    url: string;
}
export interface HeroSliderProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    slides: SlideData[];
    activeIndex?: number;
    initialIndex?: number;
    onSlideChange?: (index: number, slide: SlideData) => void;
    onNavigate?: (payload: HeroSliderNavigatePayload) => void;
    highlights?: HeroSliderHighlight[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    pauseOnHover?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    height?: string;
    minHeight?: string;
    imagePosition?: string;
    overlay?: "soft" | "strong";
    ariaLabel?: string;
}
export declare function HeroSlider({ slides, activeIndex, initialIndex, onSlideChange, onNavigate, highlights, autoPlay, autoPlayInterval, loop, pauseOnHover, showArrows, showDots, height, minHeight, imagePosition, overlay, ariaLabel, className, style, ...props }: HeroSliderProps): import("react").JSX.Element;
