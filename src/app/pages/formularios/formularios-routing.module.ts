import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { MerchantsComponent } from "./merchants/merchants.component";
import { InvestmentsComponent } from "./investments/investments.component";
import { PlatformsComponent } from "./platforms/platforms.component";
import { WithdrawalMethodsComponent } from "./withdrawal-methods/withdrawal-methods.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
