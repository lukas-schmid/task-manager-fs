"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { Pencil } from "lucide-react";
import { useTasks } from "@/context/tasksProvider";
import { useSocket } from "@/context/SocketProvider";
import { InlineFormInput } from "@/components/form/InlineFormInput";
import { InlineFormTextarea } from "@/components/form/InlineFormTextarea";
import { ColumnSelect } from "@/components/column/ColumnSelect";
import Dialog from "@/components/common/Dialog";
import { useRouter, usePathname } from "next/navigation";

interface TaskModalProps {
  taskId: string;
  isOpen: boolean;
  onClose(): void;
}

export const TaskModal = ({ taskId, isOpen, onClose }: TaskModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { tasks } = useTasks();
  const { updateTask, deleteTask } = useSocket();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const currentTask = useMemo(() => {
    return tasks?.find((task) => task.id === taskId);
  }, [tasks, taskId]);

  const handleConfirmDelete = () => {
    if (currentTask) {
      deleteTask(currentTask?.id);
      setDialogOpen(false);
      router.push(pathname);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const openDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  const handleTitleClick = useCallback(() => {
    setIsEditingTitle(true);
  }, []);

  const handleDescriptionClick = useCallback(() => {
    setIsEditingDescription(true);
  }, []);

  const handleUpdateTitle = useCallback(
    (payload: FormData) => {
      if (currentTask) {
        const title = payload.get("title") as string;
        updateTask({
          taskId: currentTask.id,
          fields: {
            title,
          },
        });
        setIsEditingTitle(false);
      }
    },
    [updateTask, currentTask],
  );

  const handleUpdateDescription = useCallback(
    (payload: FormData) => {
      if (currentTask) {
        const description = payload.get("description") as string;
        updateTask({
          taskId: currentTask.id,
          fields: {
            description,
          },
        });
        setIsEditingTitle(false);
      }
    },
    [updateTask, currentTask],
  );

  useEffect(() => {
    if (!currentTask) {
      onClose();
    }
  }, [currentTask, onClose]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.addEventListener("click", handleOutsideClick);
    }
    return () => {
      dialog?.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  if (!currentTask) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg bg-secondary p-6 shadow-lg max-w-lg w-full relative text-card-foreground border"
    >
      <div className="flex flex-col gap-5 mb-6">
        <ColumnSelect currentTask={currentTask} />
        <div onClick={handleTitleClick} className="flex items-center gap-2">
          {!isEditingTitle && <Pencil size={10} />}
          <InlineFormInput
            isEditing={isEditingTitle}
            name="title"
            setIsEditing={setIsEditingTitle}
            action={handleUpdateTitle}
            text={currentTask.title}
            defaultValue={currentTask.title}
          />
        </div>
        <div>
          <h3>Description</h3>
          <div
            onClick={handleDescriptionClick}
            className="flex items-start gap-2 min-h-60"
          >
            {!isEditingDescription ? (
              <div
                onClick={handleDescriptionClick}
                className="flex items-center gap-2"
              >
                <Pencil size={10} />
                <p className="whitespace-pre-wrap word-break">
                  {currentTask.description ?? (
                    <span className="text-gray-500">
                      Add more detailed description
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <InlineFormTextarea
                isEditing={isEditingDescription}
                name="description"
                setIsEditing={setIsEditingDescription}
                action={handleUpdateDescription}
                text={currentTask.description ?? "Enter description"}
                defaultValue={currentTask.description}
                placeholder="Enter description"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-${!isEditingDescription ? "between" : "end"} items-center gap-3`}
      >
        {!isEditingDescription && (
          <Button
            className="text-sm bg-transparent text-red-600 hover:Text-red-500 hover:bg-transparent hover:font-semibold"
            onClick={openDialog}
          >
            Delete Task
          </Button>
        )}
        <Button className="text-sm text-white" onClick={onClose}>
          Close
        </Button>
      </div>
      <Dialog
        title="Delete this task?"
        message="Are you sure you want to delete this task including all its content?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        isOpen={isDialogOpen}
      />
    </dialog>
  );
};
