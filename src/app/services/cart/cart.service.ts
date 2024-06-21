import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItem.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'myShoppingCart';

  constructor() {}

  productToCartItem(product: Product): CartItem {
    return {
      id: `${product.category}-${product.id}`,
      title: product.title,
      image: product.image,
      quantity: 1,
      price: product.price,
    };
  }

  private getCartItems(): CartItem[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  private setCartItems(cartItems: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  addToCart(item: any): void {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.title === item.title
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        title: item.title,
        image: item.image,
        quantity: 1,
        price: item.price,
      };
      cartItems.push(newCartItem);
    }

    this.setCartItems(cartItems);
  }

  removeFromCart(item: any): void {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.title === item.title
    );

    if (existingItemIndex !== -1) {
      if (cartItems[existingItemIndex].quantity > 1) {
        cartItems[existingItemIndex].quantity--;
      } else if (cartItems[existingItemIndex].quantity === 1) {
        cartItems.splice(existingItemIndex, 1); 
      }
    } else {
      console.error('Item not found in cart:', item);
    }

    this.setCartItems(cartItems);
  }

  removeItem(item: any): void{
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.title === item.title
    );
    if (existingItemIndex !== -1) {
      
      cartItems.splice(existingItemIndex, 1);
    }
    this.setCartItems(cartItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getCart(): CartItem[] {
    return this.getCartItems();
  }

  private getCartItemId(item: CartItem): string {
    return `${item.id}-${item.title.replace(/\s/g, '-')}`;
  }
}
