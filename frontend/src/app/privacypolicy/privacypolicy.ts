import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-privacypolicy',
  imports: [RouterLink, Navbar],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.scss',
})
export class Privacypolicy {

}
