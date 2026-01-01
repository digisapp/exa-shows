"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

export type GlassButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "danger";
export type GlassButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<GlassButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[#00BFFF] via-[#FF69B4] to-[#FF00FF]
    bg-[length:200%_auto]
    text-white font-semibold
    border border-white/20
    hover:bg-right hover:shadow-[0_0_25px_rgba(255,105,180,0.6)]
  `,
  secondary: `
    bg-transparent
    border-2 border-[#00BFFF]
    text-[#00BFFF] font-semibold
    hover:bg-[#00BFFF]/10 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]
  `,
  ghost: `
    bg-white/5
    backdrop-blur-md
    border border-white/10
    text-white font-medium
    hover:bg-white/10 hover:border-white/20
  `,
  gold: `
    bg-gradient-to-r from-[#FFED4E] to-[#FFD700]
    text-[#1a0033] font-bold
    border border-[#FFED4E]/50
    hover:shadow-[0_0_30px_rgba(255,237,78,0.7)]
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-red-600
    text-white font-semibold
    border border-red-400/30
    hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]
  `,
};

const sizeStyles: Record<GlassButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          // Base styles
          "inline-flex items-center justify-center gap-2",
          "transition-all duration-300 ease-out",
          "transform hover:-translate-y-0.5 active:translate-y-0",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          // Custom classes
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export default GlassButton;
