"use client";

import { clsx } from "clsx";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "pink" | "cyan";
  className?: string;
}

const sizeStyles = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

const colorStyles = {
  white: "border-white/30 border-t-white",
  pink: "border-[#FF69B4]/30 border-t-[#FF69B4]",
  cyan: "border-[#00BFFF]/30 border-t-[#00BFFF]",
};

export function LoadingSpinner({
  size = "md",
  color = "white",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        "rounded-full animate-spin",
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    />
  );
}

// Full page loading spinner
export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#000033]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" color="pink" />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
