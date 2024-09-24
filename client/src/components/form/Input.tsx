import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: ReactNode;
}

export const Input = ({ name, label, error, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col text-sm gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        className="px-1 py-2 bg-muted rounded border"
        name={name}
        {...rest}
      />
      <div className="text-red-500 text-xs">{error}</div>
    </div>
  );
};
