import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-termsandcondtions',
  imports: [ Navbar, Footer],
  templateUrl: './termsandcondtions.html',
  styleUrl: './termsandcondtions.scss',
})
export class Termsandcondtions {

}
