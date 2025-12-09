import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginPage {

  private http = inject(HttpClient);


  Login(data: any)
  {
    return this.http.post('https://dummyjson.com/user/login', {
      username: data.username,      // map form email → username for dummyjson
      password: data.password,
      expiresInMins: 30
    });
  }
}
