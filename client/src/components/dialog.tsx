import React from "react";
import { Button } from "./button";

interface DialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg bg-white p-6 shadow-lg max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-8">{message}</p>
      <div className="flex justify-end gap-3">
        <Button
          className="text-sm bg-transparent hover:bg-transparent hover:font-semibold"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="text-white" onClick={onConfirm}>
          OK
        </Button>
      </div>
    </dialog>
  );
};

export default Dialog;
