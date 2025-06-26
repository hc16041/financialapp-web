// src/app/features/transactions/store/transactions.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionsService } from '../services/transactions.service';
import * as TransactionsActions from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(({ filter }) =>
        this.transactionsService.getTransactions(filter).pipe(
          map((response) => 
            TransactionsActions.loadTransactionsSuccess({ 
              transactions: response.data 
            })
          ),
          catchError((error) => 
            of(TransactionsActions.loadTransactionsFailure({ 
              error: error.message 
            }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService
  ) {}
}