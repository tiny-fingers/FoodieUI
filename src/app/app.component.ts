import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {NavbarComponent} from "./modules/navbar/navbar.component";
import {CartComponent} from "./modules/cart/cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cartOpen = true;
  constructor() {}

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }
}
