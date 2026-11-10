import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
      md: "px-5 py-2.5 text-sm font-semibold gap-2",
      lg: "px-6 py-3.5 text-base font-semibold gap-2.5",
    }[size];

    const variantStyles = {
      primary:
        "bg-[#234B3C] text-white hover:bg-[#1A372C] focus:ring-[#234B3C] shadow-sm",
      secondary:
        "bg-[#F4EFE5] text-[#292D2A] hover:bg-[#E8DEC9] focus:ring-[#C5A46D]",
      gold:
        "bg-[#C5A46D] text-white hover:bg-[#B08A4E] focus:ring-[#C5A46D] shadow-sm",
      outline:
        "border border-[#234B3C] text-[#234B3C] hover:bg-[#234B3C]/5 focus:ring-[#234B3C]",
      ghost:
        "text-[#292D2A] hover:bg-[#F4EFE5] focus:ring-[#234B3C]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles, variantStyles, className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
