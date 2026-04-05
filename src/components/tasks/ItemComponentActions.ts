// ItemComponentActions.ts

import type { Item } from "./Item";

type ItemComponentActions =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: number }
  | {
      type: "EDIT_ITEM";
      payload: { id: number; task: string; description: string };
    }
  | { type: "UPDATE_STATUS"; payload: { id: number; status: Item["status"] } }
  | {
      type: "UPDATE_PRIORITY";
      payload: { id: number; priority: Item["priority"] };
    };

export type { ItemComponentActions as default };
