import { messages } from "../../common/http-states/messages";
import { statusCodes } from "../../common/http-states/status_code";

import { TypeTask } from "./model/task.model";

import { Task } from "../../interfaces/todo-task/task/Task";
import { TaskBuilder } from "../../interfaces/todo-task/task/TaskBuilder";
import { Memento } from "../../interfaces/todo-task/momento/Momento";
import { Caretaker } from "../../interfaces/todo-task/momento/Caretaker";
export class Service {
  tasks: Task[] = [];
  caretaker: any = new Caretaker<Task[]>();
  saveState = () => {
    this.caretaker.addMemento(new Memento([...this.tasks]));
  };

  //service to get list of tasks
  getList = async (body: TypeTask) => {
    try {
      const { filter } = body;
      let filteredTasks = this.tasks;
      if (filter === "completed") {
        filteredTasks = this.tasks.filter((task: any) => task.completed);
      } else if (filter === "pending") {
        filteredTasks = this.tasks.filter((task) => !task.completed);
      }
      if (filteredTasks) {
        return {
          statusCode: statusCodes.suceess,
          message: messages.success,
          result: filteredTasks,
        };
      } else {
        return {
          statusCode: statusCodes.badRequest,
          message: messages.taskNotFound,
          result: null,
        };
      }
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };

  //service to save tasks
  saveData = async (body: TypeTask) => {
    try {
      const { description, dueDate, tags } = body;
      const taskBuilder = new TaskBuilder(description);
      if (dueDate) taskBuilder.setDueDate(dueDate);
      if (tags) taskBuilder.setTags(tags);
      const task = taskBuilder.build();
      this.tasks.push(task);
      this.saveState();
      return {
        statusCode: statusCodes.suceess,
        message: messages.success,
        result: this.tasks,
      };
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };

  //service to change status of task/update task
  markComplete = async (body: TypeTask) => {
    try {
      const { description } = body;
      const task = this.tasks.find((task) => task.description === description);
      if (task) {
        task.markCompleted();
        this.saveState();
        return {
          statusCode: statusCodes.suceess,
          message: messages.success,
          result: task,
        };
      } else {
        return {
          statusCode: statusCodes.notFound,
          message: messages.taskNotFound,
          result: null,
        };
      }
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };

  //service to delete task
  deleteData = async (body: TypeTask) => {
    try {
      const { description } = body;
      this.tasks = this.tasks.filter(
        (task) => task.description !== description
      );
      this.saveState();
      return {
        statusCode: statusCodes.suceess,
        message: messages.taskDeleted,
        result: this.tasks,
      };
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };

  //service for task undo
  undoTask = async (data: any) => {
    try {
      const previousState = this.caretaker.undo();
      if (previousState) {
        this.tasks = previousState;
        return {
          statusCode: statusCodes.suceess,
          message: messages.undoSuccessfull,
          result: this.tasks,
        };
      } else {
        return {
          statusCode: statusCodes.badRequest,
          message: messages.noActionToUndo,
          result: this.tasks,
        };
      }
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };

  //service for task redu
  redoTask = async (data: any) => {
    try {
      const nextState = this.caretaker.redo();
      if (nextState) {
        this.tasks = nextState;
        return {
          statusCode: statusCodes.suceess,
          message: messages.redoSuccessfull,
          result: this.tasks,
        };
      } else {
        return {
          statusCode: statusCodes.badRequest,
          message: messages.noActionToRedo,
          result: this.tasks,
        };
      }
    } catch (error) {
      return {
        statusCode: statusCodes.internalServerError,
        error: messages.interalServerError,
        result: null,
      };
    }
  };
}
