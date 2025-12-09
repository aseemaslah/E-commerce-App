import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-contactus',
  imports: [RouterLink, Navbar],
  templateUrl: './contactus.html',
  styleUrl: './contactus.scss',
})
export class Contactus {

}
