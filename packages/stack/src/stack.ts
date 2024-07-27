import { SinglyLinkedList } from "@container-js/list";

export class Stack<T> {
    private list: SinglyLinkedList<T> = new SinglyLinkedList();

    public count(): number {
        return this.list.size();
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public peek(): T | null {
        return this.list.getHead();
    }

    public push(value: T): void {
        this.list.prepend(value);
    }

    public pop(): T | null {
        return this.list.removeHead();
    }
}
