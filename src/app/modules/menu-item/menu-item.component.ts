import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MenuItem} from "../interface/menu-item";
import {CartService} from "../service/cart.service";

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
  menuItems: MenuItem[] = [
    { id: 1, name: 'Pizza Margherita', description: 'Tomato sauce, mozzarella cheese, and basil.' , price: 6.90},
    { id: 2, name: 'Spaghetti Carbonara', description: 'Spaghetti, bacon, eggs, and parmesan cheese.', price: 8.90},
  ];

  constructor(private cartService: CartService) {}

  addToCart(item: MenuItem) {
    this.cartService.addToCartItem({...item, quantity: 1});
  }
}
