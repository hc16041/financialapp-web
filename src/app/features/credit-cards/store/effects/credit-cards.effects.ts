// src/app/store/effects/credit-cards.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CreditCardActions from '../actions/credit-cards.actions';
import { CreditCardsService } from '../../services/credit-cards';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CreditCardsEffects {
  loadCreditCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditCardActions.loadCreditCards),
      mergeMap(() =>
        this.creditCardsService.getAll().pipe(
          map(creditCards =>
            CreditCardActions.loadCreditCardsSuccess({ creditCards })
          ),
          catchError(error =>
            of(CreditCardActions.loadCreditCardsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private creditCardsService: CreditCardsService
  ) {}
}
