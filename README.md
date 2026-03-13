# E-Commerce Application

A full-stack E-commerce platform built using the MEAN stack (MongoDB, Express, Angular, Node.js). 

## Technologies Used

*   **Frontend:**
    *   Angular 20
    *   Angular Material UI Components
    *   Bootstrap 5
    *   TypeScript
*   **Backend:**
    *   Node.js
    *   Express.js 5
    *   MongoDB (using Mongoose)
    *   CORS

## Features

Based on the implemented services, the application supports:
*   Product listing and management
*   Shopping Cart functionality
*   User Management
*   Checkout and Billing
*   Order Tracking and Management

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   [Node.js](https://nodejs.org/) installed
*   [Angular CLI](https://angular.io/cli) installed globally (`npm install -g @angular/cli`)
*   [MongoDB](https://www.mongodb.com/) installed and running locally on the default port `27017`

## Getting Started

Follow these steps to get your development environment set up:

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Ensure your local MongoDB instance is running. The backend attempts to connect to `mongodb://127.0.0.1:27017/Ecommerce`.
4.  Start the backend server:
    ```bash
    node server.js
    ```
    *The server will run on `http://localhost:3000`. Leave this terminal open.*

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the Angular development server:
    ```bash
    ng serve
    ```
    *The frontend application will be available at `http://localhost:4200/`.*

## API Endpoints Overview

The backend exposes the following REST API foundational routes:
*   `/products` - To view and manage the product catalog
*   `/users` - To handle user accounts and data
*   `/carts` - To manage active shopping carts
*   `/billing` - To process billing information
*   `/orders` - To handle finalized orders
