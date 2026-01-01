"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              // Base styles
              "w-full",
              "bg-black/30",
              "border border-white/20",
              "rounded-xl",
              "text-white",
              "placeholder:text-white/50",
              "transition-all duration-300",
              // Focus styles
              "focus:outline-none",
              "focus:border-[#00BFFF]",
              "focus:shadow-[0_0_15px_rgba(0,191,255,0.3)]",
              // Error styles
              error && "border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(255,0,0,0.3)]",
              // Padding
              icon ? "pl-12 pr-4 py-3.5" : "px-4 py-3.5",
              // Custom classes
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
