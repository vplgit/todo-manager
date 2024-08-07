"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caretaker = void 0;
class Caretaker {
    constructor() {
        this.mementos = [];
        this.current = -1;
    }
    addMemento(memento) {
        this.mementos = this.mementos.slice(0, this.current + 1);
        this.mementos.push(memento);
        this.current++;
    }
    undo() {
        if (this.current > 0) {
            this.current--;
            return this.mementos[this.current].getState();
        }
        return null;
    }
    redo() {
        if (this.current < this.mementos.length - 1) {
            this.current++;
            return this.mementos[this.current].getState();
        }
        return null;
    }
}
exports.Caretaker = Caretaker;
