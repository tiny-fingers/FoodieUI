import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  menuItems = [
    { id: 1, name: 'Pizza Margherita', description: 'Tomato sauce, mozzarella cheese, and basil.' },
    { id: 2, name: 'Spaghetti Carbonara', description: 'Spaghetti, bacon, eggs, and parmesan cheese.' },
  ];

  constructor(private cartService: CartService) {}

  addToCart(item: { id: number; name: string; description: string }) {
    this.cartService.addToCart(item);
  }
}
