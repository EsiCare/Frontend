import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



type SGPHType = "Pending" | "Failed" | "Completed"; 


export interface PatientHistoryItem {
  id: number;
  nss: string;
  name: string;
  gender: string;
  address: string;
  entered_at: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PatientHistoryItem[] = [
  {id: 1,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 2,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 3,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 4,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 5,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 6,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 7,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 8,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 9,  name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 10, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 11, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 12, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 13, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 14, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 15, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 16, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 17, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 18, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 19, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
  {id: 20, name: 'Mr.Mansouri', entered_at : "2024-12-07 at 15:45",  address : "Taher , Jijel", gender: "Male", nss : "0001823498"},
];

/**
 * Data source for the PatientHistory view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PatientHistoryDataSource extends DataSource<PatientHistoryItem> {
  data: PatientHistoryItem[] = EXAMPLE_DATA;
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
  connect(): Observable<PatientHistoryItem[]> {
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
  private getPagedData(data: PatientHistoryItem[]): PatientHistoryItem[] {
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
  private getSortedData(data: PatientHistoryItem[]): PatientHistoryItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


export type {SGPHType}