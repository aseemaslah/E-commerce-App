import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-developerinformation',
  imports: [RouterLink, Navbar],
  templateUrl: './developerinformation.html',
  styleUrl: './developerinformation.scss',
})
export class Developerinformation {

}
