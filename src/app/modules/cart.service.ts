import { Injectable } from '@angular/core';
import {MenuItem} from "./menu-item";
import {CartItem} from "./cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartItems: CartItem[] = [];

  addToCart(item: MenuItem) {
    const existingIndex = this.cartItems.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      alert('Add to existing item')
      this.cartItems[existingIndex].quantity++;
    } else {
      alert('New item')
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  getCartItems() {
    return this.cartItems;
  }
}
