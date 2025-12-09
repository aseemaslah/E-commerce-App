import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-my-order',
  imports: [RouterLink, Navbar],
  templateUrl: './my-order.html',
  styleUrl: './my-order.scss',
})
export class MyOrder {

}
