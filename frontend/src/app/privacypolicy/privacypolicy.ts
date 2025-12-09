import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-privacypolicy',
  imports: [Navbar, Footer],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.scss',
})
export class Privacypolicy {

}
