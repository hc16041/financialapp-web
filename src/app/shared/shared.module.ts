import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbNavModule,
  NgbAccordionModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";

// Swiper Slider
import { SlickCarouselModule } from "ngx-slick-carousel";

// Counter
import { CountUpModule } from "ngx-countup";

import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { ScrollspyDirective } from "./scrollspy.directive";

@NgModule({
  declarations: [BreadcrumbsComponent, ScrollspyDirective],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
  ],
  exports: [BreadcrumbsComponent, ScrollspyDirective],
})
export class SharedModule {}
