import React from "react";
import clsx from "clsx";
import "./Skeleton.css";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Shape variant of the skeleton
   * @default "rectangle"
   */
  variant?: "text" | "circle" | "rectangle";

  /**
   * Width of the skeleton (CSS value or number in px)
   */
  width?: string | number;

  /**
   * Height of the skeleton (CSS value or number in px)
   */
  height?: string | number;

  /**
   * Animation style
   * @default "pulse"
   */
  animation?: "pulse" | "wave" | "none";

  /**
   * Number of text lines to render (only applies to the text variant)
   * @default 1
   */
  lines?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Skeleton Component
 *
 * A placeholder loading indicator that mimics the shape of content
 * while it is being loaded. Supports text lines, circles (avatars),
 * and rectangles (images, cards, buttons).
 *
 * @example
 * ```tsx
 * // Single text line
 * <Skeleton variant="text" width="80%" />
 *
 * // Avatar placeholder
 * <Skeleton variant="circle" width={40} height={40} />
 *
 * // Card placeholder
 * <Skeleton variant="rectangle" width="100%" height={200} />
 *
 * // Multiple text lines
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rectangle",
      width,
      height,
      animation = "pulse",
      lines = 1,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const animationClass =
      animation !== "none" ? `mp-skeleton--${animation}` : undefined;

    const sizeStyle: React.CSSProperties = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          role="status"
          aria-label="Loading"
          aria-busy="true"
          className={clsx("mp-skeleton__group", className)}
          {...props}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={clsx("mp-skeleton", "mp-skeleton--text", animationClass)}
              style={{
                width:
                  i === lines - 1
                    ? "60%"
                    : (sizeStyle.width ?? undefined),
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        aria-busy="true"
        className={clsx(
          "mp-skeleton",
          `mp-skeleton--${variant}`,
          animationClass,
          className,
        )}
        style={sizeStyle}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
