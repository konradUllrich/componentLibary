import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
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
 *
 * <Slider
 *   label="Volume"
 *   value={volume}
 *   onChange={(e) => setVolume(Number(e.target.value))}
 *   error
 *   errorMessage="Value must be at least 30"
 * />
 * ```
 *
 * See {@link ./Slider.example.tsx} for the live, greppable version of this
 * snippet — it also drives the demo site's "Usage" section.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { value, label, helperText, error = false, errorMessage, className, disabled, id, ...props },
    ref,
  ) => {
    const sliderId = useFieldId(id);
    const messageId = `${sliderId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    return (
      <FormControl
        label={label}
        htmlFor={sliderId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        messageId={messageId}
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
          aria-invalid={error || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          {...props}
        />
      </FormControl>
    );
  },
);

Slider.displayName = "Slider";
