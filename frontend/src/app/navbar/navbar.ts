import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartpageService } from '../service/cartpage-service';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { LoginPage } from '../service/login-page';
import { AuthService } from '../service/auth-service';
import { CategorypageService } from '../service/categorypage-service';

@Component({
  selector: 'app-navbar',
  imports: [CurrencyPipe, SlicePipe, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  loginForm!: FormGroup;
  products: any[] = [];
  cart: any[] = [];
  searchTerm: string = '';
  isLoggedIn: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cartpageService = inject(CartpageService);
  private loginPageService = inject(LoginPage);
  private authService = inject(AuthService);
  private categoryPageService = inject(CategorypageService);
  private cdr = inject(ChangeDetectorRef)


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.cartpageService.cartItems$.subscribe(items => {
      this.cart = items;
      this.cdr.markForCheck();
    });
    this.getCart();
    
  }

  getCart(): void {
    const userId = "user123";
    this.cartpageService.getCart(userId).subscribe({
      error: (err) => console.error('Failed to load cart', err)
    });
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
    } else if (item.quantity === 1) {
      this.cartpageService.deleteCart(item.productId)
        .subscribe(() => {
          this.getCart();
        });
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, carts) => total + ((carts.price * carts.quantity)), 0);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginPageService.Login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('✅ Login Success:', res);

          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          this.authService.setLogin(res.token);

        },
      });
      console.log('Form Data:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
      this.router.navigate(['/'])
    }
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goToCheckout() {
    if (this.cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      this.router.navigate(['purchasepage']);
    }
  }

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      this.categoryPageService.searchProducts(this.searchTerm).subscribe({
        next: (res: any) => {
          this.products = res;
          this.router.navigate(['/categorypage'], { queryParams: { search: this.searchTerm } });
        }
      });
    }
  }

}
