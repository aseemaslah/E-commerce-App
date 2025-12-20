import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartpageService {

  cartItems$ = new BehaviorSubject<any[]>([]);

  private http = inject(HttpClient);

  addToCart(product: any) : Observable<any> {
    return this.http.post<any[]>('http://localhost:3000/carts/addcart', product);
  }

  getCart(userId: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/carts/${userId}`);
  }
  deleteCart(productId: string): Observable<any> {
    return this.http.delete<any[]>(`http://localhost:3000/carts/${productId}`);
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put<any[]>(`http://localhost:3000/carts/cart/update`, {
      productId,
      quantity
    });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete<any[]>(`http://localhost:3000/carts/clear/${userId}`);
  }

    setCart(items: any[]) {
  this.cartItems$.next(items);
}
}
