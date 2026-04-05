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
  Accordion,
  type AccordionProps,
  type AccordionItem,
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  type DialogProps,
  type DialogContentProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogCloseProps,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  type DropdownProps,
  type DropdownContentProps,
  type DropdownItemProps,
  type DropdownLabelProps,
  type DropdownSeparatorProps,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipContentProps,
  Skeleton,
  type SkeletonProps,
  EmptyState,
  type EmptyStateProps,
  type EmptyStateVariant,
  type EmptyStateSize,
  Text,
  type TextProps,
  Toggle,
  type ToggleProps,
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
  Image,
  type ImageProps,
  Badge,
  type BadgeProps,
  DateComponent,
  type DateComponentProps,
  UserAvatar,
  type UserAvatarProps,
  UserAvatars,
  type UserAvatarsProps,
  ThemePresetProvider,
} from "./common";

// ========================================
// Control Components (Forms)
// ========================================
export {
  Checkbox,
  type CheckboxProps,
  CheckboxGroup,
  type CheckboxGroupProps,
  Select,
  type SelectProps,
  Radio,
  FormBuilder,
  type FormBuilderProps,
  FormControl,
  type FormControlProps,
  Input,
  type InputProps,
  Textarea,
  type TextareaProps,
} from "./controls";
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
  createColumns,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
  type DatalistProps,
  type ColumnConfig,
  Pagination,
  type PaginationProps,
} from "./data-display";

// ========================================
// Layout Components
// ========================================
export {
  Sidebar,
  type SidebarProps,
  SidebarToggle,
  type SidebarToggleProps,
  SidebarNav,
  SidebarItem,
  SidebarDivider,
  SidebarMobileToggle,
  type SidebarMobileToggleProps,
  HorizontalNav,
  type HorizontalNavProps,
  useSidebar,
  type SidebarNavProps,
  type SidebarItemProps,
  type SidebarDividerProps,
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain,
  type AppLayoutProps,
  type AppHeaderProps,
  type AppSidebarProps,
  type AppMainProps,
  Page,
  type PageProps,
  Section,
  type SectionProps,
  Panel,
  type PanelProps,
  PanelHeader,
  type PanelHeaderProps,
  PanelBody,
  type PanelBodyProps,
  Grid,
  GridItem,
  type GridProps,
  type GridItemProps,
  Flex,
  type FlexProps,
  Card,
  type CardProps,
  CardContent,
  type CardContentProps,
  CardHeader,
  type CardHeaderProps,
  CardFooter,
  type CardFooterProps,
} from "./layout";

// ========================================
// Intrexx Components
// ========================================

export { IntrexxIcon, type IntrexxIconProps, SortableTree } from "./intrexx";
export type { SortableTreeHandle } from "./intrexx";

// ========================================
// Shared Hooks
// ========================================
// export { useMediaQuery, useClickOutside, useFocus, useDebounce } from './hooks';

export {
  useUrlPagination,
  type UseUrlPaginationOptions,
  useUrlFilters,
  type UseUrlFiltersOptions,
  useUrlSort,
  type UseUrlSortOptions,
  createPagination,
  type PaginationState,
  type UsePaginationOptions,
  usePersistedState,
  type StorageType,
  createFilter,
  usePagination,
  type FilterState,
  type CreateFilterOptions,
  type FilterRefactorState,
  type UseFilterRefactorOptions,
  useFilterRefactor,
} from "./hooks";

// ========================================
// Router
// ========================================
export { Router, Route, Link, Switch } from "./Router";

export {
  useSearch,
  useLocation,
  useParams,
  useRoute,
  useSearchParams,
  useParamState,
  useNavigation,
  createRoute,
} from "./Router/hooks";

export type { SetSearchParams, URLSearchParamsInit } from "./Router/hooks";

// ========================================
// Stores
// ========================================
export {
  createPaginationStore,
  type PaginationStore,
  usePaginationSync,
  type PaginationSyncOptions,
  createLocalStoragePersistor,
  createSessionStoragePersistor,
  type PersistorConfig,
  createFilterStore,
  type FilterRecord,
  type FilterStore,
  type FilterStoreOptions,
  createSortingStore,
  type SortDirection,
  type SortEntry,
  type SortingStore,
  type SortingStoreOptions,
  createValueStore,
  type ValueStore,
  type ValueStoreOptions,
  useRouterSync,
  type RouterSyncOptions,
} from "./stores";

// ========================================
// Utilities
// ========================================
export {
  u,
  type Breakpoint,
  type Responsive,
  type ResponsiveSpacingValue,
  type UtilityInput,
} from "./utils";

// ========================================
// Types
// ========================================
// export type { ComponentProps } from './types';
// export type { FormProps, FormFieldProps } from './types';
// export type { TableProps, DataTableProps } from './types';
