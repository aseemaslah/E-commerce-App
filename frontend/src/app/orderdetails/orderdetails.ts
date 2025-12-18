import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

// Define the order data interface
interface OrderData {
  billingDetails: {
    name: string;
    houseNo: string;
    locality: string;
    landmark: string;
    pincode: string;
    phone: string;
  };
  items: any[];
  totalAmount: number;
  orderDate: string;
  orderId: string;
}

@Component({
  selector: 'app-orderdetails',
  imports: [CommonModule,Footer , RouterLink
  ],
  templateUrl: './orderdetails.html',
  styleUrl: './orderdetails.scss'
})
export class Orderdetails implements OnInit {
  // Option 1: Initialize with undefined and use proper type
  orderData: OrderData | undefined;
  
  // Option 2: Use definite assignment assertion (!)
  // orderData!: OrderData;
  
  private router = inject(Router);

  ngOnInit(): void {
    // Access navigation state
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation?.extras?.state) {
      this.orderData = navigation.extras.state['order'];
    } else {
      // Fallback: Check history.state or localStorage
      this.orderData = history.state['order'];
      
      if (!this.orderData) {
        const storedOrder = localStorage.getItem('currentOrder');
        if (storedOrder) {
          this.orderData = JSON.parse(storedOrder);
        }
      }
    }

    // If no order data found, redirect back
    if (!this.orderData) {
      this.router.navigate(['/']);
    }
  }

  printOrder(): void {
    window.print();
  }
}
