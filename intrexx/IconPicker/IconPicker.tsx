import React, { useState, useMemo } from "react";
import { categories, icons } from "./icons";
import "./IconPicker.css";

export interface IconPickerProps {
  onSelectIcon?: (icon: {
    category: string;
    name: string;
    className: string;
  }) => void;
  selectedIcon?: string; // className of selected icon
  maxHeight?: string;
  defaultStyle?: "line" | "solid"; // Default icon style
}

export const IconPicker: React.FC<IconPickerProps> = ({
  onSelectIcon,
  selectedIcon,
  maxHeight = "600px",
  defaultStyle = "line",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<number>>(
    new Set(categories.map((_, i) => i))
  );
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [iconStyle, setIconStyle] = useState<"line" | "solid">(defaultStyle);

  // Toggle category filter
  const toggleCategory = (categoryId: number) => {
    setActiveCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Select/Deselect all categories
  const toggleAllCategories = () => {
    if (activeCategories.size === categories.length) {
      setActiveCategories(new Set());
    } else {
      setActiveCategories(new Set(categories.map((_, i) => i)));
    }
  };

  // Filter icons based on search and active categories
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
        // Filter by active categories
        if (!activeCategories.has(icon.c)) return false;

        // Filter by search term
        if (searchTerm) {
          return (
            icon.n.toLowerCase().includes(searchLower) ||
            icon.category.toLowerCase().includes(searchLower)
          );
        }
        return true;
      });
  }, [searchTerm, activeCategories, iconStyle]);

  // Group icons by category for display
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
    if (onSelectIcon) {
      onSelectIcon({
        category: icon.category,
        name: icon.n,
        className: icon.className,
      });
    }
  };

  // Count active categories
  const activeCategoryCount = activeCategories.size;

  return (
    <div className="icon-picker">
      {/* Search and Filter Header */}
      <div className="icon-picker__header">
        <div className="icon-picker__search">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="icon-picker__search-input"
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
        <div className="icon-picker__style-toggle">
          <button
            type="button"
            className={`icon-picker__style-btn ${
              iconStyle === "line" ? "icon-picker__style-btn--active" : ""
            }`}
            onClick={() => setIconStyle("line")}
            title="Line style icons"
          >
            Line
          </button>
          <button
            type="button"
            className={`icon-picker__style-btn ${
              iconStyle === "solid" ? "icon-picker__style-btn--active" : ""
            }`}
            onClick={() => setIconStyle("solid")}
            title="Solid style icons"
          >
            Solid
          </button>
        </div>

        <button
          type="button"
          className="icon-picker__category-toggle"
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
        >
          Categories ({activeCategoryCount}/{categories.length})
          <span className={showCategoryFilter ? "arrow-up" : "arrow-down"}>
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
      <div className="icon-picker__results-info">
        {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""} found
      </div>

      {/* Icon Grid */}
      <div className="icon-picker__content" style={{ maxHeight }}>
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
                {categoryIcons.map((icon) => {
                  const isSelected = selectedIcon === icon.className;
                  return (
                    <button
                      type="button"
                      key={icon.index}
                      className={`icon-picker__icon-button ${
                        isSelected ? "icon-picker__icon-button--selected" : ""
                      }`}
                      onClick={() => handleIconClick(icon)}
                      title={`${icon.category} - ${icon.n}`}
                    >
                      <i className={icon.className} />
                      <span className="icon-picker__icon-name">{icon.n}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IconPicker;
