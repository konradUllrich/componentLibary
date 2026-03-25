import { FC } from "react";

export interface DateComponentProps {
  /** The date value to display. Accepts a `Date` object, an ISO string, or `null`/`undefined`. */
  date: Date | string | null | undefined;
  /**
   * Controls the date/time output format using `Intl.DateTimeFormat`.
   *
   * - `"short"` – numeric date only, e.g. `15.03.2024` (default)
   * - `"long"` – full written month, e.g. `15. März 2024`
   * - `"datetime"` – date and time, e.g. `15.03.2024, 14:30`
   * - `"time"` – time only, e.g. `14:30`
   *
   * @default "short"
   */
  format?: "short" | "long" | "datetime" | "time";
  /**
   * BCP 47 language tag used for locale-aware formatting (e.g. `"de-DE"`, `"en-US"`).
   * Defaults to `"de-DE"` (German).
   *
   * @default "de-DE"
   */
  locale?: string;
  /**
   * Text rendered when `date` is `null`, `undefined`, or an invalid value.
   *
   * @default "---"
   */
  fallback?: string;
}

/**
 * DateComponent – Renders a locale-aware formatted date or time string.
 *
 * Accepts a native `Date` object or an ISO date string and formats it using the
 * browser's `Intl.DateTimeFormat` API. When the value is absent or cannot be
 * parsed, the `fallback` text is shown instead.
 *
 * @example
 * // Short date in default German locale
 * <DateComponent date={new Date()} />
 *
 * @example
 * // Full date in US English
 * <DateComponent date="2024-03-15" format="long" locale="en-US" />
 *
 * @example
 * // Time only with a custom fallback
 * <DateComponent date={null} format="time" fallback="N/A" />
 */
export const DateComponent: FC<DateComponentProps> = ({
  date,
  format = "short",
  locale = "de-DE",
  fallback = "---",
}) => {
  if (!date) {
    return <>{fallback}</>;
  }

  try {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
      return <>{fallback}</>;
    }

    let formatOptions: Intl.DateTimeFormatOptions;

    switch (format) {
      case "long":
        formatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        break;
      case "datetime":
        formatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        break;
      case "time":
        formatOptions = {
          hour: "2-digit",
          minute: "2-digit",
        };
        break;
      case "short":
      default:
        formatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        break;
    }

    const formatted = new Intl.DateTimeFormat(locale, formatOptions).format(
      dateObj,
    );
    return <>{formatted}</>;
  } catch {
    // Date formatting failed, show fallback
    return <>{fallback}</>;
  }
};

DateComponent.displayName = "DateComponent";
