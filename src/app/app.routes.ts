import {Routes} from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {MenuItemComponent} from "./modules/menu-item/menu-item.component";
import {CartComponent} from "./modules/cart/cart.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu/:id', component: MenuItemComponent },
  { path: 'cart', component: CartComponent },
];
