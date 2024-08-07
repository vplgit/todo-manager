"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memento = void 0;
class Memento {
    constructor(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
}
exports.Memento = Memento;
