import { Component } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../common/star-rating/star-rating.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { ShowPopupDirective } from '../../directives/show-popup.directive';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    StarRatingComponent,
    ReactiveFormsModule,
    ShowPopupDirective,
  ],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  category: string | null = null;
  productsList: Product[] = [];
  productRequestForm!: FormGroup;
  submitted: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.category = this.category!.toLowerCase();
      this.getProductsBycategory(this.category);
    });

    this.productRequestForm = this.fb.group({
      productRequests: this.fb.array([]),
    });
    this.addProductRequest();
  }

  get productRequests(): FormArray {
    return this.productRequestForm.get('productRequests') as FormArray;
  }

  addProductRequest(): void {
    const productGroup = this.fb.group({
      productName: new FormControl('', Validators.required),
      productQuantity: new FormControl('', Validators.required),
      productColor: new FormControl('', Validators.required),
      productSize: new FormControl(''),
    });
    this.productRequests.push(productGroup);
  }

  removeProductRequest(index: number): void {
    this.productRequests.removeAt(index);
  }

  onSubmit(): void {
    if (this.productRequestForm.invalid) {
      this.productRequestForm.markAllAsTouched();
      return;
    }
    console.log(this.productRequestForm.value);
    this.submitted = true;
  }

  getProductsBycategory(category: string) {
    this.productService
      .getProductByCategory(category)
      .subscribe((data: Product[]) => {
        this.productsList = data;
      });
  }

  addToCart(product: Product): void {
    const cartItem = this.cartService.productToCartItem(product);
    this.cartService.addToCart(cartItem);
  }

  sortByPrice(order: 'asc' | 'desc'): void {
    if (order === 'asc') {
      this.productsList.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      this.productsList.sort((a, b) => b.price - a.price);
    }
  }
}
