export class Heap<T> {
    private readonly heap: T[];
    private readonly comparator: HeapComparator<T>;

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private build(): void {
        for (let i: number = (this.heap.length - 2) >> 1; i >= 0; i--) {
            this.siftDown(i);
        }
    }

    private siftUp(index: number): void {
        let parent: number = (index - 1) >> 1;
        while (index > 0 && this.comparator(this.heap[parent], this.heap[index]) > 0) {
            this.swap(parent, index);
            index = parent;
            parent = (index - 1) >> 1;
        }
    }

    private siftDown(index: number): void {
        while (true) {
            const left: number = (index << 1) + 1;
            const right: number = left + 1;
            let less: number = index;
            if (left < this.heap.length && this.comparator(this.heap[less], this.heap[left]) > 0) {
                less = left;
            }
            if (right < this.heap.length && this.comparator(this.heap[less], this.heap[right]) > 0) {
                less = right;
            }
            if (less === index) {
                break;
            }
            this.swap(index, less);
            index = less;
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
