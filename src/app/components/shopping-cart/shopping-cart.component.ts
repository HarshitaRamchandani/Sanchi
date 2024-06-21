import { Component } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cartItem.model';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  isLoading = true;
  cartItems: CartItem[] = [];

  constructor(private router: Router, private cartService: CartService) {}
  navigateToHome() {
    this.router.navigate(['home']);
  }
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(): void {
    this.cartItems = this.cartService.getCart();
  }

  increaseQuantity(item: CartItem) {
    this.cartService.addToCart(item);
    this.getCartItems();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 0) {
      this.cartService.removeFromCart(item);
      this.getCartItems();
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.getCartItems();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
