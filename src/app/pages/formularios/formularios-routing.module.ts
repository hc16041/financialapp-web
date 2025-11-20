import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { MerchantsComponent } from "./merchants/merchants.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
