import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDashboard } from './pages/transaction-dashboard/transaction-dashboard';
import { TransactionDetail } from './pages/transaction-detail/transaction-detail';

const routes: Routes = [
  { path: '', component: TransactionDashboard},
  { path: ':id', component: TransactionDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }