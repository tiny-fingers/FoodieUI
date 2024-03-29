import { Injectable } from '@angular/core';
import {CartItem} from "./cart-item";
import {MenuItem} from "./interface/menu-item";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  fetchCart() {
    return this.http.get<{cardItems: CartItem[]}>('http://localhost:8090/api/carts/1', { withCredentials: true})
      .pipe(map(response => response['cardItems']))
      .subscribe({
        next: (cardItems: CartItem[]) => {this.cartItemsSubject.next(cardItems)}
    });
  }

  // addToCart(item: MenuItem) {
  //   const existingIndex = this.cartItems.findIndex(i => i.id === item.id);
  //   if (existingIndex >= 0) {
  //     alert('Add to existing item')
  //     // this.cartItems$[existingIndex].quantity++;
  //   } else {
  //     alert('New item')
  //     // this.cartItems$.push({ ...item, quantity: 1 });
  //   }
  // }

  addToCartItem(item: CartItem) {
    console.log(this.cartItemsSubject.getValue())
    this.cartItemsSubject.next([...this.cartItemsSubject.getValue(), item]);
    this.updateCart();
  }

  getCartItems() {
    return this.cartItems$;
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<{userId: string, sessionId: string, cardItems: CartItem[]}>(`http://localhost:8090/api/carts/1`)
      .pipe(map(response => response['cardItems']));
  }

  // updateCart(updatedCart: CartItem[]): Observable<any> {
  //   const url = `http://localhost:8090/api/cart`;
  //
  //   this.cartItemsSubject.next(updatedCart)
  //
  //   return this.http.post<any>(url, updatedCart);
  // }

  updateCart() {
    const url = `http://localhost:8090/api/cart`;
    const data = {
      cardItems: this.cartItemsSubject.getValue(),
    }
    return this.http.post<any>(url, data, { withCredentials: true}).subscribe({
      error: (error) => console.log(error)
    });
  }
}
