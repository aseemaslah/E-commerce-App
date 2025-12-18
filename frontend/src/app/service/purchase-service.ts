import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {

  private http = inject(HttpClient);

  onSubmit(data: any) {
    return this.http.post('http://localhost:3000/billing/addbilling', data);
  }
  getBillData() {
    return this.http.get('http://localhost:3000/billing/details')
  }
    clearBillingData(): Observable<any> {
    return this.http.delete(`http://localhost:3000/billing/clearbilling`);
  }

}