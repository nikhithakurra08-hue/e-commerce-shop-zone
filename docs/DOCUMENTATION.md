# ShopZone — Complete Technical Documentation

> Version: 1.0.0 | Built with React + Vite + TypeScript | Deployed on Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Live Demo & Repository](#2-live-demo--repository)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Installation & Setup](#5-installation--setup)
6. [Environment Variables](#6-environment-variables)
7. [Features & Modules](#7-features--modules)
8. [State Management](#8-state-management)
9. [Routing](#9-routing)
10. [Components Guide](#10-components-guide)
11. [Pages Guide](#11-pages-guide)
12. [Mock Data](#12-mock-data)
13. [API Service Layer](#13-api-service-layer)
14. [Styling System](#14-styling-system)
15. [Testing](#15-testing)
16. [Deployment Guide](#16-deployment-guide)
17. [Payment Integration](#17-payment-integration)
18. [Admin Panel](#18-admin-panel)
19. [Performance](#19-performance)
20. [Troubleshooting](#20-troubleshooting)
21. [Future Roadmap](#21-future-roadmap)

---

## 1. Project Overview

**ShopZone** is a production-ready, full-featured eCommerce web application inspired by Amazon. It is built as a Single Page Application (SPA) using React, TypeScript, and Vite — with zero backend dependency. All data is managed through Redux Toolkit and persisted in the browser's localStorage.

### Key Highlights

| Property | Value |
|----------|-------|
| Application Type | Single Page Application (SPA) |
| Frontend Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite 5 |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Backend | None (Mock Data + localStorage) |
| Test Coverage | 14 unit tests |

### Purpose

- QA Testing of eCommerce flows
- Product demonstrations for clients
- Feature benchmarking vs Shopify / WooCommerce
- Learning reference for React + Redux architecture
- Base template to plug in a real backend

---

## 2. Live Demo & Repository

| Resource | Link |
|----------|------|
| GitHub Repository | https://github.com/nikhithakurra08-hue/ecommerce-app |
| Live Application | Your Vercel URL |
| Admin Panel | Your Vercel URL + `/admin` |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Regular User | demo@shopzone.com | demo123 |
| Admin User | admin@shopzone.com | admin123 |

### Test Coupon Codes

| Code | Type | Value | Min Order |
|------|------|-------|-----------|
| SAVE10 | Percentage | 10% off | ₹999 |
| FLAT200 | Flat | ₹200 off | ₹1,999 |
| NEWUSER | Percentage | 20% off | ₹499 |
| WELCOME50 | Flat | ₹50 off | ₹299 |

---

## 3. Tech Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM rendering |
| react-router-dom | ^6.22.3 | Client-side routing |
| @reduxjs/toolkit | ^2.2.1 | State management |
| react-redux | ^9.1.0 | React-Redux bindings |
| typescript | ^5.2.2 | Type safety |
| vite | ^5.2.0 | Build tool |
| tailwindcss | ^3.4.1 | Utility CSS framework |

### UI & UX Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.358.0 | Icon library |
| react-hot-toast | ^2.4.1 | Toast notifications |
| react-helmet-async | ^2.0.4 | SEO meta tags |
| recharts | ^2.12.2 | Admin analytics charts |
| clsx | ^2.1.0 | Conditional class names |

### Form & Validation

| Package | Version | Purpose |
|---------|---------|---------|
| react-hook-form | ^7.51.0 | Form state management |
| zod | ^3.22.4 | Schema validation |

### Testing

| Package | Version | Purpose |
|---------|---------|---------|
| vitest | ^1.3.1 | Unit test runner |
| @testing-library/react | ^14.2.2 | React component testing |
| @testing-library/jest-dom | ^6.4.2 | DOM matchers |
| jsdom | ^24.0.0 | Browser environment simulation |

---

## 4. Project Structure

```
ecommerce-app/
│
├── public/
│   └── favicon.svg                  # App favicon
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.tsx    # React error boundary
│   │   │   ├── Skeleton.tsx         # Loading skeleton components
│   │   │   └── StarRating.tsx       # Reusable star rating display
│   │   │
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx      # Admin panel sidebar layout
│   │   │   ├── Footer.tsx           # Site footer
│   │   │   ├── Header.tsx           # Top navigation bar
│   │   │   └── Layout.tsx           # Main app layout wrapper
│   │   │
│   │   └── product/
│   │       ├── ProductCard.tsx      # Product grid card
│   │       └── ProductFilters.tsx   # Filter sidebar/drawer
│   │
│   ├── data/
│   │   └── mockData.ts              # All sample products, categories, orders, coupons
│   │
│   ├── hooks/
│   │   └── useAppDispatch.ts        # Typed Redux hooks
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignupPage.tsx
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminCategories.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminOrders.tsx
│   │   │   ├── AdminProducts.tsx
│   │   │   └── AdminUsers.tsx
│   │   │
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── OrderDetailPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── WishlistPage.tsx
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts         # Authentication state
│   │   │   ├── cartSlice.ts         # Shopping cart state
│   │   │   ├── orderSlice.ts        # Orders state
│   │   │   ├── uiSlice.ts           # UI state (dark mode, search)
│   │   │   └── wishlistSlice.ts     # Wishlist state
│   │   └── index.ts                 # Redux store configuration
│   │
│   ├── test/
│   │   ├── mockData.test.ts         # Mock data validation tests
│   │   ├── setup.ts                 # Test environment setup
│   │   └── utils.test.ts            # Utility function tests
│   │
│   ├── types/
│   │   └── index.ts                 # All TypeScript interfaces
│   │
│   ├── utils/
│   │   └── format.ts                # Currency, date, calculation helpers
│   │
│   ├── App.tsx                      # Root component with all routes
│   ├── index.css                    # Global styles + Tailwind directives
│   └── main.tsx                     # Application entry point
│
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS config
├── tailwind.config.js               # Tailwind custom theme
├── tsconfig.json                    # TypeScript config
├── tsconfig.node.json               # TypeScript config for Vite
├── vercel.json                      # Vercel deployment config
└── vite.config.ts                   # Vite build configuration
```

---

## 5. Installation & Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Clone & Run Locally

```bash
# Step 1: Clone the repository
git clone https://github.com/nikhithakurra08-hue/ecommerce-app.git

# Step 2: Navigate into the project
cd ecommerce-app

# Step 3: Install all dependencies
npm install

# Step 4: Start development server
npm run dev
```

The app runs at: **http://localhost:5173**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run all unit tests once |
| `npm run lint` | Run ESLint checks |

---

## 6. Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

### Available Variables

```env
# App Settings
VITE_APP_NAME=ShopZone
VITE_APP_URL=http://localhost:5173

# Razorpay Payment Gateway
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

# Stripe Payment Gateway
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# API (for future backend integration)
VITE_API_BASE_URL=https://api.example.com
```

> All variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env.VITE_*`

---

## 7. Features & Modules

### 7.1 User Authentication

**Files:** `src/pages/Auth/`, `src/store/slices/authSlice.ts`

The authentication system uses mock validation with localStorage persistence.

**Flow:**
```
User enters credentials
    → authSlice.login() dispatched
    → Credentials matched against mockUser / mockAdmin
    → User object stored in localStorage
    → isAuthenticated = true
    → Redirect to home page
```

**Protected Routes:** Checkout, Orders, Profile — redirect to `/login` if not authenticated.

**Admin Routes:** `/admin/*` — redirect to `/` if user role is not `admin`.

---

### 7.2 Product Management

**Files:** `src/pages/ProductsPage.tsx`, `src/pages/ProductDetailPage.tsx`, `src/data/mockData.ts`

**Search Logic:**
```typescript
// Searches name, brand, tags, and category
const filtered = products.filter(p =>
  p.name.toLowerCase().includes(query) ||
  p.brand.toLowerCase().includes(query) ||
  p.tags.some(t => t.includes(query))
)
```

**Filter Options:**
- Category (multi-select)
- Brand (multi-select)
- Price Range (min/max input or quick ranges)
- Minimum Rating (4★, 3★, 2★)
- In Stock Only (checkbox)

**Sort Options:**
- Relevance (default)
- Price: Low to High
- Price: High to Low
- Customer Rating
- Newest First
- Best Discount

---

### 7.3 Cart System

**File:** `src/store/slices/cartSlice.ts`

| Action | Redux Method | Description |
|--------|-------------|-------------|
| Add item | `addToCart(product)` | Adds product or increments quantity |
| Remove item | `removeFromCart(id)` | Removes product from cart |
| Update qty | `updateQuantity({id, qty})` | Sets specific quantity |
| Save for later | `saveForLater(id)` | Moves to saved section |
| Move to cart | `moveToCart(id)` | Moves saved item back to cart |
| Remove saved | `removeSaved(id)` | Removes from saved section |
| Clear cart | `clearCart()` | Empties cart after order placed |

**Persistence:** Cart state auto-saves to `localStorage` on every change.

---

### 7.4 Checkout Flow

**File:** `src/pages/CheckoutPage.tsx`

The checkout is a 3-step wizard:

```
Step 1: Address Selection / Addition
    ↓
Step 2: Payment Method + Coupon Code
    ↓
Step 3: Order Review
    ↓
Order Placed → Success Screen
```

**Price Calculation:**
```
Subtotal  = sum(item.price × item.quantity)
Shipping  = subtotal >= 499 ? 0 : 99
Tax       = subtotal × 0.09  (9%)
Coupon    = based on coupon type (flat/percentage)
─────────────────────────────────────────────
Total     = Subtotal + Shipping + Tax - Coupon
```

---

### 7.5 Order Management

**Files:** `src/pages/OrdersPage.tsx`, `src/pages/OrderDetailPage.tsx`

**Order Status Flow:**
```
placed → confirmed → packed → shipped → delivered
```

**Cancellation Rules:**
- Can cancel: `placed`, `confirmed` status only
- Cannot cancel: `packed`, `shipped`, `delivered`

**Return Rules:**
- Can return: `delivered` status only

**Tracking Steps (visual progress bar):**
1. Order Placed
2. Confirmed
3. Packed
4. Shipped
5. Delivered

---

## 8. State Management

### Redux Store Structure

```typescript
store = {
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean
  },
  cart: {
    items: CartItem[],
    savedForLater: CartItem[]
  },
  wishlist: {
    items: WishlistItem[]
  },
  orders: {
    orders: Order[]
  },
  ui: {
    darkMode: boolean,
    searchQuery: string,
    recentlyViewed: string[]
  }
}
```

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { addToCart } from '../store/slices/cartSlice'

// Read state
const cartItems = useAppSelector(s => s.cart.items)

// Dispatch action
const dispatch = useAppDispatch()
dispatch(addToCart(product))
```

### localStorage Persistence

All slices auto-sync to localStorage:

| Slice | localStorage Key |
|-------|----------------|
| auth | `user` |
| cart items | `cart` |
| saved for later | `savedForLater` |
| wishlist | `wishlist` |
| orders | `orders` |
| dark mode | `darkMode` |
| recently viewed | `recentlyViewed` |

---

## 9. Routing

### Route Structure

```
/                          → HomePage
/products                  → ProductsPage
/products/:slug            → ProductDetailPage
/cart                      → CartPage
/wishlist                  → WishlistPage
/checkout                  → CheckoutPage (Protected)
/orders                    → OrdersPage (Protected)
/orders/:id                → OrderDetailPage (Protected)
/profile                   → ProfilePage (Protected)
/login                     → LoginPage
/signup                    → SignupPage
/forgot-password           → ForgotPasswordPage
/admin                     → AdminDashboard (Admin only)
/admin/products            → AdminProducts (Admin only)
/admin/orders              → AdminOrders (Admin only)
/admin/users               → AdminUsers (Admin only)
/admin/categories          → AdminCategories (Admin only)
*                          → NotFoundPage (404)
```

### Route Guards

```typescript
// PrivateRoute — requires login
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAppSelector(s => s.auth)
  return isAuthenticated ? children : <Navigate to="/login" />
}

// AdminRoute — requires admin role
function AdminRoute({ children }) {
  const { user } = useAppSelector(s => s.auth)
  return user?.role === 'admin' ? children : <Navigate to="/" />
}
```

### SPA Routing on Vercel

`vercel.json` rewrites all URLs to `index.html` so React Router handles navigation:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 10. Components Guide

### Header (`src/components/layout/Header.tsx`)

**Features:**
- Logo with link to home
- Search bar with form submission
- Dark mode toggle
- User dropdown (login/profile/logout)
- Wishlist icon with item count badge
- Cart icon with item count badge
- Category navigation bar (desktop)
- Hamburger menu (mobile)

**Props:** None — reads from Redux store directly.

---

### ProductCard (`src/components/product/ProductCard.tsx`)

**Props:**
```typescript
interface Props {
  product: Product
}
```

**Features:**
- Product image with hover zoom
- Discount badge (top-left)
- Best Seller badge
- Wishlist toggle button
- Star rating display
- Price with strikethrough original price
- Add to Cart button
- Quick view link

---

### ProductFilters (`src/components/product/ProductFilters.tsx`)

**Props:**
```typescript
interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}
```

**Behavior:**
- Desktop: Always visible sidebar
- Mobile: Slide-in drawer triggered by "Filters" button
- Collapsible sections (Category, Brand, Price, Rating)
- "Clear All Filters" resets everything

---

### StarRating (`src/components/common/StarRating.tsx`)

**Props:**
```typescript
interface Props {
  rating: number      // 0-5
  size?: number       // icon size (default: 14)
  showCount?: boolean // show review count
  count?: number      // number of reviews
}
```

---

### Skeleton Components (`src/components/common/Skeleton.tsx`)

**Available:**
- `<ProductCardSkeleton />` — for product grid loading
- `<ProductDetailSkeleton />` — for product detail page loading
- `<OrderSkeleton />` — for order list loading

---

## 11. Pages Guide

### HomePage (`src/pages/HomePage.tsx`)
- Hero banner with CTA
- Features strip (Free Delivery, Secure Payment, Easy Returns, 24/7 Support)
- Category grid (8 categories)
- Featured Products section
- Promotional banner strip
- Best Sellers section
- All Products section

### ProductsPage (`src/pages/ProductsPage.tsx`)
- URL query params: `?q=`, `?category=`, `?featured=`, `?sort=`
- 600ms loading skeleton simulation
- Filter sidebar + sort dropdown
- Results count display
- Empty state with "Clear Filters" CTA

### ProductDetailPage (`src/pages/ProductDetailPage.tsx`)
- Breadcrumb navigation
- Image gallery with thumbnail selector
- Quantity selector
- Add to Cart + Buy Now buttons
- Wishlist + Share buttons
- Delivery info cards
- Tabbed content: Description | Specifications | Reviews
- Rating breakdown chart
- Related products section

### CheckoutPage (`src/pages/CheckoutPage.tsx`)
- 3-step wizard with visual stepper
- Address form with validation (react-hook-form)
- Payment method radio selection
- Coupon code input with validation
- Order summary sidebar
- Success screen with order ID

### ProfilePage (`src/pages/ProfilePage.tsx`)
- Stats header (orders count, wishlist count, addresses count)
- 3 tabs: Profile | Addresses | Security
- Inline address add/delete form
- Profile edit with dirty state detection

---

## 12. Mock Data

**File:** `src/data/mockData.ts`

### Products (12 items)

| ID | Name | Category | Price |
|----|------|----------|-------|
| p1 | Apple iPhone 15 Pro Max | Electronics | ₹1,34,900 |
| p2 | Samsung Galaxy S24 Ultra | Electronics | ₹1,29,999 |
| p3 | Sony WH-1000XM5 Headphones | Electronics | ₹24,990 |
| p4 | Nike Air Max 270 | Fashion | ₹11,995 |
| p5 | Instant Pot Duo 7-in-1 | Home & Kitchen | ₹8,999 |
| p6 | The Alchemist — Paulo Coelho | Books | ₹299 |
| p7 | Yoga Mat Premium 6mm | Sports | ₹1,299 |
| p8 | Lakme Foundation | Beauty | ₹549 |
| p9 | LEGO Technic Bugatti Chiron | Toys | ₹31,999 |
| p10 | MacBook Air M3 13" | Electronics | ₹1,14,900 |
| p11 | Adidas Ultraboost 23 | Fashion | ₹16,999 |
| p12 | Tata Sampann Moong Dal | Grocery | ₹159 |

### Categories (8 items)

Electronics · Fashion · Home & Kitchen · Sports · Books · Beauty · Toys · Grocery

### TypeScript Interfaces

```typescript
interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number
  discount: number
  images: string[]
  category: string
  categoryId: string
  brand: string
  rating: number
  reviewCount: number
  stock: number
  sku: string
  tags: string[]
  specifications: Record<string, string>
  reviews: Review[]
  isFeatured: boolean
  isBestSeller: boolean
  createdAt: string
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  address: Address
  paymentMethod: 'razorpay' | 'stripe' | 'cod'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  subtotal: number
  discount: number
  couponCode?: string
  couponDiscount: number
  shipping: number
  tax: number
  total: number
  trackingId?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}
```

---

## 13. API Service Layer

The current version uses mock data. To connect a real backend, replace data calls in components with API calls.

### Recommended API service structure

```typescript
// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = {
  products: {
    getAll: () => fetch(`${BASE_URL}/products`).then(r => r.json()),
    getById: (id: string) => fetch(`${BASE_URL}/products/${id}`).then(r => r.json()),
    search: (q: string) => fetch(`${BASE_URL}/products?q=${q}`).then(r => r.json()),
  },
  orders: {
    place: (order: Order) => fetch(`${BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(order) }),
    getByUser: (userId: string) => fetch(`${BASE_URL}/orders?userId=${userId}`).then(r => r.json()),
  },
  auth: {
    login: (email: string, password: string) => fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) }),
    signup: (data: SignupData) => fetch(`${BASE_URL}/auth/signup`, { method: 'POST', body: JSON.stringify(data) }),
  }
}
```

---

## 14. Styling System

### Tailwind Configuration

**File:** `tailwind.config.js`

**Custom Colors:**

```javascript
colors: {
  amazon: {
    50:  '#fff8e7',
    500: '#ff9900',   // Primary orange (buttons, highlights)
    600: '#e68a00',   // Hover state
  },
  navy: {
    800: '#131921',   // Header background
    700: '#1a2535',
    600: '#232f3e',   // Category bar
    500: '#37475a',   // Hover states
  }
}
```

### Reusable CSS Classes

Defined in `src/index.css`:

```css
.btn-primary    /* Orange filled button */
.btn-secondary  /* Gray filled button */
.btn-outline    /* Bordered button */
.card           /* White/dark rounded card with border */
.input          /* Styled form input */
.skeleton       /* Animated loading placeholder */
.badge          /* Small pill label */
```

### Dark Mode

- Activated by adding `.dark` class to `<html>` element
- Toggled via `uiSlice.toggleDarkMode()`
- Persisted in localStorage
- All components use `dark:` Tailwind variants

---

## 15. Testing

**Framework:** Vitest + Testing Library

### Run Tests

```bash
# Run once
npm run test -- --run

# Watch mode
npm run test
```

### Test Files

**`src/test/utils.test.ts`** — Utility function tests

```
✓ formatCurrency - formats number as INR
✓ formatCurrency - handles zero
✓ calculateTax - calculates 9% tax by default
✓ calculateTax - calculates custom tax rate
✓ calculateShipping - returns 0 for orders above 499
✓ calculateShipping - returns 99 for orders below 499
✓ generateOrderId - starts with ORD
✓ generateOrderId - generates unique IDs
✓ getDiscountedPrice - applies discount correctly
```

**`src/test/mockData.test.ts`** — Data integrity tests

```
✓ has at least 10 products
✓ all products have required fields
✓ has at least 8 categories
✓ all coupons have valid structure
✓ mockUser has valid role
```

### Adding New Tests

```typescript
// src/test/myComponent.test.ts
import { describe, it, expect } from 'vitest'

describe('My Feature', () => {
  it('does something correctly', () => {
    expect(myFunction(input)).toBe(expectedOutput)
  })
})
```

---

## 16. Deployment Guide

### Deploy to Vercel (Recommended)

**Method 1 — GitHub Integration (Auto-deploy)**

1. Push code to GitHub
2. Go to vercel.com → New Project
3. Import `nikhithakurra08-hue/ecommerce-app`
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy**

Every `git push` to `main` will auto-redeploy.

**Method 2 — Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Vercel Configuration

**`vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

The `rewrites` rule ensures all routes serve `index.html` — this prevents 404 errors when refreshing pages like `/products/apple-iphone-15-pro-max`.

### Build Output

```
dist/
├── index.html              (1.06 kB)
├── assets/
│   ├── index-*.css         (37.80 kB)
│   ├── vendor-*.js         (155.75 kB — React, Router)
│   ├── redux-*.js          (30.54 kB — Redux)
│   ├── charts-*.js         (383.54 kB — Recharts)
│   └── index-*.js          (204.30 kB — App code)
```

Total gzipped size: ~228 kB

---

## 17. Payment Integration

### Current Status

| Gateway | Status | What's ready |
|---------|--------|-------------|
| Razorpay | UI Ready | Payment method selection, order creation |
| Stripe | UI Ready | Payment method selection, order creation |
| Cash on Delivery | Fully Working | Complete end-to-end flow |

### Integrate Razorpay

1. Create account at razorpay.com
2. Get your Key ID from Dashboard → Settings → API Keys
3. Add to `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
   ```
4. Add Razorpay script to `index.html`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
5. In `CheckoutPage.tsx`, replace the mock order placement with:
   ```typescript
   const options = {
     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
     amount: total * 100, // in paise
     currency: 'INR',
     name: 'ShopZone',
     description: `Order ${orderId}`,
     handler: (response) => {
       // Payment successful — place order
       dispatch(placeOrder({ ...order, paymentStatus: 'paid' }))
     }
   }
   const rzp = new (window as any).Razorpay(options)
   rzp.open()
   ```

### Integrate Stripe

1. Create account at stripe.com
2. Get publishable key from Dashboard → Developers → API Keys
3. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
   ```
4. Install Stripe:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```
5. Wrap checkout with `<Elements>` provider and use `useStripe()` hook

---

## 18. Admin Panel

**Access:** `/admin` (requires `admin@shopzone.com` login)

### Dashboard

- **Revenue card** — total from paid orders
- **Orders card** — total order count
- **Products card** — active (in-stock) product count
- **Rating card** — average rating across all products
- **Bar chart** — monthly revenue (Jan–Jun)
- **Line chart** — monthly order trend
- **Recent orders table** — last 5 orders with status

### Products Management

- Search by name or brand
- Edit: name, brand, category, price, original price, stock
- Delete with confirmation dialog
- Add new product form (mock — adds to local state)

### Orders Management

- View all orders from all users
- Filter by order status
- Search by Order ID
- Link to order detail page

### Users Management

- List all registered users
- Shows: name, email, role badge, join date, status

### Categories Management

- View all 8 categories with image preview
- Edit: name, slug, description
- Delete with confirmation
- Add new category form

---

## 19. Performance

### Code Splitting

`vite.config.ts` splits the bundle into 4 chunks:

```typescript
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],  // 155 kB
  redux: ['@reduxjs/toolkit', 'react-redux'],           //  30 kB
  charts: ['recharts'],                                  // 383 kB (admin only)
}
```

Recharts (large) is only loaded on admin pages.

### Image Optimization

- All product images served from Unsplash CDN
- Images use `loading="lazy"` attribute
- Hover effects use CSS `transform` (GPU-accelerated)

### Caching

Vercel serves `/assets/*` files with:
```
Cache-Control: public, max-age=31536000, immutable
```

Content-hashed filenames ensure users always get fresh files on deploy.

---

## 20. Troubleshooting

### Common Issues

**1. White screen after deployment**

Cause: SPA routing not configured.
Fix: Ensure `vercel.json` has the rewrite rule. Re-deploy.

**2. Cart/auth lost on refresh**

Cause: localStorage not initialized properly.
Fix: Check browser console for storage errors. Clear localStorage and reload.

**3. Build fails with TypeScript errors**

```bash
# Check exact errors
npx tsc --noEmit
```

**4. Dark mode not persisting**

Cause: localStorage key mismatch.
Fix: Check `uiSlice.ts` — `localStorage.setItem('darkMode', ...)`

**5. Images not loading**

Cause: Unsplash URL rate limiting.
Fix: Replace with your own image URLs or use a local image CDN.

**6. Coupon not applying**

Cause: Order total below minimum.
Fix: Check `coupons` array in `mockData.ts` for `minOrder` values.

---

## 21. Future Roadmap

### Phase 2 — Backend Integration

- [ ] Node.js + Express REST API
- [ ] MongoDB / PostgreSQL database
- [ ] JWT authentication
- [ ] Real Razorpay / Stripe payment processing
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] OTP-based login

### Phase 3 — Enhanced Features

- [ ] Product image upload (Cloudinary)
- [ ] Real-time inventory management
- [ ] Product recommendations (collaborative filtering)
- [ ] Advanced search (Elasticsearch / Algolia)
- [ ] Multi-vendor / seller marketplace
- [ ] Loyalty points / rewards system
- [ ] Flash sales with countdown timer
- [ ] PWA (Progressive Web App) — offline support

### Phase 4 — Mobile App

- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Barcode scanner for product search
- [ ] Augmented Reality product preview

---

## Support

| Channel | Details |
|---------|---------|
| GitHub Issues | https://github.com/nikhithakurra08-hue/ecommerce-app/issues |
| Email | support@shopzone.com |

---

*Documentation last updated: June 2026*
*ShopZone v1.0.0 — Built with React + Vite + TypeScript*
