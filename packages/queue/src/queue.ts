import { SinglyLinkedList } from "@container-js/list";

export class Queue<T> {
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
        this.list.append(value);
    }

    public pop(): T | null {
        return this.list.removeHead();
    }
}
