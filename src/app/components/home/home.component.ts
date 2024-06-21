import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product.model';
import { Categories } from '../../models/categories.model';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { Router } from '@angular/router';
import { StarRatingComponent } from '../common/star-rating/star-rating.component';
import { CartService } from '../../services/cart/cart.service';
import { ShowPopupDirective } from '../../directives/show-popup.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent,StarRatingComponent,ShowPopupDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  highestRatedProducts: Product[] = [];
  categories: Categories[] = [];
  images = [
    '/assets/images/carousel/1.png',
    '/assets/images/carousel/2.png',
    '/assets/images/carousel/3.png',
  ];

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getHighrated();
    this.getCategories();
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['products', category]);
  }

  getCategories() {
    this.productService.getCategories().subscribe((data: Categories[]) => {
      this.categories = data;
    });
  }

  getHighrated() {
    const categories = ['roses', 'carnations', 'mixedflowers', 'cakes'];

    Promise.all(
      categories.map((category) =>
        this.productService
          .getProductByCategory(category)
          .toPromise()
          .then((data: Product[] | undefined) => {
            if (data) {
              this.calculateHighestRatedProduct(data);
            } 
          })
          
      )
    ).then(() => {});
  }

  calculateHighestRatedProduct(products: Product[]): void {
    if (products.length > 0) {
      const highestRating = Math.max(
        ...products.map((product) => product.Rating.rate)
      );
      const highestRatedProduct = products.find(
        (product) => product.Rating.rate === highestRating
      );

      if (highestRatedProduct) {
        const existingProduct = this.highestRatedProducts.find(
          (product) => product.category === highestRatedProduct.category
        );

        if (!existingProduct) {
          this.highestRatedProducts.push(highestRatedProduct);
        }
      }
    }
  }




  

  addToCart(product: Product): void {
    const cartItem = this.cartService.productToCartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
