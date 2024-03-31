import {Component, Input} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SearchBoxComponent} from "../search-box/search-box.component";
import {NgForOf} from "@angular/common";
import {CartComponent} from "../cart/cart.component";
import {RestaurantsService} from "../service/restaurants.service";
import {Restaurant} from "../interface/restaurant";

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
  @Input() restaurants: Restaurant[] = [];

  constructor(private router: Router, protected restaurantService: RestaurantsService) {}

  ngOnInit(){
    this.restaurantService.fetchRestaurant("").subscribe({
      next: data => {this.restaurants = data}
    })
  }

  searchRestaurants(searchTerm: string) {
    this.restaurantService.fetchRestaurant(searchTerm).subscribe({
      next: data => {this.restaurants = data}
    });
    console.log( "filterRestaurants " + searchTerm);
  }

  navigateToMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }
}
