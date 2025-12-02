import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CartpageService } from '../service/cartpage-service';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchaseService } from '../service/purchase-service';

@Component({
  selector: 'app-purchasepage',
  imports: [RouterLink, SlicePipe, ReactiveFormsModule, CommonModule],
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
    return this.cart.reduce((total, product) => total + ( (product.price * product.quantity) * (product.discount/100)), 0);
  }

  onSubmit() {
    this.purhcaseService.onSubmit(this.billingForm.value).subscribe({
      next: (res) => console.log('Saved:', res),
      error: (err) => console.error(err),
    });

    this.router.navigate(["/orderdetails"])
  }
}