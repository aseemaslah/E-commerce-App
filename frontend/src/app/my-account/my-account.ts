import { Component, inject } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { LoginPage } from '../service/login-page';

@Component({
  selector: 'app-my-account',
  imports: [ Navbar, Footer],
  templateUrl: './my-account.html',
  styleUrl: './my-account.scss',
})
export class MyAccount {
  users: any[] = [];

  private LoginPageService = inject(LoginPage)

  ngOnInit(): void {
    this.UserDetails();
    
  }
  UserDetails(){
    this.LoginPageService.UserDetails().subscribe({
      next: (res: any) => {
        this.users = [res];
        console.log(this.users);
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }

}
