"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { clsx } from "clsx";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showClose = true,
}: GlassModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Lock body scroll and add escape listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fade-in_0.3s_ease]" />

      {/* Modal */}
      <div
        className={clsx(
          // Base styles
          "relative w-full",
          "bg-gradient-to-br from-[#1a0033]/95 to-[#2d1b69]/95",
          "backdrop-blur-xl",
          "border border-white/10",
          "rounded-3xl",
          "shadow-2xl",
          "max-h-[90vh] overflow-y-auto",
          // Animation
          "animate-[slide-up_0.3s_ease]",
          // Size
          sizeStyles[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 pb-0">
            {title && (
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="ml-auto p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default GlassModal;
