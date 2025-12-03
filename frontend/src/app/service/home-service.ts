import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private http = inject(HttpClient);


  fetchCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://dummyjson.com/products/category-list');
  }
}