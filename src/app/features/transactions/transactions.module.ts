import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionDashboard } from './pages/transaction-dashboard/transaction-dashboard';
import { TransactionDetail } from './pages/transaction-detail/transaction-detail';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule,
    TransactionDashboard,
    TransactionDetail,
    TransactionList,
    TransactionForm
  ],
  providers: [TransactionsService],
})
export class TransactionsModule {}
