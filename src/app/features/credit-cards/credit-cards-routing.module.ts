import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardDashboard } from './pages/credit-card-dashboard/credit-card-dashboard';
import { CreditCardDetail } from './pages/credit-card-detail/credit-card-detail';

const routes: Routes = [
  { path: 'dashboard', component: CreditCardDashboard},
  { path: ':id', component: CreditCardDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditCardsRoutingModule { }