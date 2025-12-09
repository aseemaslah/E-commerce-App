import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginPage {

  private http = inject(HttpClient);


  Login(data: any)
  {
    return this.http.post('http://localhost:3000/users/login', data);
  }
  
}
