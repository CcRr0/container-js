import { Heap, HeapComparator } from "@container-js/heap";

export class PriorityQueue<T> {
    private readonly heap: Heap<T>;

    constructor(comparator: PriorityQueueComparator<T>, data: T[] = []) {
        this.heap = new Heap(comparator, data);
    }

    public count(): number {
        return this.heap.size();
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public peek(): T | null {
        return this.heap.get();
    }

    public push(value: T): void {
        this.heap.insert(value);
    }

    public pop(): T | null {
        return this.heap.remove();
    }
}

export interface PriorityQueueComparator<T> extends HeapComparator<T> {}

export const Less: PriorityQueueComparator<any> = (a, b): number => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
};

export const Greater: PriorityQueueComparator<any> = (a, b): number => {
    if (b > a) {
        return 1;
    } else if (b < a) {
        return -1;
    } else {
        return 0;
    }
};
