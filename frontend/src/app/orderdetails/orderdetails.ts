import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PurchaseService } from '../service/purchase-service';
import { CartpageService } from '../service/cartpage-service';

@Component({
  selector: 'app-orderdetails',
  imports: [CommonModule, RouterLink],
  templateUrl: './orderdetails.html',
  styleUrl: './orderdetails.scss',
})
export class Orderdetails {

  billing: any[] = [];
  cart: any[] = [];
  private purchaseService = inject(PurchaseService);
  private cartpageService = inject(CartpageService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getBillData();
    this.getCart();
  }

  getBillData(): void {

    this.purchaseService.getBillData().subscribe({
      next: (res: any) => {
        this.billing = res.billingInfo;
        console.log(this.billing);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Failed to load billing details', err)
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

  calculateTotal(): number {
    return this.cart.reduce((total, carts) => total + ((carts.price * carts.quantity) * (carts.discount / 100)), 0);
  }
}

