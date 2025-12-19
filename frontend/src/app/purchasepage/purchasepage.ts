import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CartpageService } from '../service/cartpage-service';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchaseService } from '../service/purchase-service';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-purchasepage',
  imports: [RouterLink, SlicePipe, ReactiveFormsModule, CommonModule, Navbar, Footer],
  templateUrl: './purchasepage.html',
  styleUrl: './purchasepage.scss',
})
export class Purchasepage {
  billingForm!: FormGroup;
  cart: any[] = [];

  private cartpageService = inject(CartpageService);
  private cdr = inject(ChangeDetectorRef);
  private form = inject(FormBuilder);
  private purhcaseService = inject(PurchaseService);
  private router = inject(Router);

  ngOnInit(): void {
    this.billingForm = this.form.group({
      name: ['', Validators.required],
      houseNo: ['', Validators.required],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required],
      phone: ['', Validators.required]
    });

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
    return this.cart.reduce((total, product) => total + ((product.price * product.quantity)), 0);
  }

    onSubmit() {
    // Check if form is valid
    if (this.billingForm.valid) {
      // Prepare order data
      const orderData = {
        billingDetails: this.billingForm.value,
        items: this.cart,
        totalAmount: this.calculateTotal(),
        orderDate: new Date().toISOString(),
        orderId: this.generateOrderId()
      };

      // Save order data to localStorage or service
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      console.log('Order Data:', orderData);

      // Navigate to order details page
      this.router.navigate(['/orderdetails'], {
        state: { order: orderData }
      });

      // Clear cart after successful order
      this.cartpageService.clearCart('user123').subscribe({
        next: () => console.log('Cart cleared successfully'),
        error: (err) => console.error('Failed to clear cart', err)
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.billingForm.controls).forEach(key => {
        this.billingForm.get(key)?.markAsTouched();
      });
      
      // Optional: Show error message
      alert('Please fill all required fields correctly');
    }
  }
    generateOrderId(): string {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
}