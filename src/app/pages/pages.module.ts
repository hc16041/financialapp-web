import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { CountUpModule } from "ngx-countup";
import { NgApexchartsModule } from "ng-apexcharts";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";
import { ToastsContainer } from "./dashboards/dashboard/toasts-container.component";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap"; // Importa el módulo de paginación

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
  declarations: [DashboardComponent, ToastsContainer],
  imports: [
    CommonModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CountUpModule,
    NgApexchartsModule,
    LeafletModule,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
