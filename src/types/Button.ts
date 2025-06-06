import { ButtonProps as RadixButtonProps } from "@radix-ui/themes";

export interface ButtonProps
  extends Omit<RadixButtonProps, "color" | "variant"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  className?: string;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}
