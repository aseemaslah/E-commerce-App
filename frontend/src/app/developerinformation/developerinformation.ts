import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-developerinformation',
  imports: [ Navbar, Footer],
  templateUrl: './developerinformation.html',
  styleUrl: './developerinformation.scss',
})
export class Developerinformation {

}
