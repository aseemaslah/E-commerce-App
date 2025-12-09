import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { CategorypageService } from '../service/categorypage-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { CartpageService } from '../service/cartpage-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
        this.cdr.markForCheck();
      },
      error: err => console.error(err)
    });
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
  addToCart(product: any): void {
    this.cartpageService.addToCart(product).subscribe({
      next: (res) => {
        console.log('Product added to cart', res);
      },
      error: (err) => console.error('Failed to add product to cart', err),
      complete: () => console.log('Add to cart request completed')
    });
    alert("Product Added Succesfully");
    this.getCart();
  }

}


