import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-my-account',
  imports: [RouterLink, Navbar],
  templateUrl: './my-account.html',
  styleUrl: './my-account.scss',
})
export class MyAccount {

}
