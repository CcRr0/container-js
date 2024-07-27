import { DoublyLinkedList } from "@container-js/list";

export class Deque<T> {
    private list: DoublyLinkedList<T> = new DoublyLinkedList();

    public count(): number {
        return this.list.size();
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public peekFront(): T | null {
        return this.list.getHead();
    }

    public peekBack(): T | null {
        return this.list.getTail();
    }

    public pushFront(value: T): void {
        this.list.prepend(value);
    }

    public pushBack(value: T): void {
        this.list.append(value);
    }

    public popFront(): T | null {
        return this.list.removeHead();
    }

    public popBack(): T | null {
        return this.list.removeTail();
    }
}
