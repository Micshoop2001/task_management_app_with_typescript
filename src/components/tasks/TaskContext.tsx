import React, { createContext, useReducer } from "react";
import type { Item } from "./Item";
import type ItemComponentActions from "./ItemComponentActions";
import itemReducer from "./ItemReducer";

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
  const [state, dispatch] = useReducer(itemReducer, { items: [] });
  const [editingItemId, setEditingItemId] = React.useState<number | null>(null);
  const [editingTask, setEditingTask] = React.useState("");
  const [editingDescription, setEditingDescription] = React.useState("");

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
