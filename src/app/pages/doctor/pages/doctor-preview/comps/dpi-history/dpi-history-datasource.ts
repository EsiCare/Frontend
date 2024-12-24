import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



type DPIType = "Radiology";
type DPIPriority = "Dangerous" | "Normal";

export interface DpiHistoryItem {
  id: number;
  title: string;
  type : DPIType;
  priority : DPIPriority;
  tested_at : string;
  done_by : string;  
  actions: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DpiHistoryItem[] = [
  {id: 1,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 2,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 3,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 4,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Normal", type: "Radiology", actions : ""},
  {id: 5,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 6,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Normal", type: "Radiology", actions : ""},
  {id: 7,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 8,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 9,  done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 10, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 11, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 12, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 13, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 14, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 15, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 16, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 17, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 18, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 19, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
  {id: 20, done_by: 'Mr.Mansouri', tested_at : "2024-12-07 at 15:45", title: "Full Blood Test" , priority : "Dangerous", type: "Radiology", actions : ""},
];

/**
 * Data source for the DpiHistory view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DpiHistoryDataSource extends DataSource<DpiHistoryItem> {
  data: DpiHistoryItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DpiHistoryItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DpiHistoryItem[]): DpiHistoryItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DpiHistoryItem[]): DpiHistoryItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


export type {DPIPriority,DPIType}