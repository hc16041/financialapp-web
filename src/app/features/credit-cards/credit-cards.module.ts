import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardsService} from './services/credit-cards';
import { CreditCardDashboard} from './pages/credit-card-dashboard/credit-card-dashboard';
import { CreditCardList } from './components/credit-card-list/credit-card-list';
import { CreditCardForm } from './components/credit-card-form/credit-card-form';
import { SharedModule } from '../../shared/shared.module';
import { CreditCardsRoutingModule } from './credit-cards-routing.module';
import { CreditCardDetail } from './pages/credit-card-detail/credit-card-detail';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CreditCardsRoutingModule,
    CreditCardDashboard,
    CreditCardDetail,
    CreditCardList,
    CreditCardForm
  ],
  providers: [CreditCardsService]
})
export class CreditCardsModule { }