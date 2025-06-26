// src/app/services/credit-cards.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../store/reducers/credit-card.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
  private readonly apiUrl = '/api/credit-cards'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.apiUrl);
  }

  getById(id: string): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`);
  }

  create(card: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.apiUrl, card);
  }

  update(id: string, card: CreditCard): Observable<CreditCard> {
    return this.http.put<CreditCard>(`${this.apiUrl}/${id}`, card);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
