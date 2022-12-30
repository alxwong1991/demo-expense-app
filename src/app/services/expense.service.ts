import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  add(expense: Expense) {
    return this.http.post(`${environment.baseUrl}/expenses`, expense);
  }

  getAll() {
    return this.http.get<Expense[]>(`${environment.baseUrl}/expenses`);
  }

  getById(id: number) {
    return this.http.get<Expense>(`${environment.baseUrl}/expenses/${id}`);
  }

  update(id: number, expense: Expense) {
    return this.http.put(`${environment.baseUrl}/expenses/${id}`, expense);
  }

  delete(id: number) {
    return this.http.delete(`${environment.baseUrl}/expenses/${id}`);
  }
}
