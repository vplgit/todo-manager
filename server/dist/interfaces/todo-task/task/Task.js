"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(description, dueDate, tags) {
        this.description = description;
        this.dueDate = dueDate || null;
        this.completed = false;
        this.tags = tags || [];
    }
    markCompleted() {
        this.completed = true;
    }
}
exports.Task = Task;
