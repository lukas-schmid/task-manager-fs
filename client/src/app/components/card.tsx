import { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ children, ...rest }: PropsWithChildren<CardProps>) => {
  const className = twMerge("p-6 bg-card rounded", rest.className);
  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};
