"use client";

import * as React from "react";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "./utils";

/**
 * Multiselect Component - Permite seleção múltipla de opções
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: "option1", label: "Opção 1" },
 *   { value: "option2", label: "Opção 2", disabled: true },
 *   { value: "option3", label: "Opção 3" },
 * ];
 *
 * // Uso básico
 * <Multiselect
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   placeholder="Selecione opções"
 * />
 *
 * // Com limite de itens exibidos
 * <Multiselect
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   placeholder="Selecione opções"
 *   maxDisplayItems={2}
 * />
 *
 * // Desabilitado
 * <Multiselect
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   disabled
 * />
 * ```
 */

export interface MultiselectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiselectProps {
  options: MultiselectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxDisplayItems?: number;
}

function Multiselect({
  options,
  value = [],
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  className,
  maxDisplayItems = 3,
}: MultiselectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleSelect = (optionValue: string) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(v => v !== optionValue);
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const selectedOptions = options.filter(option =>
    selectedValues.includes(option.value)
  );

  const displayItems = selectedOptions.slice(0, maxDisplayItems);
  const remainingCount = selectedOptions.length - maxDisplayItems;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "border-input flex min-h-9 w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          isOpen && "ring-[3px] ring-ring/50 border-ring"
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1">
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {displayItems.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(option.value, e)}
                    className="ml-1 rounded-sm hover:bg-secondary-foreground/10 focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="text-muted-foreground text-xs">
                  +{remainingCount} mais
                </span>
              )}
            </>
          )}
        </div>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none hover:bg-accent/20 hover:text-accent-foreground",
                    isSelected && "bg-accent text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border",
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                      )}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                    {option.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { Multiselect, type MultiselectProps };