import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'credit-cards', 
    loadChildren: () => import('./features/credit-cards/credit-cards.module').then(m => m.CreditCardsModule) 
  },
  { 
    path: 'transactions', 
    loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule) 
  },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: '**', redirectTo: '/transactions' }
];
