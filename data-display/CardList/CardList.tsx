import React from "react";
import "./CardList.css";

export interface CardListProps<T> {
  /**
   * Array of items to display as cards
   */
  items: T[];

  /**
   * Function to render each card item
   */
  renderCard: (item: T, index: number) => React.ReactNode;

  /**
   * Function to get unique key for each item
   */
  getKey?: (item: T, index: number) => React.Key;

  /**
   * Number of columns in the grid
   * @default 3
   */
  columns?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show loading state
   */
  isLoading?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Gap between cards (CSS value)
   * @default "1rem"
   */
  gap?: string;
}

/**
 * CardList Component
 *
 * Displays items in a responsive grid of cards.
 *
 * @example
 * ```tsx
 * interface Product {
 *   id: string;
 *   name: string;
 *   price: number;
 * }
 *
 * const products: Product[] = [...];
 *
 * <CardList
 *   items={products}
 *   columns={3}
 *   renderCard={(product) => (
 *     <div>
 *       <h3>{product.name}</h3>
 *       <p>${product.price}</p>
 *     </div>
 *   )}
 *   getKey={(product) => product.id}
 * />
 * ```
 */

function CardListInner<T>(
  {
    items,
    renderCard,
    getKey,
    columns = 3,
    className,
    isLoading = false,
    emptyMessage = "No items",
    gap = "1rem",
  }: CardListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement | null {
  if (isLoading) {
    return (
      <div className="card-list__loading">
        <span>Loading...</span>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="card-list__empty">
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="card-list"
      style={
        {
          "--card-list-columns": columns,
          "--card-list-gap": gap,
        } as React.CSSProperties
      }
    >
      <div className={`card-list__grid ${className || ""}`}>
        {items.map((item, index) => (
          <div
            key={getKey ? getKey(item, index) : index}
            className="card-list__item"
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

type CardListGeneric = <T>(
  props: CardListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement | null;

export const CardList = React.forwardRef(
  CardListInner,
) as unknown as CardListGeneric;
