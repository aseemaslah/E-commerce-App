import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-my-order',
  imports: [ Navbar, Footer],
  templateUrl: './my-order.html',
  styleUrl: './my-order.scss',
})
export class MyOrder {

}
