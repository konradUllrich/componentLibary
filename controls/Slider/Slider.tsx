import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./Slider.css";

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value"
  > {
  /** Current numeric value (controlled) */
  value: number;

  /**
   * Label for the slider. Include the current value in the string yourself
   * (e.g. `Font Size: ${fontSize}px`) if you want it shown live.
   */
  label?: string;

  /** Helper text below the slider */
  helperText?: string;

  /** Error state */
  error?: boolean;

  /** Error message (shows when error is true) */
  errorMessage?: string;
}

/**
 * Slider Component
 *
 * Styled range input.
 *
 * @example
 * ```tsx
 * <Slider
 *   label={`Font Size: ${fontSize}px`}
 *   value={fontSize}
 *   min={12}
 *   max={20}
 *   onChange={(e) => setFontSize(Number(e.target.value))}
 * />
 * ```
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { value, label, helperText, error = false, errorMessage, className, disabled, id, ...props },
    ref,
  ) => {
    const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={sliderId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <input
          ref={ref}
          id={sliderId}
          type="range"
          value={value}
          className={clsx(
            "mp-slider",
            error && "mp-slider--error",
            disabled && "mp-slider--disabled",
          )}
          disabled={disabled}
          {...props}
        />
      </FormControl>
    );
  },
);

Slider.displayName = "Slider";
