import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SearchBoxComponent} from "../search-box/search-box.component";
import {NgForOf} from "@angular/common";
import {CartService} from "../cart.service";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBoxComponent,
    NgForOf,
    CartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  restaurants = [
    { id: 1, name: 'Restaurant A', description: 'Italian cuisine' },
    { id: 2, name: 'Restaurant B', description: 'Mexican food' },
  ];

  constructor(private router: Router, protected cartService: CartService) {}

  filteredRestaurants = this.restaurants;

  filterRestaurants(searchTerm: string) {
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  navigateToMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }
}
