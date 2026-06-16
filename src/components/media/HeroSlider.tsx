import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode
} from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

function clampIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(index, total - 1));
}

function getBoundedIndex(index: number, total: number, loop: boolean) {
  if (total <= 0) return 0;
  if (loop) return (index + total) % total;
  return clampIndex(index, total);
}

function buildTargetUrl(slide: SlideData) {
  if (slide.endpoint) return slide.endpoint;
  if (!slide.targetPage) return "";

  const params = new URLSearchParams();
  const targetParams =
    slide.targetParams && typeof slide.targetParams === "object" && !Array.isArray(slide.targetParams)
      ? slide.targetParams
      : {};

  Object.entries(targetParams).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    params.set(key, String(value));
  });

  const query = params.toString();
  return query ? `${slide.targetPage}?${query}` : slide.targetPage;
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 9.9 9.9 3 12l6.9 2.1L12 21l2.1-6.9L21 12l-6.9-2.1L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 2.95 6.1 6.72.94-4.86 4.73 1.18 6.69L12 17.3l-5.99 3.16 1.18-6.69-4.86-4.73 6.72-.94L12 2Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.35-9.6-9.05C.65 8.02 2.9 4.5 6.7 4.5c2.08 0 3.43 1.1 4.3 2.23.87-1.13 2.22-2.23 4.3-2.23 3.8 0 6.05 3.52 4.3 7.45C19.5 16.65 12 21 12 21Z" />
    </svg>
  );
}

const defaultHighlights: HeroSliderHighlight[] = [
  { id: "verified", icon: <ShieldIcon />, label: "Vendor terverifikasi" },
  { id: "guarantee", icon: <StarIcon />, label: "Garansi layanan terbaik" },
  { id: "satisfaction", icon: <HeartIcon />, label: "100% pasangan puas" }
];

export function HeroSlider({
  slides,
  activeIndex,
  initialIndex = 0,
  onSlideChange,
  onNavigate,
  highlights = defaultHighlights,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  height = "min(760px, 70vh)",
  minHeight = "520px",
  imagePosition = "center",
  overlay = "strong",
  ariaLabel = "Hero slider",
  className = "",
  style,
  ...props
}: HeroSliderProps) {
  const [internalIndex, setInternalIndex] = useState(() => clampIndex(initialIndex, slides.length));
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const total = slides.length;
  const isControlled = activeIndex !== undefined;
  const currentIndex = clampIndex(isControlled ? activeIndex : internalIndex, total);
  const currentSlide = slides[currentIndex];

  const goTo = (nextIndex: number) => {
    if (!total) return;
    const boundedIndex = getBoundedIndex(nextIndex, total, loop);

    if (!isControlled) {
      setInternalIndex(boundedIndex);
    }

    onSlideChange?.(boundedIndex, slides[boundedIndex]);
  };

  const goPrevious = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  useEffect(() => {
    if (!autoPlay || total <= 1 || (pauseOnHover && isPaused)) return;

    const timer = window.setInterval(() => {
      goTo(currentIndex + 1);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, currentIndex, isPaused, pauseOnHover, total]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < 48) return;
    if (distance > 0) goPrevious();
    else goNext();
  };

  const handleCta = (slide: SlideData) => {
    const url = buildTargetUrl(slide);

    if (onNavigate) {
      onNavigate({ slide, url });
      return;
    }

    if (url && typeof window !== "undefined") {
      window.location.assign(url);
    }
  };

  const sliderStyle = {
    "--rpc-hero-slider-height": height,
    "--rpc-hero-slider-image-position": imagePosition,
    "--rpc-hero-slider-min-height": minHeight,
    ...style
  } as CSSProperties;

  if (!total || !currentSlide) {
    return (
      <section className={cx("rpc-hero-slider", "rpc-hero-slider--empty", className)} style={sliderStyle} {...props}>
        <div className="rpc-hero-slider__empty">No slides available.</div>
      </section>
    );
  }

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={cx("rpc-hero-slider", `rpc-hero-slider--${overlay}`, className)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="region"
      style={sliderStyle}
      tabIndex={0}
      {...props}
    >
      <div className="rpc-hero-slider__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <article
            aria-hidden={index !== currentIndex}
            aria-label={`${index + 1} of ${total}`}
            className="rpc-hero-slider__slide"
            key={slide.id}
            role="group"
          >
            <img className="rpc-hero-slider__image" src={slide.image} alt={slide.title} />
            <div className="rpc-hero-slider__overlay" />

            <div className="rpc-hero-slider__tagline">
              <SparkleIcon />
              <span>{slide.tagline}</span>
            </div>

            <div className="rpc-hero-slider__content">
              <div className="rpc-hero-slider__badges">
                <span className="rpc-hero-slider__badge">{slide.badge}</span>
                {slide.discountBadge ? <span className="rpc-hero-slider__discount">{slide.discountBadge}</span> : null}
              </div>

              <h2 className="rpc-hero-slider__title">{slide.title}</h2>
              <p className="rpc-hero-slider__subtitle">{slide.subtitle}</p>
              <p className="rpc-hero-slider__description">{slide.description}</p>

              {highlights.length ? (
                <div className="rpc-hero-slider__highlights">
                  {highlights.map((item, highlightIndex) => (
                    <div className="rpc-hero-slider__highlight" key={item.id ?? highlightIndex}>
                      {item.icon ? <span className="rpc-hero-slider__highlight-icon">{item.icon}</span> : null}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <button className="rpc-hero-slider__cta" onClick={() => handleCta(slide)} type="button">
                <span>{slide.ctaText}</span>
                <ArrowIcon />
              </button>
            </div>
          </article>
        ))}
      </div>

      {showArrows && total > 1 ? (
        <>
          <button
            aria-label="Previous slide"
            className="rpc-hero-slider__arrow rpc-hero-slider__arrow--previous"
            disabled={!loop && currentIndex === 0}
            onClick={goPrevious}
            type="button"
          />
          <button
            aria-label="Next slide"
            className="rpc-hero-slider__arrow rpc-hero-slider__arrow--next"
            disabled={!loop && currentIndex === total - 1}
            onClick={goNext}
            type="button"
          />
        </>
      ) : null}

      {showDots && total > 1 ? (
        <div className="rpc-hero-slider__dots" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              className={cx("rpc-hero-slider__dot", index === currentIndex && "rpc-hero-slider__dot--active")}
              key={slide.id}
              onClick={() => goTo(index)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
