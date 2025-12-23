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

    this.cartpageService.cartItems$.subscribe(cartItems => {
      this.cart = cartItems;
      if (this.product) {
        this.product.added = this.cart.some(cartItem => cartItem.productId === this.product.id);
      }
      this.cdr.markForCheck();
    });
    
    this.cartpageService.getCart("user123").subscribe();
  }


  getProductById(id: number) {
    this.categoryService.getProductById(id).subscribe({
      next: res => {
        this.product = res;
        this.product.added = this.cart.some(cartItem => cartItem.productId === this.product.id);
        this.cdr.markForCheck();
      },
      error: err => console.error(err)
    });
  }

  addToCart(product: any): void {
    product.added = true;
    this.cartpageService.addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
      userId: 'user123',
      discount: product.discountPercentage || 0,
    }).subscribe({
      next: res => {
        console.log('Product added to cart', res);
        this.cartpageService.getCart("user123").subscribe();
        alert('Product Added Successfully');
      },
      error: err => {
        console.error('Failed to add product to cart', err);
        product.added = false;
      }
    });
  }

  setMainImage(imageUrl: string): void {
    this.product.thumbnail = imageUrl;
    this.cdr.markForCheck();
  }
}


