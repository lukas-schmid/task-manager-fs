"use client";

import { InputHTMLAttributes, useCallback, useEffect, useRef } from "react";

interface InlineFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  name: string;
  isEditing: boolean;
  setIsEditing(value: boolean): void;
  action(payload: FormData): void;
}

export const InlineFormInput = ({
  text,
  name,
  isEditing,
  setIsEditing,
  action,
  ...rest
}: InlineFormInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full">
      {isEditing ? (
        <form action={action} className="w-full inline-block">
          <input
            name={name}
            ref={inputRef}
            type="text"
            className="w-full px-1 py-2 bg-card border-none"
            onBlur={handleBlur}
            {...rest}
          />
        </form>
      ) : (
        <p className="truncate overflow-hidden">{text}</p>
      )}
    </div>
  );
};
