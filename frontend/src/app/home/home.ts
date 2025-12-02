import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HomeService } from '../service/home-service';
import { CartpageService } from '../service/cartpage-service';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { CategorypageService } from '../service/categorypage-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, SlicePipe, CurrencyPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  loginForm!: FormGroup;
  categories: any[] = [];
  products: any[] = [];
  cart: any[] = [];
  searchTerm: string = '';


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private homeService = inject(HomeService);
  private cdr = inject(ChangeDetectorRef);
  private cartpageService = inject(CartpageService);
  private categoryPageService = inject(CategorypageService)


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.fetchCategories();
    this.getCart();
  }

  fetchCategories(): void {
    this.homeService.fetchCategories().subscribe({
      next: (res) => {
        this.categories = res.map((cat: string, i: number) => ({
          id: i,
          name: cat,
        }));
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goToCategory(category: any): void {
    this.router.navigate(['/categorypage', category.name]);
  }
  getCart(): void {

    const userId = "user123";
    this.cartpageService.getCart(userId).subscribe({
      next: (res: any) => {
        this.cart = res.cartItems;
        console.log(this.cart);
        this.cdr.markForCheck();
        this.getCart();
      },
      error: (err) => console.error('Failed to load cart', err)
    });
  }
  calculateTotal(): number {
    return this.cart.reduce((total, product) => total + ( (product.price * product.quantity) * (product.discount/100)), 0);
  }


  searchProducts() {
    this.categoryPageService.searchProducts(this.searchTerm).subscribe(data => {
      this.products = data; 
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
    }
  }
  


}

