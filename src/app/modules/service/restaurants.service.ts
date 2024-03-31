import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../interface/restaurant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  fetchRestaurant(searchTerm?: string)  {
   return this.http.get<Restaurant[]>(
     'http://localhost:8090/api/restaurants?search=' + searchTerm)
  }
}
