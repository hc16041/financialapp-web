import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../../core/models/transaction.model';
import { setTransactionFilter } from '../store/transactions.actions';
import { TransactionSummary } from '../../../core/models/transaction-summary.model';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { TransactionFilter } from '../../../core/models/transaction-filter.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las transacciones
   * @param filter Filtros opcionales
   */
  // getTransactions(filter?: TransactionFilter): Observable<ApiResponse<Transaction[]>> {
  //   const params = filter ? { ...filter } : {};
  //   return this.http.get<ApiResponse<Transaction[]>>(this.apiUrl, { params });
  // }

  getTransactions(
    filter?: TransactionFilter
  ): Observable<ApiResponse<Transaction[]>> {
    // Convierte el filtro a parámetros HTTP
    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key as keyof TransactionFilter] !== undefined) {
          params = params.set(
            key,
            filter[key as keyof TransactionFilter]!.toString()
          );
        }
      });
    }

    return this.http.get<ApiResponse<Transaction[]>>(this.apiUrl, { params });
  }

  /**
   * Obtiene una transacción por ID
   * @param id ID de la transacción
   */
  getTransactionById(id: string): Observable<ApiResponse<Transaction>> {
    return this.http.get<ApiResponse<Transaction>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva transacción
   * @param transaction Datos de la transacción
   */
  createTransaction(
    transaction: Partial<Transaction>
  ): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(this.apiUrl, transaction);
  }

  /**
   * Actualiza una transacción existente
   * @param id ID de la transacción
   * @param transaction Datos actualizados
   */
  updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Observable<ApiResponse<Transaction>> {
    return this.http.put<ApiResponse<Transaction>>(
      `${this.apiUrl}/${id}`,
      transaction
    );
  }

  /**
   * Elimina una transacción
   * @param id ID de la transacción
   */
  deleteTransaction(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene el resumen de transacciones
   * @param filter Filtros opcionales
   */
  getTransactionsSummary(
    filter?: TransactionFilter
  ): Observable<ApiResponse<TransactionSummary>> {
    const params = filter ? { ...filter } : {};
    return this.http.get<ApiResponse<TransactionSummary>>(
      `${this.apiUrl}/summary`,
      { params }
    );
  }

  /**
   * Exporta transacciones a CSV
   * @param filter Filtros opcionales
   */
  exportTransactions(filter?: TransactionFilter): Observable<Blob> {
    const params = filter ? { ...filter } : {};
    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob',
    });
  }
}
