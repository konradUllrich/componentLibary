import { FC } from "react";

export interface DateComponentProps {
  date: Date | string | null | undefined;
  format?: "short" | "long" | "datetime" | "time";
  locale?: string;
  fallback?: string;
}

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
  } catch (error) {
    console.error("Date formatting error:", error, "Input:", date);
    return <>{fallback}</>;
  }
};
