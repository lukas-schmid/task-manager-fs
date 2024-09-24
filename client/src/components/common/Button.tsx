import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const className = twMerge(
    "flex items-center justify-center px-6 py-2 rounded bg-primary hover:bg-primary/80",
    rest.className,
  );
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
};
