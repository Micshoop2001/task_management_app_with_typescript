// ItemComponent.tsx

import React, { useState } from "react";
import type { Item } from "./Item";
import EditItemModal from "./EditItemModal";
import { useTasks } from "./TaskContext";
import "../../App.css";

const ItemComponent: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const {
    state,
    dispatch,
    editingItemId,
    editingTask,
    editingDescription,
    setEditingItemId,
    setEditingTask,
    setEditingDescription,
  } = useTasks();

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Date.now(),
      task: itemName,
      description: itemDescription,
      status: "pending",
      priority: "medium",
      createdAt: new Date(),
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
    setItemName("");
    setItemDescription("");
  };

  const removeItem = (itemId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  const editItem = (
    itemId: number,
    newTask: string,
    newDescription: string,
  ) => {
    dispatch({
      type: "EDIT_ITEM",
      payload: { id: itemId, task: newTask, description: newDescription },
    });
  };
  return (
    <div>
      <form onSubmit={addItem} className="form">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <input
          type="text"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder="Enter item description"
        />

        <button type="submit">Add Item</button>
      </form>

      {state.items.length > 0 && (
        <table className="table_form">
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th className="form">Task</th>
              <th className="form">Status</th>
              <th className="form">Description</th>
              <th className="form">Priority</th>
              <th className="form">Created</th>
              <th className="form">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id}>
                <td className="form">{item.task}</td>

                <td className="form">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_STATUS",
                        payload: {
                          id: item.id,
                          status: e.target.value as Item["status"],
                        },
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="form">{item.description}</td>
                <td className="form">
                  <select
                    value={item.priority}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PRIORITY",
                        payload: {
                          id: item.id,
                          priority: e.target.value as Item["priority"],
                        },
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td className="form">{item.createdAt.toLocaleDateString()}</td>
                <td className="form">
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => {
                      setEditingItemId(item.id);
                      setEditingTask(item.task);
                      setEditingDescription(item.description || "");
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <EditItemModal
        isOpen={editingItemId !== null}
        task={editingTask}
        description={editingDescription}
        onTaskChange={setEditingTask}
        onDescriptionChange={setEditingDescription}
        onSave={() => {
          editItem(editingItemId!, editingTask, editingDescription);
          setEditingItemId(null);
        }}
        onCancel={() => setEditingItemId(null)}
      />
    </div>
  );
};

export default ItemComponent;
