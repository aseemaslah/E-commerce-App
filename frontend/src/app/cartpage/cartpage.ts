import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartpageService } from '../service/cartpage-service';
import { CurrencyPipe, DecimalPipe, SlicePipe } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-cartpage',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, SlicePipe, CurrencyPipe, Navbar, Footer],
  templateUrl: './cartpage.html',
  styleUrl: './cartpage.scss',
})
export class Cartpage implements OnInit {
  cart: any[] = [];
   isLoggedIn: boolean = false;

  private cartpageService = inject(CartpageService);
  private cdr = inject(ChangeDetectorRef);
  private authService =inject(AuthService);
  private router = inject(Router)



  ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.getCart()
  }

  getCart(): void {
    const userId = "user123";
    this.cartpageService.getCart(userId).subscribe({
      next: (res: any) => {
        this.cart = res.cartItems;

        console.log(this.cart);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load cart', err)
    });
  }

  deleteCart(productId: string): void {
    this.cartpageService.deleteCart(productId).subscribe({
      next: (res: any) => {
        console.log('Item deleted from cart', res);
        this.getCart(); // Refresh the cart after deletion
      },
      error: (err) => console.error('Failed to delete item from cart', err)
    });
  }

  calculateTotal(): number {
    return this.cart.reduce((total, carts) => total + ((carts.price * carts.quantity)), 0);
  }

  increaseQty(item: any) {
    const newQty = item.quantity + 1;

    this.cartpageService.updateQuantity(item.productId, newQty)
      .subscribe(() => {
        item.quantity = newQty;
        this.getCart();
      });
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;

      this.cartpageService.updateQuantity(item.productId, newQty)
        .subscribe(() => {
          item.quantity = newQty;
          this.getCart();
        });
    }
  }

  LoginMessage(){
    alert("Please Login to Continue")
  }

  goToCheckout() {
    this.router.navigate(['purchasepage']);
  }



  



}
