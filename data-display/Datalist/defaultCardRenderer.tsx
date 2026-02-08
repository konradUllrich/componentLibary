import { Table as TanstackTable } from "@tanstack/react-table";
import { Card, CardContent } from "../../layout/Card";

/**
 * Default card renderer for Datalist component
 * Automatically renders all columns as card fields
 */
export const createDefaultCardRenderer = <T extends Record<string, unknown>>(
  table: TanstackTable<T>,
) => {
  return (item: T, index: number) => {
    // Find the row in the table that matches this item
    const row = table.getRowModel().rows.find((r) => r.original === item);

    return (
      <Card variant="elevated" padding="md">
        <CardContent>
          {table.getAllLeafColumns().map((column) => {
            const header = column.columnDef.header;
            const headerText = typeof header === "string" ? header : column.id;

            // Get the cell for this column and row
            const cell = row
              ?.getAllCells()
              .find((c) => c.column.id === column.id);

            let renderedValue;

            if (cell && column.columnDef.cell) {
              // Use custom cell renderer if available
              const cellContext = cell.getContext();
              renderedValue =
                typeof column.columnDef.cell === "function"
                  ? column.columnDef.cell(cellContext)
                  : column.columnDef.cell;
            } else {
              // Fallback to raw value extraction
              const columnDef = column.columnDef as {
                accessorKey?: string;
                accessorFn?: (row: T, index: number) => unknown;
              };

              const value = columnDef.accessorKey
                ? (item as Record<string, unknown>)[columnDef.accessorKey]
                : columnDef.accessorFn
                  ? columnDef.accessorFn(item, index)
                  : (item as Record<string, unknown>)[column.id];

              renderedValue =
                value !== null && value !== undefined ? String(value) : "—";
            }

            return (
              <div key={column.id} className="datalist-card__field">
                {headerText && (
                  <span className="datalist-card__label">{headerText}</span>
                )}
                <div className="datalist-card__value">{renderedValue}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };
};
