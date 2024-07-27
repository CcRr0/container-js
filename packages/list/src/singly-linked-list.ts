export class SinglyLinkedList<T> {
    private head: SinglyLinkedNode<T> | null = null;
    private tail: SinglyLinkedNode<T> | null = null;
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

    public getIterator(): SinglyLinkedListIterator<T> {
        return new SinglyLinkedListIterator(this.head);
    }

    public append(value: T): void {
        const tailNode: SinglyLinkedNode<T> = new SinglyLinkedNode(value);
        if (this.tail === null) {
            this.head = tailNode;
        } else {
            this.tail.next = tailNode;
        }
        this.tail = tailNode;
        this.length += 1;
    }

    public prepend(value: T): void {
        const headNode: SinglyLinkedNode<T> = new SinglyLinkedNode(value);
        if (this.head === null) {
            this.tail = headNode;
        } else {
            headNode.next = this.head;
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
        if (this.length === 1) {
            this.tail = null;
        }
        this.length -= 1;
        return headValue;
    }
}

export class SinglyLinkedListIterator<T> {
    private currentNode: SinglyLinkedNode<T> | null = null;

    constructor(head: SinglyLinkedNode<T> | null) {
        this.currentNode = head;
    }

    public current(): T | null {
        return this.currentNode !== null ? this.currentNode.value : null;
    }

    public hasNext(): boolean {
        return this.currentNode !== null && this.currentNode.next !== null;
    }

    public next(): T | null {
        if (this.currentNode === null) {
            return null;
        }
        this.currentNode = this.currentNode.next;
        return this.current();
    }
}

class SinglyLinkedNode<T> {
    public value: T;
    public next: SinglyLinkedNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
