import { Memento } from "./Momento";

export class Caretaker<T> {
  private mementos: Memento<T>[] = [];
  private current: number = -1;

  addMemento(memento: Memento<T>) {
    this.mementos = this.mementos.slice(0, this.current + 1);
    this.mementos.push(memento);
    this.current++;
  }

  undo(): T | null {
    if (this.current > 0) {
      this.current--;
      return this.mementos[this.current].getState();
    }
    return null;
  }

  redo(): T | null {
    if (this.current < this.mementos.length - 1) {
      this.current++;
      return this.mementos[this.current].getState();
    }
    return null;
  }
}
