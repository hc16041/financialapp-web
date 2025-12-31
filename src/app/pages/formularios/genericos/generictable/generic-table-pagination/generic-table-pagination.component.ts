import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

/**
 * Componente standalone para la paginación de la tabla genérica
 */
@Component({
  selector: "app-generic-table-pagination",
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  template: `
    <div
      class="row justify-content-between align-items-center mt-3"
      *ngIf="!showAll"
    >
      <div class="col-sm-12 col-md-5">
        <div class="dataTables_info">
          Mostrando {{ startIndex + 1 }} a {{ endIndex }} de
          {{ totalItems }} registros
        </div>
      </div>
      <div class="col-sm-12 col-md-5">
        <div class="text-md-right float-md-end">
          <ngb-pagination
            [collectionSize]="totalItems"
            [(page)]="currentPage"
            [pageSize]="pageSize"
            [maxSize]="maxPages"
            [rotate]="true"
            [boundaryLinks]="true"
            (pageChange)="onPageChange($event)"
          >
          </ngb-pagination>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class GenericTablePaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() maxPages: number = 5;
  @Input() showAll: boolean = false;
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
