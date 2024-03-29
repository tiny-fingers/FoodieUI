import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CartItem} from "../cart-item";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() cartItems: CartItem[] = this.cartService.getCartItems();

  constructor(private cartService: CartService) {
  }

  incrementQuantity(itemId: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  decrementQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }
}
