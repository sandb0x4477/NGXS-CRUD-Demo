import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  updateProduct(payload: Product): Observable<Product> {
    return this.http.put<Product>(this.API_URL + payload.id, payload);
  }

  createProduct(payload: Product): Observable<any> {
    return this.http.post(this.API_URL, payload);
  }

  deleteProduct(payload: Product): Observable<any> {
    return this.http.delete(this.API_URL + payload.id);
  }
}
