// src/app/store/reducers/credit-cards.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CreditCardActions from '../actions/credit-cards.actions';

export interface CreditCard {
  id: string;
  holder: string;
  number: string;
  expiration: string;
  cvv: string;
}

export interface CreditCardsState {
  creditCards: CreditCard[];
  loading: boolean;
  error: string | null;
}

export const initialState: CreditCardsState = {
  creditCards: [],
  loading: false,
  error: null
};

export const creditCardsReducer = createReducer(
  initialState,
  on(CreditCardActions.loadCreditCards, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CreditCardActions.loadCreditCardsSuccess, (state, { creditCards }) => ({
    ...state,
    creditCards,
    loading: false
  })),
  on(CreditCardActions.loadCreditCardsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
