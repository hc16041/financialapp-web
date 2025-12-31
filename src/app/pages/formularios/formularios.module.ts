import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormulariosRoutingModule } from "./formularios-routing.module";
import {
  NgbPaginationModule,
  NgbHighlight,
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbPopoverModule,
} from "@ng-bootstrap/ng-bootstrap";
import { GenericTableComponent } from "./genericos/generictable/generictable.component";
import { GenericModalDialogComponent } from "./genericos/generic-modal-dialog/generic-modal-dialog.component";
import { GenericTableHeaderComponent } from "./genericos/generictable/generic-table-header/generic-table-header.component";
import { GenericTableBodyComponent } from "./genericos/generictable/generic-table-body/generic-table-body.component";
import { GenericTablePaginationComponent } from "./genericos/generictable/generic-table-pagination/generic-table-pagination.component";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { MerchantsComponent } from "./merchants/merchants.component";
import { InvestmentsComponent } from "./investments/investments.component";
import { PlatformsComponent } from "./platforms/platforms.component";
import { WithdrawalMethodsComponent } from "./withdrawal-methods/withdrawal-methods.component";

@NgModule({
  declarations: [
    GenericTableComponent,
    GenericModalDialogComponent,
    CreditcardComponent,
    TransactionsComponent,
    MerchantsComponent,
    InvestmentsComponent,
    PlatformsComponent,
    WithdrawalMethodsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormulariosRoutingModule,
    NgbPaginationModule,
    NgbHighlight,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbPopoverModule,
    // Standalone components
    GenericTableHeaderComponent,
    GenericTableBodyComponent,
    GenericTablePaginationComponent,
  ],
})
export class FormulariosModule {}
