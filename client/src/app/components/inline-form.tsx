"use client";

import { useCallback, useEffect, useRef } from "react";

interface InlineFormProps {
  text: string;
  name: string;
  isEditing: boolean;
  setIsEditing(value: boolean): void;
  action(payload: FormData): void;
}

export const InlineForm = ({
  text,
  name,
  isEditing,
  setIsEditing,
  action,
}: InlineFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full max-w-xs">
      {isEditing ? (
        <form action={action} className="inline-block">
          <input
            name={name}
            ref={inputRef}
            type="text"
            placeholder="Board name"
            className="px-1 py-2 bg-card border-none"
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};
