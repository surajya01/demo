import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, id, rows = 3, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "flex w-full rounded-lg border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] transition-all placeholder:text-[#5A615C]/60 focus:border-[#234B3C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#234B3C] disabled:cursor-not-allowed disabled:opacity-50",
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

Textarea.displayName = "Textarea";
