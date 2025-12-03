import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorypageService {
  private http = inject(HttpClient);

  fetchProducts(category: string): Observable<any[]> {
    return this.http.get<any[]>(`https://dummyjson.com/products/category/${category}`);
  }

  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`https://dummyjson.com/products/search?q=${query}`)
  }
  getProductById(id: any) {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}

