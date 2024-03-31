import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem} from "../cart-item";
import {Subscription} from "rxjs";
import {CartService} from "../service/cart.service";
import {PriceCalculatorService} from "../service/price-calculator.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() totalPrice: string | null = '0.00';

  private subscription?: Subscription;

  ngOnInit(): void {
    this.cartService.fetchCart();
    this.subscription = this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items
        this.totalPrice = this.currencyPipe.transform(items.map(item => this.priceCalculatorService.calculatePrice(item.price, item.quantity))
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2),
          'USD',
          'symbol') ;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(private cartService: CartService, private priceCalculatorService: PriceCalculatorService, private currencyPipe: CurrencyPipe) {
  }

  incrementQuantity(itemId: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
    this.updatePrice();
    this.cartService.updateCart();
  }

  private updatePrice() {
    this.totalPrice = this.currencyPipe.transform(this.cartItems.map(item => this.priceCalculatorService.calculatePrice(item.price, item.quantity))
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2),
      'USD',
      'symbol');
  }

  decrementQuantity(itemId: any) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 0) {
      item.quantity--;
    }
    this.updatePrice();
    this.cartService.updateCart();
  }

  protected readonly confirm = confirm;
}
