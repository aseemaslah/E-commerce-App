import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CategorypageService } from '../service/categorypage-service';
import { CartpageService } from '../service/cartpage-service';
import { CurrencyPipe, DecimalPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-categorypage',
  imports: [ReactiveFormsModule, CurrencyPipe, FormsModule, UpperCasePipe, Navbar, Footer],
  templateUrl: './categorypage.html',
  styleUrl: './categorypage.scss',
})
export class Categorypage implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  product: any[] = [];
  category: string = '';


  private route = inject(ActivatedRoute);
  private categoryService = inject(CategorypageService);
  private cdr = inject(ChangeDetectorRef);
  private cartpageService = inject(CartpageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartpageService.cartItems$.subscribe(cartItems => {
      this.cart = cartItems;
      this.products.forEach(p => {
        p.added = this.cart.some(c => c.productId === p.productId);
      });
      this.cdr.markForCheck();
    });

    this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.fetchProducts(this.category);
    });
  }

  fetchProducts(category: string): void {
    this.categoryService.fetchProducts(category).subscribe({
      next: (res: any) => {
        this.products = res.products.map((p: any) => ({
          productId: p.id,
          name: p.title,
          price: p.price,
          image: p.thumbnail,
          discount: p.discountPercentage,
          brand: p.brand,
          rating: p.rating,
          added: false
        }));
        this.getCart();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load products', err),
      complete: () => console.log('Products loaded successfully')
    });
  }


  addToCart(product: any): void {
    this.cartpageService.addToCart(product).subscribe({
      next: (res) => {
        console.log('Product added to cart', res);
        product.added = true;
        this.getCart();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to add product to cart', err),
      complete: () => console.log('Add to cart request completed')
    });
    alert("Product Added Succesfully")
  }

  getCart(): void {
    const userId = "user123";
    this.cartpageService.getCart(userId).subscribe({
      next: (res: any) => {
        this.cart = res.cartItems;
        this.products.forEach(p => {
          p.added = this.cart.some(c => c.productId === p.productId);
        });
        console.log(this.cart);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load cart', err)
    });
  }

  
  goToProduct(product: any): void {
    this.router.navigate(['/product', product.productId]);
    console.log("success")
  }

}
