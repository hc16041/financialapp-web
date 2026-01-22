// pagination.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    pageSize: number = 8;
    page: number = 1;
    direction: 'asc' | 'desc' = 'asc';
    startIndex: number = 1;
    endIndex: number = 9;

    // Pagination
    changePage<T>(alldata: T[]): T[] {
        const startItem = (this.page - 1) * this.pageSize + 1;
        const endItem = (this.page - 1) * this.pageSize + this.pageSize;
        this.endIndex = endItem;
        if (this.endIndex > alldata.length) {
            this.endIndex = alldata.length;
        }
        return alldata.slice(startItem - 1, endItem);
    }

    // Sort Data
    onSort<T extends Record<string, unknown>>(column: string, dataList: T[]): T[] {
        if (this.direction === 'asc') {
            this.direction = 'desc';
        } else {
            this.direction = 'asc';
        }
        const sortedArray = [...dataList]; // Create a new array
        sortedArray.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
            const res = this.compare(
                typeof aValue === 'string' || typeof aValue === 'number' ? aValue : String(aValue),
                typeof bValue === 'string' || typeof bValue === 'number' ? bValue : String(bValue)
            );
            return this.direction === 'asc' ? res : -res;
        });
        return sortedArray;
    }
    
    compare(v1: string | number, v2: string | number): number {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }
}
