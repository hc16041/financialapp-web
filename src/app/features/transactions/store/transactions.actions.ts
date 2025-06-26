import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../../core/models/transaction.model';
import { TransactionFilter } from '../../../core/models/transaction-filter.model';

// Acción para cargar transacciones
export const loadTransactions = createAction(
  '[Transactions] Load Transactions',
  props<{ filter?: TransactionFilter }>() // Filtro opcional correctamente tipado
);



export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: string }>()
);


// Acción para agregar nueva transacción
export const addTransaction = createAction(
  '[Transactions] Add Transaction',
  props<{ transaction: Transaction }>()
);

export const addTransactionSuccess = createAction(
  '[Transactions] Add Transaction Success',
  props<{ transaction: Transaction }>()
);

export const addTransactionFailure = createAction(
  '[Transactions] Add Transaction Failure',
  props<{ error: string }>()
);

// Acción para actualizar transacción
export const updateTransaction = createAction(
  '[Transactions] Update Transaction',
  props<{ transaction: Transaction }>()
);

// Acción para eliminar transacción
export const deleteTransaction = createAction(
  '[Transactions] Delete Transaction',
  props<{ id: string }>()
);

// Acciones para filtros
export const setTransactionFilter = createAction(
  '[Transactions] Set Filter',
  props<{ filter: TransactionFilter }>() // Ahora usa el tipo correcto
);

// Acción para resetear el estado
export const resetTransactionsState = createAction(
  '[Transactions] Reset State'
);
