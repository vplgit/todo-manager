import { Task } from "./Task";

export class TaskBuilder {
  private description: string;
  private dueDate?: string;
  private tags?: string[];

  constructor(description: string) {
    this.description = description;
  }

  setDueDate(dueDate: string): TaskBuilder {
    this.dueDate = dueDate;
    return this;
  }

  setTags(tags: string[]): TaskBuilder {
    this.tags = tags;
    return this;
  }

  build(): Task {
    return new Task(this.description, this.dueDate, this.tags);
  }
}
