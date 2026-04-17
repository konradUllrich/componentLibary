/// <reference types="vite/client" />

import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** String-based column width (e.g. "20%", "10rem"). Used when a CSS string width is needed instead of TanStack's numeric sizing. */
    width?: string;
    /** Minimum column width applied as CSS min-width (e.g. 120 → "120px"). */
    minWidth?: number;
  }
}
