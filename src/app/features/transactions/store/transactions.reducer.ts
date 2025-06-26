// src/app/features/transactions/store/transactions.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { TransactionFilter } from '../../../core/models/transaction-filter.model';
import * as TransactionsActions from './transactions.actions';
import { Transaction } from '../../../core/models/transaction.model';

export interface TransactionsState {
  transactions: Transaction[];
  currentFilter: TransactionFilter | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionsState = {
  transactions: [],
  currentFilter: null,
  loading: false,
  error: null
};

export const transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.loadTransactions, (state, { filter }) => ({
    ...state,
    loading: true,
    currentFilter: filter || null
  })),
  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
    error: null
  })),
  on(TransactionsActions.setTransactionFilter, (state, { filter }) => ({
    ...state,
    currentFilter: filter
  })),
  // ... otros casos
);