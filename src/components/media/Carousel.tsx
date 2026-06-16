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

function clampIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, total - 1));
}

function getBoundedIndex(index: number, total: number, loop: boolean) {
  if (total <= 0) {
    return 0;
  }

  if (loop) {
    return (index + total) % total;
  }

  return clampIndex(index, total);
}

export function Carousel({
  items,
  activeIndex,
  initialIndex = 0,
  onSlideChange,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 4000,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  showThumbnails = true,
  aspectRatio = "1 / 1",
  ariaLabel = "Carousel",
  className = "",
  ...props
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(() => clampIndex(initialIndex, items.length));
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const total = items.length;
  const isControlled = activeIndex !== undefined;
  const currentIndex = clampIndex(isControlled ? activeIndex : internalIndex, total);
  const currentItem = items[currentIndex];

  const goTo = (nextIndex: number) => {
    if (total === 0) {
      return;
    }

    const boundedIndex = getBoundedIndex(nextIndex, total, loop);

    if (!isControlled) {
      setInternalIndex(boundedIndex);
    }

    onSlideChange?.(boundedIndex, items[boundedIndex]);
  };

  const goPrevious = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  useEffect(() => {
    if (!autoPlay || total <= 1 || (pauseOnHover && isPaused)) {
      return;
    }

    const timer = window.setInterval(() => {
      goTo(currentIndex + 1);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, currentIndex, isPaused, pauseOnHover, total]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) {
      return;
    }

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < 48) {
      return;
    }

    if (distance > 0) {
      goPrevious();
    } else {
      goNext();
    }
  };

  if (total === 0) {
    return (
      <div className={cx("rpc-carousel", "rpc-carousel--empty", className)} {...props}>
        <div className="rpc-carousel__empty">No carousel items.</div>
      </div>
    );
  }

  return (
    <div
      className={cx("rpc-carousel", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      {...props}
    >
      <div
        className="rpc-carousel__viewport"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ "--rpc-carousel-aspect-ratio": aspectRatio } as CSSProperties}
        tabIndex={0}
      >
        <div className="rpc-carousel__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div
              aria-hidden={index !== currentIndex}
              aria-label={`${index + 1} of ${total}`}
              className="rpc-carousel__slide"
              key={item.id ?? `${item.title ?? "slide"}-${index}`}
              role="group"
            >
              {item.content ?? (
                <figure className="rpc-carousel__figure">
                  {item.imageSrc ? (
                    <img className="rpc-carousel__image" src={item.imageSrc} alt={item.imageAlt ?? item.title ?? ""} />
                  ) : null}
                  {item.title || item.description ? (
                    <figcaption className="rpc-carousel__caption">
                      {item.title ? <strong>{item.title}</strong> : null}
                      {item.description ? <span>{item.description}</span> : null}
                    </figcaption>
                  ) : null}
                </figure>
              )}
            </div>
          ))}
        </div>

        {showArrows && total > 1 ? (
          <>
            <button
              aria-label="Previous slide"
              className="rpc-carousel__arrow rpc-carousel__arrow--previous"
              disabled={!loop && currentIndex === 0}
              onClick={goPrevious}
              type="button"
            />
            <button
              aria-label="Next slide"
              className="rpc-carousel__arrow rpc-carousel__arrow--next"
              disabled={!loop && currentIndex === total - 1}
              onClick={goNext}
              type="button"
            />
          </>
        ) : null}
      </div>

      {showDots && total > 1 ? (
        <div className="rpc-carousel__dots" role="tablist" aria-label="Carousel slides">
          {items.map((item, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              className={cx("rpc-carousel__dot", index === currentIndex && "rpc-carousel__dot--active")}
              key={item.id ?? `dot-${index}`}
              onClick={() => goTo(index)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      ) : null}

      {showThumbnails && total > 1 ? (
        <div className="rpc-carousel__thumbs" aria-label="Carousel thumbnails">
          {items.map((item, index) => (
            <button
              aria-current={index === currentIndex ? "true" : undefined}
              aria-label={`Show ${item.title ?? `slide ${index + 1}`}`}
              className={cx("rpc-carousel__thumb", index === currentIndex && "rpc-carousel__thumb--active")}
              key={item.id ?? `thumb-${index}`}
              onClick={() => goTo(index)}
              type="button"
            >
              {item.thumbnailContent ??
                (item.thumbnailSrc || item.imageSrc ? (
                  <img src={item.thumbnailSrc ?? item.imageSrc} alt="" />
                ) : (
                  <span>{index + 1}</span>
                ))}
            </button>
          ))}
        </div>
      ) : null}

      <div className="rpc-carousel__status" aria-live="polite">
        {currentItem?.title ? `${currentItem.title}, ` : ""}slide {currentIndex + 1} of {total}
      </div>
    </div>
  );
}
