import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private base = '/api/products';

  products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(`${this.base}`)
      .subscribe(data => this.products$.next(data));
      console.log('got these products!', this.products$);
      return this.products$;
  }

  getProduct(_id: string): Observable<Product> {
    console.log('product service got a request to edit a product', _id);
    return this.http.get<Product>(`${this.base}/${_id}`);
  }

  createProduct(product: Product): Observable<Product> {
    console.log('product service got a request to create product', product);
    return this.http.post<Product>(`${this.base}`, product);
  }

  deleteProduct(_id: number): Observable<Product> {
    console.log('product service got the request to delete product', _id);
    return this.http.delete<Product>(`${this.base}/${_id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    console.log('product service got the request to update product', product);
    return this.http.put<Product>(`${this.base}/${product._id}`, product);
  }
}
