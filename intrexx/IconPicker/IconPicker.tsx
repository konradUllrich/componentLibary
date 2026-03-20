import React, { forwardRef, useState, useMemo } from "react";
import clsx from "clsx";
import { categories, icons } from "./icons";
import "./IconPicker.css";

export interface IconPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Callback fired when the user selects an icon */
  onSelectIcon?: (icon: {
    category: string;
    name: string;
    className: string;
  }) => void;
  /** className of the currently selected icon */
  selectedIcon?: string;
  /** Maximum height of the scrollable icon grid */
  maxHeight?: string;
  /** Default icon style shown on first render */
  defaultStyle?: "line" | "solid";
}

/**
 * IconPicker – Browse and select icons from the Intrexx icon font.
 *
 * Supports search, category filtering and style toggling (line / solid).
 *
 * @example
 * <IconPicker onSelectIcon={(icon) => console.log(icon.className)} />
 */
export const IconPicker = forwardRef<HTMLDivElement, IconPickerProps>(
  (
    {
      onSelectIcon,
      selectedIcon,
      maxHeight = "600px",
      defaultStyle = "line",
      className,
      ...props
    },
    ref,
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategories, setActiveCategories] = useState<Set<number>>(
      new Set(categories.map((_, i) => i)),
    );
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const [iconStyle, setIconStyle] = useState<"line" | "solid">(defaultStyle);

    const toggleCategory = (categoryId: number) => {
      setActiveCategories((prev) => {
        const next = new Set(prev);
        if (next.has(categoryId)) {
          next.delete(categoryId);
        } else {
          next.add(categoryId);
        }
        return next;
      });
    };

    const toggleAllCategories = () => {
      if (activeCategories.size === categories.length) {
        setActiveCategories(new Set());
      } else {
        setActiveCategories(new Set(categories.map((_, i) => i)));
      }
    };

    const filteredIcons = useMemo(() => {
      const searchLower = searchTerm.toLowerCase();
      const stylePrefix = iconStyle === "line" ? "icon54-l_" : "icon54-s_";

      return icons
        .map((icon, index) => ({
          ...icon,
          index,
          category: categories[icon.c],
          className: `${stylePrefix}${categories[icon.c]}-${icon.n}`,
        }))
        .filter((icon) => {
          if (!activeCategories.has(icon.c)) return false;
          if (searchTerm) {
            return (
              icon.n.toLowerCase().includes(searchLower) ||
              icon.category.toLowerCase().includes(searchLower)
            );
          }
          return true;
        });
    }, [searchTerm, activeCategories, iconStyle]);

    const groupedIcons = useMemo(() => {
      const groups: Record<string, typeof filteredIcons> = {};
      filteredIcons.forEach((icon) => {
        if (!groups[icon.category]) {
          groups[icon.category] = [];
        }
        groups[icon.category].push(icon);
      });
      return groups;
    }, [filteredIcons]);

    const handleIconClick = (icon: (typeof filteredIcons)[0]) => {
      onSelectIcon?.({
        category: icon.category,
        name: icon.n,
        className: icon.className,
      });
    };

    const activeCategoryCount = activeCategories.size;

    return (
      <div
        ref={ref}
        className={clsx("icon-picker", className)}
        {...props}
      >
        {/* Search and Filter Header */}
        <div className="icon-picker__header">
          <div className="icon-picker__search">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="icon-picker__search-input"
              aria-label="Search icons"
            />
            {searchTerm && (
              <button
                type="button"
                className="icon-picker__clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Icon Style Toggle */}
          <div
            className="icon-picker__style-toggle"
            role="group"
            aria-label="Icon style"
          >
            <button
              type="button"
              className={clsx(
                "icon-picker__style-btn",
                iconStyle === "line" && "icon-picker__style-btn--active",
              )}
              onClick={() => setIconStyle("line")}
              aria-pressed={iconStyle === "line"}
              title="Line style icons"
            >
              Line
            </button>
            <button
              type="button"
              className={clsx(
                "icon-picker__style-btn",
                iconStyle === "solid" && "icon-picker__style-btn--active",
              )}
              onClick={() => setIconStyle("solid")}
              aria-pressed={iconStyle === "solid"}
              title="Solid style icons"
            >
              Solid
            </button>
          </div>

          <button
            type="button"
            className="icon-picker__category-toggle"
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            aria-expanded={showCategoryFilter}
          >
            Categories ({activeCategoryCount}/{categories.length})
            <span
              className={clsx(
                "icon-picker__arrow",
                showCategoryFilter && "icon-picker__arrow--up",
              )}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>
        </div>

        {/* Category Filter Panel */}
        {showCategoryFilter && (
          <div className="icon-picker__category-filter">
            <div className="icon-picker__category-actions">
              <button
                type="button"
                className="icon-picker__category-action-btn"
                onClick={toggleAllCategories}
              >
                {activeCategories.size === categories.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              <span className="icon-picker__category-count">
                {activeCategoryCount} of {categories.length} selected
              </span>
            </div>

            <div className="icon-picker__category-list">
              {categories.map((category, index) => (
                <label key={index} className="icon-picker__category-item">
                  <input
                    type="checkbox"
                    checked={activeCategories.has(index)}
                    onChange={() => toggleCategory(index)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="icon-picker__results-info" aria-live="polite">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}{" "}
          found
        </div>

        {/* Icon Grid */}
        <div
          className="icon-picker__content"
          style={{ maxHeight }}
        >
          {Object.keys(groupedIcons).length === 0 ? (
            <div className="icon-picker__no-results">
              No icons found. Try adjusting your search or category filters.
            </div>
          ) : (
            Object.entries(groupedIcons).map(([category, categoryIcons]) => (
              <div key={category} className="icon-picker__category-group">
                <h3 className="icon-picker__category-title">
                  {category} ({categoryIcons.length})
                </h3>
                <div className="icon-picker__icon-grid">
                  {categoryIcons.map((icon) => (
                    <button
                      type="button"
                      key={icon.index}
                      className={clsx(
                        "icon-picker__icon-button",
                        selectedIcon === icon.className &&
                          "icon-picker__icon-button--selected",
                      )}
                      onClick={() => handleIconClick(icon)}
                      title={`${icon.category} - ${icon.n}`}
                      aria-pressed={selectedIcon === icon.className}
                    >
                      <i className={icon.className} aria-hidden="true" />
                      <span className="icon-picker__icon-name">{icon.n}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
);

IconPicker.displayName = "IconPicker";
