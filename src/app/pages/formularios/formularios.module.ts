import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormulariosRoutingModule } from "./formularios-routing.module";
import {
  NgbPaginationModule,
  NgbHighlight,
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbNavModule,
} from "@ng-bootstrap/ng-bootstrap";
// ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
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
import { ReportsComponent } from "./reports/reports.component";
// Centries (SPEC-06 §4.6) — componentes reales navegables
import { CentriesUsuarioComponent } from "./centries/centries-usuario/centries-usuario.component";
import { CentriesPerfilComponent } from "./centries/centries-perfil/centries-perfil.component";
import { CentriesCargoComponent } from "./centries/centries-cargo/centries-cargo.component";
import { CentriesBitacoraComponent } from "./centries/centries-bitacora/centries-bitacora.component";
import { CentriesPermisoperfilComponent } from "./centries/centries-permisoperfil/centries-permisoperfil.component";
import { CentriesUsuariosInactivosComponent } from "./centries/centries-usuarios-inactivos/centries-usuarios-inactivos.component";
import { CurrencyUsdPipe } from "src/app/core/pipes/currency-usd.pipe";
import { KpiCardComponent } from "src/app/shared/components/kpi-card/kpi-card.component";
import {
  ErrorAlertComponent,
} from "src/app/shared/components/feedback/error-alert/error-alert.component";
import { TranslateModule } from "@ngx-translate/core";

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
    ReportsComponent,
    // Centries (SPEC-06 §4.6)
    CentriesUsuarioComponent,
    CentriesPerfilComponent,
    CentriesCargoComponent,
    CentriesBitacoraComponent,
    CentriesPermisoperfilComponent,
    CentriesUsuariosInactivosComponent,
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
    NgbNavModule,
    NgApexchartsModule,
    CurrencyUsdPipe,
    KpiCardComponent,
    ErrorAlertComponent,
    TranslateModule,
    // Standalone components
    GenericTableHeaderComponent,
    GenericTableBodyComponent,
    GenericTablePaginationComponent,
  ],
})
export class FormulariosModule {}