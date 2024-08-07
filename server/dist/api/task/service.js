"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const messages_1 = require("../../common/http-states/messages");
const status_code_1 = require("../../common/http-states/status_code");
const TaskBuilder_1 = require("../../interfaces/todo-task/task/TaskBuilder");
const Momento_1 = require("../../interfaces/todo-task/momento/Momento");
const Caretaker_1 = require("../../interfaces/todo-task/momento/Caretaker");
class Service {
    constructor() {
        this.tasks = [];
        this.caretaker = new Caretaker_1.Caretaker();
        this.saveState = () => {
            this.caretaker.addMemento(new Momento_1.Memento([...this.tasks]));
        };
        //service to get list of tasks
        this.getList = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter } = body;
                console.log("Fileter :", filter);
                let filteredTasks = this.tasks;
                if (filter === "completed") {
                    filteredTasks = this.tasks.filter((task) => task.completed);
                }
                else if (filter === "pending") {
                    filteredTasks = this.tasks.filter((task) => !task.completed);
                }
                if (filteredTasks) {
                    return {
                        statusCode: status_code_1.statusCodes.suceess,
                        message: messages_1.messages.success,
                        result: filteredTasks,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.statusCodes.badRequest,
                        message: messages_1.messages.taskNotFound,
                        result: null,
                    };
                }
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
        //service to save tasks
        this.saveData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, dueDate, tags } = body;
                const taskBuilder = new TaskBuilder_1.TaskBuilder(description);
                if (dueDate)
                    taskBuilder.setDueDate(dueDate);
                if (tags)
                    taskBuilder.setTags(tags);
                const task = taskBuilder.build();
                this.tasks.push(task);
                this.saveState();
                return {
                    statusCode: status_code_1.statusCodes.suceess,
                    message: messages_1.messages.success,
                    result: this.tasks,
                };
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
        //service to change status of task/update task
        this.markComplete = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { description } = body;
                const task = this.tasks.find((task) => task.description === description);
                if (task) {
                    task.markCompleted();
                    this.saveState();
                    return {
                        statusCode: status_code_1.statusCodes.suceess,
                        message: messages_1.messages.success,
                        result: task,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.statusCodes.notFound,
                        message: messages_1.messages.taskNotFound,
                        result: null,
                    };
                }
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
        //service to delete task
        this.deleteData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { description } = body;
                this.tasks = this.tasks.filter((task) => task.description !== description);
                this.saveState();
                return {
                    statusCode: status_code_1.statusCodes.suceess,
                    message: messages_1.messages.taskDeleted,
                    result: this.tasks,
                };
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
        //service for task undo
        this.undoTask = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const previousState = this.caretaker.undo();
                if (previousState) {
                    this.tasks = previousState;
                    return {
                        statusCode: status_code_1.statusCodes.suceess,
                        message: messages_1.messages.undoSuccessfull,
                        result: this.tasks,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.statusCodes.badRequest,
                        message: messages_1.messages.noActionToUndo,
                        result: this.tasks,
                    };
                }
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
        //service for task redu
        this.redoTask = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const nextState = this.caretaker.redo();
                if (nextState) {
                    this.tasks = nextState;
                    return {
                        statusCode: status_code_1.statusCodes.suceess,
                        message: messages_1.messages.redoSuccessfull,
                        result: this.tasks,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.statusCodes.badRequest,
                        message: messages_1.messages.noActionToRedo,
                        result: this.tasks,
                    };
                }
            }
            catch (error) {
                return {
                    statusCode: status_code_1.statusCodes.internalServerError,
                    error: messages_1.messages.interalServerError,
                    result: null,
                };
            }
        });
    }
}
exports.Service = Service;
