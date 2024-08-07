"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskBuilder = void 0;
const Task_1 = require("./Task");
class TaskBuilder {
    constructor(description) {
        this.description = description;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
        return this;
    }
    setTags(tags) {
        this.tags = tags;
        return this;
    }
    build() {
        return new Task_1.Task(this.description, this.dueDate, this.tags);
    }
}
exports.TaskBuilder = TaskBuilder;
