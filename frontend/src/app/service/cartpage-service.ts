import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartpageService {
  private http = inject(HttpClient);

  addToCart(product: any) {
    return this.http.post('http://localhost:3000/carts/addcart', product);
  }

  getCart(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/carts/${userId}`);
  }
  deleteCart(productId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/carts/${productId}`);
  }

  updateQuantity(productId: string, quantity: number) {
    return this.http.put(`http://localhost:3000/carts/cart/update`, {
      productId,
      quantity
    });
  }
}
