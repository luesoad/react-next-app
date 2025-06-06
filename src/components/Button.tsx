"use client";
import "../styles/button.scss";
import * as RadixButton from "@radix-ui/themes";
const LoadingSpinner = "/icons/loading-spinner.svg";
import { ButtonProps } from "../types/Button";

const Button: React.FC<ButtonProps & { loadingText?: string }> = ({
  onClick,
  variant = "primary",
  className = "",
  loading = false,
  loadingText = "Loading...",
  children,
  type = "button",
  ...rest
}) => {
  return (
    <RadixButton.Button asChild>
      <button
        onClick={loading ? undefined : onClick}
        disabled={loading || rest.disabled}
        type={type}
        aria-busy={loading}
        className={`
                    btn
                    btn-${variant}
                    ${loading ? "btn-loading" : ""}
                    ${className}
                `}
        {...rest}
      >
        {loading ? (
          <>
            <img
              src={LoadingSpinner}
              alt=""
              className="inline w-4 h-4 me-3 animate-spin"
              aria-hidden="true"
            />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    </RadixButton.Button>
  );
};

export default Button;
