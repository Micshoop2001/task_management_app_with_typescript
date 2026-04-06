import React, { createContext, useEffect, useReducer } from "react";
import type { Item } from "./Item";
import type ItemComponentActions from "./ItemComponentActions";
import itemReducer from "./ItemReducer";

const TASKS_STORAGE_KEY = "task-management-items";

const getInitialTaskState = () => {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  const storedItems = window.localStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedItems) {
    return { items: [] };
  }

  try {
    return {
      items: JSON.parse(storedItems) as Item[],
    };
  } catch {
    return { items: [] };
  }
};

type TaskContextType = {
  state: { items: Item[] };
  dispatch: React.Dispatch<ItemComponentActions>;
  editingItemId: number | null;
  editingTask: string;
  editingDescription: string;
  setEditingItemId: (id: number | null) => void;
  setEditingTask: (task: string) => void;
  setEditingDescription: (description: string) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const useTasks = () => {
  const context = React.useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    itemReducer,
    undefined,
    getInitialTaskState,
  );
  const [editingItemId, setEditingItemId] = React.useState<number | null>(null);
  const [editingTask, setEditingTask] = React.useState("");
  const [editingDescription, setEditingDescription] = React.useState("");

  useEffect(() => {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const contextValue: TaskContextType = {
    state,
    dispatch,
    editingItemId,
    editingTask,
    editingDescription,
    setEditingItemId,
    setEditingTask,
    setEditingDescription,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
