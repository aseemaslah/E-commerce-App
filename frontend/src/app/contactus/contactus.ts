import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-contactus',
  imports: [ Navbar, Footer],
  templateUrl: './contactus.html',
  styleUrl: './contactus.scss',
})
export class Contactus {

}
