import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Product } from '../models/product.model';
import { Categories } from '../models/categories.model';
import { map, switchMap,toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private CATEGORIES_URL = 'assets/json/Categories.json';
  private URL_MAP: { [key: string]: string } = {
    roses: 'assets/json/Roses.json',
    carnations: 'assets/json/Carnations.json',
    mixedflowers: 'assets/json/MixedFlowers.json',
    cakes: 'assets/json/Cakes.json',
  };

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.CATEGORIES_URL);
  }
  getProductByCategory(categoryName: string): Observable<Product[]> {
    const url = this.URL_MAP[categoryName.toLowerCase()];
    return this.http.get<Product[]>(url);
  }

  
}
