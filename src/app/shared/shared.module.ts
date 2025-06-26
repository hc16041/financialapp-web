import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { ErrorMessage } from './components/error-message/error-message';
import { CreditCardSelector } from './components/credit-card-selector/credit-card-selector';
import { Tooltip } from './directives/tooltip';
import { NumericOnly } from './directives/numeric-only';
import { CurrencyFormatPipe } from './pipes/currency-format-pipe';
import { DateAgoPipe } from './pipes/date-ago-pipe';
import { CreditCardDashboard } from '../features/credit-cards/pages/credit-card-dashboard/credit-card-dashboard';
import { CreditCardsRoutingModule } from '../features/credit-cards/credit-cards-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingSpinner,
    ErrorMessage,
    CreditCardSelector,
    Tooltip,
    NumericOnly,
    CurrencyFormatPipe,
    DateAgoPipe,
    CreditCardsRoutingModule
  ],
  exports: [
    LoadingSpinner,
    ErrorMessage,
    CreditCardSelector,
    Tooltip,
    NumericOnly,
    CurrencyFormatPipe,
    DateAgoPipe,
  ],
})
export class SharedModule {}
