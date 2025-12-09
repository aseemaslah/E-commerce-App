import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-my-account',
  imports: [ Navbar, Footer],
  templateUrl: './my-account.html',
  styleUrl: './my-account.scss',
})
export class MyAccount {

}
