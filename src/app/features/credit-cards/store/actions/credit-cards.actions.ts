// src/app/store/actions/credit-cards.actions.ts
import { createAction, props } from '@ngrx/store';
import { CreditCard } from '../reducers/credit-card.reducer';

export const loadCreditCards = createAction('[CreditCards] Load');

export const loadCreditCardsSuccess = createAction(
  '[CreditCards] Load Success',
  props<{ creditCards: CreditCard[] }>()
);

export const loadCreditCardsFailure = createAction(
  '[CreditCards] Load Failure',
  props<{ error: string }>()
);
