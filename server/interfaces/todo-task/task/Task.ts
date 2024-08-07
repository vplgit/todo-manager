export class Task {
  description: string;
  dueDate: string | null;
  completed: boolean;
  tags: string[];

  constructor(description: string, dueDate?: string, tags?: string[]) {
    this.description = description;
    this.dueDate = dueDate || null;
    this.completed = false;
    this.tags = tags || [];
  }

  markCompleted() {
    this.completed = true;
  }
}
