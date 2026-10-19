import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { MerchantsComponent } from "./merchants/merchants.component";
import { InvestmentsComponent } from "./investments/investments.component";
import { PlatformsComponent } from "./platforms/platforms.component";
import { WithdrawalMethodsComponent } from "./withdrawal-methods/withdrawal-methods.component";
import { ReportsComponent } from "./reports/reports.component";
import { SavingsPageComponent } from "src/app/features/savings/ui/savings-page/savings-page.component";
import { CategoriesPageComponent } from "src/app/features/categories/ui/categories-page/categories-page.component";
// Centries (SPEC-06 §4.6) — componentes reales navegables
import { CentriesUsuarioComponent } from "./centries/centries-usuario/centries-usuario.component";
import { CentriesPerfilComponent } from "./centries/centries-perfil/centries-perfil.component";
import { CentriesCargoComponent } from "./centries/centries-cargo/centries-cargo.component";
import { CentriesBitacoraComponent } from "./centries/centries-bitacora/centries-bitacora.component";
import { CentriesPermisoperfilComponent } from "./centries/centries-permisoperfil/centries-permisoperfil.component";
import { CentriesUsuariosInactivosComponent } from "./centries/centries-usuarios-inactivos/centries-usuarios-inactivos.component";

const routes: Routes = [
  {
    path: "creditcard",
    component: CreditcardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "transactions",
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "merchants",
    component: MerchantsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "investments",
    component: InvestmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "platforms",
    component: PlatformsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "withdrawal-methods",
    component: WithdrawalMethodsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "reports",
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "savings",
    component: SavingsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "categories",
    component: CategoriesPageComponent,
    canActivate: [AuthGuard],
  },
  // Centries (SPEC-06 §4.6) — coordinado con SPEC-02 §4.6
  // NOTA: `centries-permisos` y `centries-roloficial` NO se rutearn (placeholders).
  {
    path: "centries/usuario",
    component: CentriesUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries/perfil",
    component: CentriesPerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries/cargo",
    component: CentriesCargoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries/bitacora",
    component: CentriesBitacoraComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries/permisos-perfil",
    component: CentriesPermisoperfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries/usuarios-inactivos",
    component: CentriesUsuariosInactivosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}