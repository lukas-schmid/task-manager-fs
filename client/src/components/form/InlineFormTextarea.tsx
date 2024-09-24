"use client";

import { Save, X } from "lucide-react";
import { InputHTMLAttributes, useCallback, useEffect, useRef } from "react";

interface InlineFormTextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  text: string;
  name: string;
  isEditing: boolean;
  setIsEditing(value: boolean): void;
  action(payload: FormData): void;
}

export const InlineFormTextarea = ({
  text,
  name,
  isEditing,
  setIsEditing,
  action,
  ...rest
}: InlineFormTextareaProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const cancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(false);
    },
    [setIsEditing],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      action(formData);
      setIsEditing(false);
    },
    [action, setIsEditing],
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full">
      {isEditing ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full min-h-60 gap-4"
          >
            <textarea
              name={name}
              ref={inputRef}
              className="grow px-1 py-2 bg-card border-none w-full h-full"
              {...rest}
            />
            <div className="flex gap-4">
              <button type="submit">
                <Save size={20} />
              </button>
              <button onClick={cancel} type="button">
                <X size={20} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};
