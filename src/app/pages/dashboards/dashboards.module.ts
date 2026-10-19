import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardsRoutingModule } from "./dashboards-routing.module";

/**
 * Módulo vestigial (sin declaraciones ni rutas). Se conserva para no alterar
 * el `lazy loading` declarado en `pages-routing.module.ts`. Los artefactos de
 * demostración se eliminan en favor del dashboard real.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardsRoutingModule],
})
export class DashboardsModule {}
