import { Component, Input } from '@angular/core';
import { CreditCard } from '../../store/reducers/credit-card.reducer';

@Component({
  selector: 'app-credit-card-detail',
  templateUrl: './credit-card-detail.html',
  styleUrls: ['./credit-card-detail.css'],
})
export class CreditCardDetail {
  @Input() creditCard!: CreditCard;
}