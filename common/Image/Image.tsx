import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./Image.css";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /**
   * How the image should be resized to fit its container
   * @default "cover"
   */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /**
   * Border radius variant
   * @default "none"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * Aspect ratio of the image container
   * @default "auto"
   */
  aspectRatio?: "auto" | "square" | "video" | "portrait";
  /** Fallback image URL shown when the primary src fails to load */
  fallbackSrc?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Image – Accessible image component with object-fit, rounded corners,
 * aspect ratio helpers, and optional fallback on error.
 *
 * @example
 * <Image src="/photo.jpg" alt="A scenic view" rounded="md" aspectRatio="video" />
 * <Image src="/avatar.jpg" alt="User avatar" rounded="full" objectFit="cover" fallbackSrc="/default-avatar.jpg" />
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      objectFit = "cover",
      rounded = "none",
      aspectRatio = "auto",
      fallbackSrc,
      className,
      onError,
      ...props
    },
    ref,
  ) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const hasFallenBack = React.useRef(false);

    useEffect(() => {
      setCurrentSrc(src);
      setHasError(false);
      hasFallenBack.current = false;
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!hasFallenBack.current && fallbackSrc) {
        hasFallenBack.current = true;
        setCurrentSrc(fallbackSrc);
      } else {
        setHasError(true);
      }
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        src={currentSrc}
        alt={alt}
        className={clsx(
          "image",
          `image--${objectFit}`,
          `image--rounded-${rounded}`,
          aspectRatio !== "auto" && `image--aspect-${aspectRatio}`,
          hasError && "image--error",
          className,
        )}
        onError={handleError}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";
