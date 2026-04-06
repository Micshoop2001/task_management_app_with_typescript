// Item.ts

interface Item {
  id: number;
  task: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export type { Item };
