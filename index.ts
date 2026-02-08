/**
 * mpComponents - Component Library Barrel Export
 *
 * Main entry point for the mpComponents design system.
 * Exports all categories and components for easy consumption.
 *
 * @example
 * ```tsx
 * // Import specific category
 * import { Button } from '@/mpComponents/common';
 * import { FormField, FormInput } from '@/mpComponents/controls';
 * import { DataTable, Table } from '@/mpComponents/data-display';
 * import { Container, Stack } from '@/mpComponents/layout';
 *
 * // Or import from styles
 * import '@/mpComponents/styles/variables.css';
 * ```
 */

// ========================================
// Common/Primitive Components
// ========================================
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from "./common";

// ========================================
// Control Components (Forms)
// ========================================
// export { FormField, FormInput, FormSelect, FormCheckbox, FormTextarea, FormError } from './controls';
// export { useForm } from './controls';

// ========================================
// Data Display Components
// ========================================
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Datalist,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
  type DatalistProps,
} from "./data-display";

// ========================================
// Layout Components
// ========================================
export {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarSubItem,
  useSidebar,
  type SidebarProps,
  type SidebarToggleProps,
  type SidebarNavProps,
  type SidebarItemProps,
  type SidebarSubItemProps,
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain,
  type AppLayoutProps,
  type AppHeaderProps,
  type AppSidebarProps,
  type AppMainProps,
} from "./layout";

// ========================================
// Shared Hooks
// ========================================
// export { useMediaQuery, useClickOutside, useFocus, useDebounce } from './hooks';

// ========================================
// Types
// ========================================
// export type { ComponentProps } from './types';
// export type { FormProps, FormFieldProps } from './types';
// export type { TableProps, DataTableProps } from './types';
