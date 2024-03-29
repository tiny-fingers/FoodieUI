import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CartItem} from "../cart-item";
import {CartService} from "../cart.service";
import {Subscription} from "rxjs";

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
  @Input() cartItems: CartItem[] = [];
  private subscription?: Subscription;

  ngOnInit(): void {
    // this.cartService.getCart().subscribe({
    //   next: (items) => this.cartItems = items,
    //   error: (err) => console.log(err)
    // } );
    this.cartService.fetchCart();
    this.subscription = this.cartService.cartItems$.subscribe({
      next: (items) => {this.cartItems = items}
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(private cartService: CartService) {
  }

  incrementQuantity(itemId: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  decrementQuantity(itemId: any) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 0) {
      item.quantity--;
    }
  }
}
