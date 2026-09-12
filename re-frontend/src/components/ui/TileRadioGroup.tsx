import React from "react";
import { cn } from "@/lib/utils/cn";

export interface TileRadioOption {
  value: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface TileRadioGroupProps {
  name: string;
  options: TileRadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TileRadioGroup({
  name,
  options,
  value,
  onChange,
  className,
}: TileRadioGroupProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3", className)}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "relative flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition-all shadow-sm",
              isSelected
                ? "border-primary bg-surface-tint ring-1 ring-primary"
                : "border-border bg-surface hover:bg-surface-card"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary">{option.icon || <span className="font-bold">&bull;</span>}</span>
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border",
                  isSelected ? "border-primary bg-primary" : "border-border bg-surface-card"
                )}
              >
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
            </div>
            <div>
              <span className="font-display text-headline-sm font-semibold text-primary block">
                {option.title}
              </span>
              {option.subtitle && (
                <span className="mt-1 block font-body text-body-sm text-text-muted leading-snug">
                  {option.subtitle}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
