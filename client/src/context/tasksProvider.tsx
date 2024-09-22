"use client";

import { Task } from "@/types/task.interface";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

interface TasksContextType {
  tasks: Task[] | null;
  createTask(task: Task): void;
  updateTask(Task: Task): void;
  deleteTask(taskId: string): void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksProviderProps {
  initialTasks: Task[] | null;
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({
  initialTasks,
  children,
}) => {
  const [tasks, setTasks] = useState<Task[] | null>(initialTasks);

  const createTask = useCallback((task: Task) => {
    setTasks((state) => {
      const taskExists = state?.some(
        (existingTask) => existingTask.id === task.id,
      );

      if (!taskExists) {
        return [...(state || []), task];
      }

      return state;
    });
  }, []);

  const updateTask = useCallback((task: Task) => {
    setTasks(
      (state) =>
        state &&
        state.map((stateTask) => (stateTask.id === task.id ? task : stateTask)),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((state) => state && state.filter((task) => task.id !== taskId));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      createTask,
      updateTask,
      deleteTask,
    }),
    [tasks, createTask, updateTask, deleteTask],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
