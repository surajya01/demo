import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  helperText?: string;
  options?: Array<{ label: string; value: string | number }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, helperText, id, options, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-lg border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2 pr-9 text-sm text-[#292D2A] transition-all focus:border-[#234B3C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#234B3C] disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#5A615C]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-rose-600">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-[#5A615C]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
