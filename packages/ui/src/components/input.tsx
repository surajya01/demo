import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-lg border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2 text-sm text-[#292D2A] transition-all placeholder:text-[#5A615C]/60 focus:border-[#234B3C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#234B3C] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-600">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-[#5A615C]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
