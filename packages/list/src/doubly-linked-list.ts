export class DoublyLinkedList<T> {
    private head: DoublyLinkedNode<T> | null = null;
    private tail: DoublyLinkedNode<T> | null = null;
    private length: number = 0;

    public size(): number {
        return this.length;
    }

    public getHead(): T | null {
        if (this.head === null) {
            return null;
        }
        return this.head.value;
    }

    public getTail(): T | null {
        if (this.tail === null) {
            return null;
        }
        return this.tail.value;
    }

    public getIteratorHead(): DoublyLinkedListIterator<T> {
        return new DoublyLinkedListIterator(this.head);
    }

    public getIteratorTail(): DoublyLinkedListIterator<T> {
        return new DoublyLinkedListIterator(this.tail);
    }

    public append(value: T): void {
        const tailNode: DoublyLinkedNode<T> = new DoublyLinkedNode(value);
        if (this.tail === null) {
            this.head = tailNode;
        } else {
            tailNode.prev = this.tail;
            this.tail.next = tailNode;
        }
        this.tail = tailNode;
        this.length += 1;
    }

    public prepend(value: T): void {
        const headNode: DoublyLinkedNode<T> = new DoublyLinkedNode(value);
        if (this.head === null) {
            this.tail = headNode;
        } else {
            headNode.next = this.head;
            this.head.prev = headNode;
        }
        this.head = headNode;
        this.length += 1;
    }

    public removeHead(): T | null {
        if (this.head === null) {
            return null;
        }
        const headValue: T = this.head.value;
        this.head = this.head.next;
        if (this.head !== null) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
        this.length -= 1;
        return headValue;
    }

    public removeTail(): T | null {
        if (this.tail === null) {
            return null;
        }
        const tailValue: T = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail !== null) {
            this.tail.next = null;
        } else {
            this.head = null;
        }
        this.length -= 1;
        return tailValue;
    }
}

export class DoublyLinkedListIterator<T> {
    private currentNode: DoublyLinkedNode<T> | null = null;

    constructor(start: DoublyLinkedNode<T> | null) {
        this.currentNode = start;
    }

    public current(): T | null {
        return this.currentNode !== null ? this.currentNode.value : null;
    }

    public hasNext(): boolean {
        return this.currentNode !== null && this.currentNode.next !== null;
    }

    public hasPrev(): boolean {
        return this.currentNode !== null && this.currentNode.prev !== null;
    }

    public next(): T | null {
        return this.move(true);
    }

    public prev(): T | null {
        return this.move(false);
    }

    private move(direction: boolean): T | null {
        if (this.currentNode === null) {
            return null;
        }
        this.currentNode = direction ? this.currentNode.next : this.currentNode.prev;
        return this.current();
    }
}

class DoublyLinkedNode<T> {
    public value: T;
    public next: DoublyLinkedNode<T> | null = null;
    public prev: DoublyLinkedNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
