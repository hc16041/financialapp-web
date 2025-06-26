import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'transactions', 
    loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule) 
  },
  { 
    path: 'credit-cards', 
    loadChildren: () => import('./features/credit-cards/credit-cards.module').then(m => m.CreditCardsModule) 
  },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }