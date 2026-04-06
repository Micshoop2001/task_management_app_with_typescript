// ItemReducer.ts

import type ItemComponentActions from "./ItemComponentActions";
import type ItemState from "./ItemState";

const itemReducer = (
  state: ItemState,
  action: ItemComponentActions,
): ItemState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                task: action.payload.task,
                description: action.payload.description,
              }
            : item,
        ),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item,
        ),
      };
    case "UPDATE_PRIORITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, priority: action.payload.priority }
            : item,
        ),
      };
    default:
      return state;
  }
};

export default itemReducer;
