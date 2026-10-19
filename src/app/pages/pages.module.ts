import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap"; // Importa el módulo de paginación
import { TranslateModule } from "@ngx-translate/core";
import { CurrencyUsdPipe } from "src/app/core/pipes/currency-usd.pipe";

// Swiper Slider
import { SlickCarouselModule } from "ngx-slick-carousel";

import { LightboxModule } from "ngx-lightbox";

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from "../shared/widget/widget.module";
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { DashboardsModule } from "./dashboards/dashboards.module";
import { FormulariosModule } from "./formularios/formularios.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    SlickCarouselModule,
    LightboxModule,
    DashboardsModule,
    FormulariosModule,
    NgbPaginationModule,
    TranslateModule,
    CurrencyUsdPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
