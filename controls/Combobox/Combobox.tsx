import React, { forwardRef, useState, useMemo, useRef, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./Combobox.css";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /**
   * Combobox variant
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Combobox size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Label for the combobox
   */
  label?: string;

  /**
   * Helper text below combobox
   */
  helperText?: string;

  /**
   * Error message (shows when error is true)
   */
  errorMessage?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Current value
   */
  value?: string;

  /**
   * Default value
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onValueChange?: (value: string) => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Combobox options - array of {value, label} or {value, label, disabled}
   */
  options: ComboboxOption[];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Allow creating new options when no match is found
   */
  allowCreate?: boolean;
}

/**
 * Combobox Component
 *
 * Accessible combobox/autocomplete component built with Radix UI Popover.
 * Allows users to search and select from a list of options with keyboard navigation.
 *
 * @example
 * ```tsx
 * <Combobox
 *   label="Country"
 *   placeholder="Search countries..."
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *     { value: "ca", label: "Canada" },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      label,
      helperText,
      errorMessage,
      placeholder,
      value,
      defaultValue,
      onValueChange,
      disabled,
      options,
      className,
      allowCreate = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const initialValue = value || defaultValue || "";
    const initialOption = options.find((opt) => opt.value === initialValue);
    const [searchValue, setSearchValue] = useState(initialOption?.label || "");
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputId = useRef(`combobox-input-${Math.random().toString(36).substr(2, 9)}`);

    // Combine external ref with internal ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    // Update search value when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
        const option = options.find((opt) => opt.value === value);
        if (option && !open) {
          setSearchValue(option.label);
        }
      }
    }, [value, options, open]);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchValue) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue]);

    // Get selected option label
    const selectedLabel = useMemo(() => {
      const option = options.find((opt) => opt.value === selectedValue);
      return option?.label || "";
    }, [options, selectedValue]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchValue(newValue);
      setHighlightedIndex(0);
      if (!open) {
        setOpen(true);
      }
    };

    // Handle option selection
    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      const option = options.find((opt) => opt.value === optionValue);
      setSearchValue(option?.label || "");
      setOpen(false);
      onValueChange?.(optionValue);
      inputRef.current?.blur();
    };

    // Handle input focus
    const handleFocus = () => {
      if (!disabled) {
        setOpen(true);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setOpen(true);
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setOpen(true);
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (open && filteredOptions.length > 0) {
            const option = filteredOptions[highlightedIndex];
            if (option && !option.disabled) {
              handleSelect(option.value);
            }
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setSearchValue(selectedLabel);
          inputRef.current?.blur();
          break;
        case "Tab":
          if (open) {
            setOpen(false);
            setSearchValue(selectedLabel);
          }
          break;
      }
    };

    // Handle popover close
    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        setSearchValue(selectedLabel);
        setHighlightedIndex(0);
      }
    };

    // Scroll highlighted item into view
    useEffect(() => {
      if (open && listRef.current) {
        const highlightedElement = listRef.current.querySelector(
          `[data-index="${highlightedIndex}"]`,
        );
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }
      }
    }, [highlightedIndex, open]);

    return (
      <FormControl
        label={label}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        htmlFor={inputId.current}
      >
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Anchor asChild>
            <div className="combobox">
              <input
                ref={inputRef}
                id={inputId.current}
                type="text"
                className={clsx(
                  "combobox__input",
                  `combobox__input--${variant}`,
                  `combobox__input--${size}`,
                  error && "combobox__input--error",
                  disabled && "combobox__input--disabled",
                )}
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                role="combobox"
                aria-expanded={open}
                aria-controls="combobox-listbox"
                aria-autocomplete="list"
                aria-activedescendant={
                  open && filteredOptions[highlightedIndex]
                    ? `combobox-option-${filteredOptions[highlightedIndex].value}`
                    : undefined
                }
              />
              <span className="combobox__icon" aria-hidden="true">
                {open ? "▲" : "▼"}
              </span>
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              className="combobox__content"
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div
                ref={listRef}
                className="combobox__listbox"
                role="listbox"
                id="combobox-listbox"
              >
                {filteredOptions.length === 0 ? (
                  <div className="combobox__empty">
                    {allowCreate
                      ? `Press Enter to create "${searchValue}"`
                      : "No options found"}
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      id={`combobox-option-${option.value}`}
                      role="option"
                      aria-selected={selectedValue === option.value}
                      aria-disabled={option.disabled}
                      data-index={index}
                      className={clsx(
                        "combobox__option",
                        highlightedIndex === index && "combobox__option--highlighted",
                        selectedValue === option.value && "combobox__option--selected",
                        option.disabled && "combobox__option--disabled",
                      )}
                      onClick={() => {
                        if (!option.disabled) {
                          handleSelect(option.value);
                        }
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {option.label}
                      {selectedValue === option.value && (
                        <span className="combobox__check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </FormControl>
    );
  },
);

Combobox.displayName = "Combobox";
