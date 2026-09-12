import { InputHTMLAttributes, forwardRef, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const fieldBaseStyles =
  "w-full rounded border border-badge-freehold-border bg-surface-card px-3.5 py-2.5 font-body text-body-md text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary disabled:opacity-50";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBaseStyles, className)} {...props} />
  )
);
Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBaseStyles, "min-h-[120px] resize-y", className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBaseStyles, "cursor-pointer appearance-none", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

/** Wraps a field with its label + error message so every form in the app
 * gets the same spacing/typography without repeating markup. */
export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-body text-label-lg text-text-primary">
        {label}
      </label>
      {children}
      {error && <p className="font-body text-body-sm text-error">{error}</p>}
    </div>
  );
}
