"use client";

import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  glow?: "none" | "pink" | "cyan" | "purple" | "gold";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const glowStyles = {
  none: "",
  pink: "shadow-[0_0_30px_rgba(255,105,180,0.3)]",
  cyan: "shadow-[0_0_30px_rgba(0,191,255,0.3)]",
  purple: "shadow-[0_0_30px_rgba(148,0,211,0.3)]",
  gold: "shadow-[0_0_30px_rgba(255,237,78,0.3)]",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = "default",
      padding = "md",
      glow = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          // Base glass styles
          "bg-black/40",
          "backdrop-blur-xl",
          "border border-white/10",
          "rounded-2xl",
          // Padding
          paddingStyles[padding],
          // Glow
          glowStyles[glow],
          // Variant-specific
          variant === "hover" && [
            "transition-all duration-300",
            "hover:border-[#00BFFF]/30",
            "hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]",
            "hover:-translate-y-0.5",
          ],
          variant === "interactive" && [
            "transition-all duration-300",
            "cursor-pointer",
            "hover:border-[#FF69B4]/40",
            "hover:shadow-[0_10px_40px_rgba(255,105,180,0.2)]",
            "hover:-translate-y-1",
            "active:translate-y-0",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
