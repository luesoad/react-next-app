import React from "react";

interface SliderControlButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}

export const SliderControlButton = React.forwardRef<HTMLButtonElement, SliderControlButtonProps>(
  ({ direction, onClick, disabled }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      style={{
        borderRadius: 0,
        border: "none",
        background: "var(--primary)",
        color: "var(--button-text)",
        boxShadow: "var(--button-box-shadow)",
        outline: "none",
      }}
      className={`w-10 h-10 flex items-center justify-center mx-1 focus:ring-2 focus:ring-primary-light ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      type="button"
    >
      {direction === "prev" ? "◀" : "▶"}
    </button>
  )
);
