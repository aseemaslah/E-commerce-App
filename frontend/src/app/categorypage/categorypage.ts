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
  imports: [ReactiveFormsModule,  CurrencyPipe, FormsModule, UpperCasePipe, Navbar, Footer],
  templateUrl: './categorypage.html',
  styleUrl: './categorypage.scss',
})
export class Categorypage implements OnInit {
  loginForm!: FormGroup;
  products: any[] = [];
  cart: any[] = [];
  searchTerm: string = '';
  product: any[] = [];
  category: string = '';

  private forms = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategorypageService);
  private cdr = inject(ChangeDetectorRef);
  private cartpageService = inject(CartpageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.forms.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
    this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.fetchProducts(this.category);
    });
    this.getCart();
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
        }));
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load products', err),
      complete: () => console.log('Products loaded successfully')
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
    else {
      console.log("Form is invalid");
    }
  }

  addToCart(product: any): void {
    this.cartpageService.addToCart(product).subscribe({
      next: (res) => {
        console.log('Product added to cart', res);
      },
      error: (err) => console.error('Failed to add product to cart', err),
      complete: () => console.log('Add to cart request completed')
    });
    alert("Product Added Succesfully")
     this.getCart();
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
  calculateTotal(): number {
    return this.cart.reduce((total, carts) => total + ((carts.price * carts.quantity)), 0);
  }

  searchProducts() {
    this.categoryService.searchProducts(this.searchTerm).subscribe({
      next: (res: any) => {
        this.products = res.products.map((p: any) => ({
          productId: p.id,
          name: p.title,
          price: p.price,
          image: p.thumbnail,
          discount: p.discountPercentage,
          brand: p.brand,
          rating: p.rating,
        }));
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Search error:', err),
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
  goToProduct(product: any): void {
    this.router.navigate(['/product', product.productId]);
    console.log("success")
  }
}
