import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Orderdetails {
  private http = inject(HttpClient);

  addOrder(orderData: any) {
    return this.http.post('http://localhost:3000/orders/', orderData);
  }

  getOrdersByUserId(userId: any) {
    return this.http.get(`http://localhost:3000/orders/${userId}`);
  }

  deleteOrder(orderId: any) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }

  getAllOrders() {
    return this.http.get('http://localhost:3000/orders/');
  }
}
