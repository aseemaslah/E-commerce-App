import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { CategorypageService } from '../service/categorypage-service';
import { ActivatedRoute, } from '@angular/router';
import { CurrencyPipe, } from '@angular/common';
import { CartpageService } from '../service/cartpage-service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-product-detailpage',
  imports: [ReactiveFormsModule, CurrencyPipe, FormsModule, Navbar, Footer],
  templateUrl: './product-detailpage.html',
  styleUrl: './product-detailpage.scss',
})
export class ProductDetailpage {
  product: any;
  cart: any[] = [];
  products: any[] = [];
  searchTerm: string = '';

  private route = inject(ActivatedRoute);
  private categoryService = inject(CategorypageService);
  private cdr = inject(ChangeDetectorRef);
  private cartpageService = inject(CartpageService)

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.getProductById(id);
      }
    });
    this.getCart();
    
  }


  getProductById(id: number) {
    this.categoryService.getProductById(id).subscribe({
      next: res => {
        this.product = res;
        if (this.cart && this.cart.length > 0) {
          this.product.added = this.cart.some(cartItem => cartItem.productId === this.product.id);
        }
        this.cdr.markForCheck();
      },
      error: err => console.error(err)
    });
  }

  addToCart(product: any): void {
    this.cartpageService.addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
      userId: 'user123',
      discount: product.discountPercentage || 0,
      added: false
    }).subscribe({
      next: res => {
        console.log('Product added to cart', res);
        product.added = true;
        this.getCart();
        this.cdr.markForCheck();
        alert('Product Added Successfully');
      },
      error: err => console.error('Failed to add product to cart', err)
    });
  }
  getCart(): void {
    const userId = "user123";
    this.cartpageService.getCart(userId).subscribe({
      next: (res: any) => {
        this.cart = res.cartItems;
        this.products.forEach(product => {
          product.added = this.cart.some(c => c.productId === product.productId);
        });
        if (this.product) {
          this.product.added = this.cart.some(cartItem => cartItem.productId === this.product.id);
        }
        console.log(this.cart);
        this.products = this.cart;
        this.cdr.markForCheck();
        
      },
      error: (err) => console.error('Failed to load cart', err)
    });
  }



}


