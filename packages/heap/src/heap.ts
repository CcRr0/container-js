export class Heap<T> {
    private readonly heap: T[];
    private readonly comparator: HeapComparator<T>;

    private parentIndex = (index: number): number => (index - 1) >> 1;
    private leftChildIndex = (index: number): number => index * 2 + 1;
    private rightChildIndex = (index: number): number => index * 2 + 2;

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private build(): void {
        for (let i: number = this.parentIndex(this.heap.length - 1); i >= 0; i--) {
            this.siftDown(i);
        }
    }

    private siftUp(index: number): void {
        let parent: number = this.parentIndex(index);
        while (index > 0 && this.comparator(this.heap[parent], this.heap[index]) > 0) {
            this.swap(parent, index);
            index = parent;
            parent = this.parentIndex(index);
        }
    }

    private siftDown(index: number): void {
        const left: number = this.leftChildIndex(index);
        const right: number = this.rightChildIndex(index);
        let less: number = index;
        if (left < this.heap.length && this.comparator(this.heap[left], this.heap[less]) < 0) {
            less = left;
        }
        if (right < this.heap.length && this.comparator(this.heap[right], this.heap[less]) < 0) {
            less = right;
        }
        if (less !== index) {
            this.swap(index, less);
            this.siftDown(less);
        }
    }

    constructor(comparator: HeapComparator<T>, data: T[] = []) {
        this.heap = data;
        this.comparator = comparator;
        this.build();
    }

    public size(): number {
        return this.heap.length;
    }

    public get(): T | null {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    public insert(value: T): void {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
    }

    public remove(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        const root: T = this.heap[0];
        const leaf: T = this.heap.pop()!;
        if (this.heap.length !== 0) {
            this.heap[0] = leaf;
            this.siftDown(0);
        }
        return root;
    }
}

export interface HeapComparator<T> {
    (a: T, b: T): number;
}
