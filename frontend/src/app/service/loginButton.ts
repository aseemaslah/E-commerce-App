import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Login {

  private http = inject(HttpClient);

  Login(): Observable<any[]> {
    return this.http.get<any[]>('https://dummyjson.com/user/login');
  }
  Onlogin(data: any) {
    return this.http.post('http://localhost:3000/users/login', data);
  }
  
}
