# ShopZone — Complete Project Documentation

---

## 📌 Table of Contents

1. [Project Introduction](#1-project-introduction)
2. [Project Goals & Objectives](#2-project-goals--objectives)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Folder Structure](#5-folder-structure)
6. [Database Design (Mock Data Schema)](#6-database-design-mock-data-schema)
7. [Module-wise Feature Documentation](#7-module-wise-feature-documentation)
8. [User Interface Design](#8-user-interface-design)
9. [State Management Architecture](#9-state-management-architecture)
10. [Routing & Navigation](#10-routing--navigation)
11. [Authentication & Authorization](#11-authentication--authorization)
12. [Payment System](#12-payment-system)
13. [Admin Panel](#13-admin-panel)
14. [API Layer Design](#14-api-layer-design)
15. [Testing Strategy](#15-testing-strategy)
16. [Deployment & DevOps](#16-deployment--devops)
17. [Security Considerations](#17-security-considerations)
18. [Performance Optimization](#18-performance-optimization)
19. [Accessibility & SEO](#19-accessibility--seo)
20. [Limitations & Known Issues](#20-limitations--known-issues)
21. [Future Enhancements](#21-future-enhancements)
22. [Glossary](#22-glossary)

---

## 1. Project Introduction

### 1.1 What is ShopZone?

**ShopZone** is a fully functional, Amazon-inspired eCommerce web application built for modern browsers. It provides a complete online shopping experience — from browsing products and managing a cart, to placing orders and tracking deliveries — all without requiring a backend server.

It is designed for:
- **QA Teams** — to test eCommerce flows end-to-end
- **Developers** — as a reference architecture for React + Redux applications
- **Product Managers** — to demo features to stakeholders
- **Students** — to learn full-stack frontend patterns

### 1.2 Project Summary

| Property | Details |
|----------|---------|
| Project Name | ShopZone |
| Version | 1.0.0 |
| Type | Single Page Application (SPA) |
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| State | Redux Toolkit |
| Backend | None (Mock Data + localStorage) |
| Hosting | Vercel |
| Repository | https://github.com/nikhithakurra08-hue/ecommerce-app |

### 1.3 Key Features at a Glance

```
✅ User Registration & Login
✅ Product Browsing, Search, Filter & Sort
✅ Shopping Cart with Quantity Management
✅ Wishlist & Save for Later
✅ Full Checkout Flow (3-step wizard)
✅ Coupon / Discount System
✅ Order Placement & Tracking
✅ Order Cancellation & Return
✅ User Profile & Address Management
✅ Admin Dashboard with Analytics
✅ Admin Product / Order / Category CRUD
✅ Dark Mode & Light Mode
✅ Fully Responsive (Mobile + Tablet + Desktop)
✅ Loading Skeletons & Toast Notifications
✅ SEO Meta Tags
✅ Error Boundary & 404 Page
✅ 14 Unit Tests
```

---

## 2. Project Goals & Objectives

### 2.1 Primary Goals

| Goal | Description |
|------|-------------|
| **Complete eCommerce Flow** | Every step from landing to order confirmation must work |
| **Zero Backend Dependency** | Run entirely in browser using mock data |
| **Production Ready** | Build without errors, deploy without configuration |
| **QA Friendly** | Sample data, demo accounts, coupon codes ready to test |
| **Maintainable Code** | Modular components, typed interfaces, clean folder structure |

### 2.2 What This Project Demonstrates

- How to architect a large React application
- Redux Toolkit patterns for real-world state management
- TypeScript interfaces for eCommerce domain models
- Protected routing with React Router v6
- Form validation with React Hook Form
- LocalStorage as a lightweight persistence layer
- Responsive design with Tailwind CSS
- Admin dashboards with Recharts
- Vercel deployment with SPA routing

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                     │
│                                                          │
│  ┌─────────────┐    ┌──────────────┐   ┌─────────────┐  │
│  │  React UI   │◄──►│ Redux Store  │◄──►│localStorage │  │
│  │  Components │    │  (5 slices)  │   │(persistence)│  │
│  └──────┬──────┘    └──────┬───────┘   └─────────────┘  │
│         │                  │                              │
│  ┌──────▼──────────────────▼───────┐                     │
│  │         Mock Data Layer          │                     │
│  │  (products, categories, orders)  │                     │
│  └──────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────┘
         │
         │ (future: REST API calls)
         ▼
┌─────────────────┐
│   Backend API   │  (not yet implemented)
│  Node.js/Express│
└────────┬────────┘
         │
┌────────▼────────┐
│    Database     │  (not yet implemented)
│  MongoDB/PostgreSQL│
└─────────────────┘
```

### 3.2 Data Flow Architecture

```
User Interaction (click, type, submit)
        │
        ▼
React Component (event handler)
        │
        ▼
Redux Action Dispatched
        │
        ▼
Redux Slice Reducer (state updated)
        │
        ├──► localStorage (persisted)
        │
        ▼
React Component Re-renders (via useSelector)
        │
        ▼
Updated UI shown to User
```

### 3.3 Component Tree (Simplified)

```
App.tsx
├── Layout.tsx
│   ├── Header.tsx
│   │   ├── SearchBar
│   │   ├── UserDropdown
│   │   ├── CartIcon (with badge)
│   │   └── WishlistIcon (with badge)
│   ├── CategoryBar
│   ├── <Outlet /> (page content)
│   └── Footer.tsx
│
├── AdminLayout.tsx
│   ├── Sidebar
│   └── <Outlet /> (admin page)
│
└── Auth Pages (no layout)
    ├── LoginPage
    ├── SignupPage
    └── ForgotPasswordPage
```

---

## 4. Technology Stack

### 4.1 Frontend Core

| Technology | Version | Why Used |
|-----------|---------|----------|
| **React** | 18.2.0 | Industry-standard UI library, component model |
| **TypeScript** | 5.2.2 | Type safety, better IDE support, fewer runtime errors |
| **Vite** | 5.2.0 | Lightning-fast builds, native ESM, Vercel optimized |
| **React Router DOM** | 6.22.3 | Declarative client-side routing |

### 4.2 State Management

| Technology | Version | Why Used |
|-----------|---------|----------|
| **Redux Toolkit** | 2.2.1 | Simplified Redux, built-in Immer for immutability |
| **React Redux** | 9.1.0 | Official React bindings for Redux |

### 4.3 UI & Styling

| Technology | Version | Why Used |
|-----------|---------|----------|
| **Tailwind CSS** | 3.4.1 | Utility-first, dark mode, responsive built-in |
| **Lucide React** | 0.358.0 | Consistent, clean icon library |
| **Recharts** | 2.12.2 | Composable charts for admin analytics |
| **clsx** | 2.1.0 | Conditional CSS class merging |

### 4.4 Forms & Validation

| Technology | Version | Why Used |
|-----------|---------|----------|
| **React Hook Form** | 7.51.0 | Performant forms with minimal re-renders |
| **Zod** | 3.22.4 | Schema-first validation |

### 4.5 UX Utilities

| Technology | Version | Why Used |
|-----------|---------|----------|
| **React Hot Toast** | 2.4.1 | Lightweight, customizable toast notifications |
| **React Helmet Async** | 2.0.4 | Dynamic SEO meta tags per page |
| **date-fns** | 3.3.1 | Date formatting utilities |
| **uuid** | 9.0.1 | Unique ID generation |

### 4.6 Testing

| Technology | Version | Why Used |
|-----------|---------|----------|
| **Vitest** | 1.3.1 | Vite-native test runner, Jest-compatible |
| **Testing Library React** | 14.2.2 | Component testing utilities |
| **Testing Library Jest DOM** | 6.4.2 | Custom DOM matchers |
| **jsdom** | 24.0.0 | Browser environment simulation |

### 4.7 Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality, consistency |
| **PostCSS** | CSS processing for Tailwind |
| **Autoprefixer** | Cross-browser CSS prefixes |
| **Git** | Version control |
| **GitHub** | Remote repository |
| **Vercel** | Deployment & hosting |

---

## 5. Folder Structure

```
ecommerce-app/                          ← Root directory
│
├── public/                             ← Static assets
│   └── favicon.svg                     ← Browser tab icon
│
├── src/                                ← All source code
│   │
│   ├── components/                     ← Reusable UI components
│   │   ├── common/                     ← Shared across all pages
│   │   │   ├── ErrorBoundary.tsx       ← Catches React crashes
│   │   │   ├── Skeleton.tsx            ← Loading placeholders
│   │   │   └── StarRating.tsx          ← Star display component
│   │   │
│   │   ├── layout/                     ← Page layout wrappers
│   │   │   ├── Header.tsx              ← Top navigation bar
│   │   │   ├── Footer.tsx              ← Site footer
│   │   │   ├── Layout.tsx              ← Main layout (Header+Footer+Outlet)
│   │   │   └── AdminLayout.tsx         ← Admin sidebar layout
│   │   │
│   │   └── product/                    ← Product-specific components
│   │       ├── ProductCard.tsx         ← Product grid card
│   │       └── ProductFilters.tsx      ← Filter sidebar/drawer
│   │
│   ├── data/                           ← Mock/seed data
│   │   └── mockData.ts                 ← Products, categories, orders, coupons, users
│   │
│   ├── hooks/                          ← Custom React hooks
│   │   └── useAppDispatch.ts           ← Typed dispatch + selector hooks
│   │
│   ├── pages/                          ← Page-level components
│   │   ├── Auth/                       ← Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   │
│   │   ├── Admin/                      ← Admin panel pages
│   │   │   ├── AdminDashboard.tsx      ← Charts + stats overview
│   │   │   ├── AdminProducts.tsx       ← Product management table
│   │   │   ├── AdminOrders.tsx         ← Order management table
│   │   │   ├── AdminUsers.tsx          ← User list
│   │   │   └── AdminCategories.tsx     ← Category management
│   │   │
│   │   ├── HomePage.tsx                ← Landing page
│   │   ├── ProductsPage.tsx            ← Product listing + filters
│   │   ├── ProductDetailPage.tsx       ← Single product view
│   │   ├── CartPage.tsx                ← Shopping cart
│   │   ├── WishlistPage.tsx            ← Saved wishlist
│   │   ├── CheckoutPage.tsx            ← 3-step checkout wizard
│   │   ├── OrdersPage.tsx              ← Order history list
│   │   ├── OrderDetailPage.tsx         ← Single order + tracking
│   │   ├── ProfilePage.tsx             ← User profile settings
│   │   └── NotFoundPage.tsx            ← 404 error page
│   │
│   ├── store/                          ← Redux state management
│   │   ├── index.ts                    ← Store configuration
│   │   └── slices/                     ← Individual state slices
│   │       ├── authSlice.ts            ← Login / logout / profile
│   │       ├── cartSlice.ts            ← Cart items + saved for later
│   │       ├── wishlistSlice.ts        ← Wishlist items
│   │       ├── orderSlice.ts           ← Orders history
│   │       └── uiSlice.ts              ← Dark mode, search, recently viewed
│   │
│   ├── test/                           ← Unit tests
│   │   ├── setup.ts                    ← Test environment setup
│   │   ├── utils.test.ts               ← Utility function tests
│   │   └── mockData.test.ts            ← Data integrity tests
│   │
│   ├── types/                          ← TypeScript type definitions
│   │   └── index.ts                    ← All interfaces & types
│   │
│   ├── utils/                          ← Helper functions
│   │   └── format.ts                   ← Currency, date, price helpers
│   │
│   ├── App.tsx                         ← Root component + route definitions
│   ├── main.tsx                        ← Application entry point
│   └── index.css                       ← Global CSS + Tailwind directives
│
├── docs/                               ← Project documentation
│   └── PROJECT_DOCUMENTATION.md        ← This file
│
├── .env.example                        ← Environment variable template
├── .gitignore                          ← Files excluded from Git
├── index.html                          ← HTML shell
├── package.json                        ← Dependencies + npm scripts
├── postcss.config.js                   ← PostCSS configuration
├── tailwind.config.js                  ← Tailwind custom theme
├── tsconfig.json                       ← TypeScript configuration
├── tsconfig.node.json                  ← TypeScript for Vite config
├── vercel.json                         ← Vercel deployment settings
└── vite.config.ts                      ← Vite build configuration
```

---

## 6. Database Design (Mock Data Schema)

Since this project uses no real database, the data structures are defined as TypeScript interfaces in `src/types/index.ts`.

### 6.1 User

```typescript
interface User {
  id: string                    // Unique identifier
  name: string                  // Full name
  email: string                 // Email address (login key)
  phone?: string                // Optional phone number
  avatar?: string               // Profile image URL
  role: 'user' | 'admin'        // Access level
  addresses: Address[]          // Saved delivery addresses
  createdAt: string             // Account creation date (ISO)
}
```

### 6.2 Address

```typescript
interface Address {
  id: string
  name: string                  // Recipient name
  phone: string                 // Contact number
  line1: string                 // Street address
  line2?: string                // Landmark / apartment
  city: string
  state: string
  pincode: string               // 6-digit PIN
  country: string
  isDefault: boolean            // Primary address flag
}
```

### 6.3 Product

```typescript
interface Product {
  id: string
  name: string
  slug: string                  // URL-friendly identifier
  description: string
  price: number                 // Selling price (INR)
  originalPrice: number         // MRP before discount
  discount: number              // Discount percentage
  images: string[]              // Array of image URLs
  category: string              // Category name
  categoryId: string            // Category reference
  brand: string
  rating: number                // Average rating (0-5)
  reviewCount: number
  stock: number                 // Available quantity
  sku: string                   // Stock keeping unit
  tags: string[]                // Search tags
  specifications: Record<string, string>  // Key-value spec table
  reviews: Review[]
  isFeatured: boolean
  isBestSeller: boolean
  createdAt: string
}
```

### 6.4 Review

```typescript
interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number                // 1-5 stars
  title: string
  comment: string
  helpful: number               // "Was this helpful?" count
  createdAt: string
}
```

### 6.5 Cart Item

```typescript
interface CartItem {
  product: Product              // Full product object
  quantity: number
  savedForLater?: boolean
}
```

### 6.6 Order

```typescript
interface Order {
  id: string                    // e.g., ORD123456789
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
  shipping: number              // 0 if free, else 99
  tax: number                   // 9% of subtotal
  total: number                 // Final amount charged
  trackingId?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  deliveredAt?: string
}
```

### 6.7 Coupon

```typescript
interface Coupon {
  id: string
  code: string                  // e.g., SAVE10
  type: 'percentage' | 'flat'   // Discount type
  value: number                 // 10 = 10% OR ₹10 flat
  minOrder: number              // Minimum cart total
  maxDiscount?: number          // Cap on percentage discounts
  expiresAt: string
  usageLimit: number            // Max uses allowed
  usedCount: number             // Times used so far
  isActive: boolean
}
```

### 6.8 Category

```typescript
interface Category {
  id: string
  name: string
  slug: string                  // URL slug
  image: string                 // Category cover image
  parentId?: string             // For sub-categories (future)
  description?: string
}
```

---

## 7. Module-wise Feature Documentation

### 7.1 Authentication Module

**Files:** `src/pages/Auth/`, `src/store/slices/authSlice.ts`

#### Sign Up Flow

```
1. User fills name, email, password, confirm password
2. React Hook Form validates all fields
3. On submit → dispatch(signup({ name, email }))
4. New User object created with mock ID
5. Stored in localStorage under key 'user'
6. isAuthenticated = true
7. Redirect to home page
8. Toast: "Account created! Welcome 🎉"
```

#### Login Flow

```
1. User enters email + password
2. Form validates (required, email format, min 6 chars)
3. On submit → dispatch(login({ email, password }))
4. Checks if email matches mockAdmin or mockUser
5. Any email containing '@' creates a user session
6. User stored in localStorage
7. Redirect to home page
8. Toast: "Welcome back!"
```

#### Logout Flow

```
1. User clicks Sign Out in dropdown
2. dispatch(logout())
3. localStorage key 'user' removed
4. isAuthenticated = false
5. Redirect to home page
```

#### Password Reset Flow (Mock)

```
1. User enters email on forgot-password page
2. 800ms simulated delay
3. "Check your email" success screen shown
4. (No actual email sent in demo mode)
```

---

### 7.2 Product Module

**Files:** `src/pages/ProductsPage.tsx`, `src/pages/ProductDetailPage.tsx`

#### Product Listing Logic

```typescript
// Step 1: Start with all 12 products
let list = [...products]

// Step 2: Apply search query
if (query) {
  list = list.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}

// Step 3: Apply category filter
if (filters.categories.length) {
  list = list.filter(p => filters.categories.includes(p.category.slug))
}

// Step 4: Apply brand filter
if (filters.brands.length) {
  list = list.filter(p => filters.brands.includes(p.brand))
}

// Step 5: Apply price range
if (filters.priceMin > 0) list = list.filter(p => p.price >= filters.priceMin)
if (filters.priceMax > 0) list = list.filter(p => p.price <= filters.priceMax)

// Step 6: Apply minimum rating
if (filters.minRating > 0) list = list.filter(p => p.rating >= filters.minRating)

// Step 7: Apply in-stock filter
if (filters.inStock) list = list.filter(p => p.stock > 0)

// Step 8: Sort
switch (sortBy) {
  case 'price-low':  list.sort((a, b) => a.price - b.price); break
  case 'price-high': list.sort((a, b) => b.price - a.price); break
  case 'rating':     list.sort((a, b) => b.rating - a.rating); break
  case 'newest':     list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
  case 'discount':   list.sort((a, b) => b.discount - a.discount); break
}
```

#### URL Parameters

| URL | Result |
|-----|--------|
| `/products` | All products |
| `/products?q=iphone` | Search results for "iphone" |
| `/products?category=electronics` | Electronics category |
| `/products?featured=true` | Featured products only |
| `/products?sort=rating` | Sorted by rating |

---

### 7.3 Cart Module

**File:** `src/store/slices/cartSlice.ts`

#### Cart State Structure

```typescript
{
  items: [
    {
      product: { id, name, price, images, ... },
      quantity: 2
    }
  ],
  savedForLater: [
    {
      product: { ... },
      quantity: 1
    }
  ]
}
```

#### Cart Actions

| Action | Behavior |
|--------|---------|
| `addToCart(product)` | If product exists → qty+1, else push new item |
| `removeFromCart(id)` | Filter out item by product ID |
| `updateQuantity({id, qty})` | Set exact quantity |
| `saveForLater(id)` | Move from items[] to savedForLater[] |
| `moveToCart(id)` | Move from savedForLater[] to items[] |
| `removeSaved(id)` | Remove from savedForLater[] |
| `clearCart()` | Empty items[] (called after order placed) |

#### Cart Calculations

```
Subtotal  = Σ (item.price × item.quantity)
Shipping  = subtotal >= 499 ? FREE (₹0) : ₹99
Tax       = subtotal × 9%
─────────────────────────────────────────
Total     = Subtotal + Shipping + Tax
```

---

### 7.4 Checkout Module

**File:** `src/pages/CheckoutPage.tsx`

#### Step 1 — Address

- Shows all saved addresses as radio buttons
- "Add New Address" form with validation:
  - Name (required)
  - Phone (required)
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - City, State, Pincode (required)
- New address saved to user profile in Redux

#### Step 2 — Payment + Coupon

**Payment Options:**
| Method | Description |
|--------|-------------|
| Razorpay | UPI, Cards, Net Banking |
| Stripe | Credit & Debit Cards |
| Cash on Delivery | Pay on arrival |

**Coupon Validation Logic:**
```typescript
const coupon = coupons.find(c => c.code === input.toUpperCase())

if (!coupon) → "Invalid coupon code"
if (!coupon.isActive) → "Coupon expired"
if (subtotal < coupon.minOrder) → "Min order ₹X required"

// Calculate discount
if (coupon.type === 'percentage') {
  discount = (subtotal × coupon.value / 100)
  discount = Math.min(discount, coupon.maxDiscount)  // cap applied
} else {
  discount = coupon.value  // flat amount
}
```

#### Step 3 — Review & Place Order

- Shows all items, address, payment method
- Final price breakdown
- "Place Order" button creates order in Redux

#### Order Placement

```typescript
const order: Order = {
  id: generateOrderId(),          // ORD + timestamp
  userId: user.id,
  items: cartItems,
  address: selectedAddress,
  paymentMethod,
  paymentStatus: method === 'cod' ? 'pending' : 'paid',
  orderStatus: 'placed',
  subtotal, shipping, tax,
  couponCode, couponDiscount,
  total,
  estimatedDelivery: today + 5 days,
  createdAt: now,
  updatedAt: now
}

dispatch(placeOrder(order))   // add to orders state
dispatch(clearCart())          // empty the cart
→ Navigate to success screen
```

---

### 7.5 Order Tracking Module

**File:** `src/pages/OrderDetailPage.tsx`

#### Order Status States

```
placed ──► confirmed ──► packed ──► shipped ──► delivered
```

Visual progress bar shows current step highlighted in orange.

#### Cancellation Rules

```
Can cancel:    placed, confirmed
Cannot cancel: packed, shipped, delivered
```

#### Return Rules

```
Can return:    delivered only
Cannot return: all other statuses
```

---

### 7.6 Wishlist Module

**File:** `src/store/slices/wishlistSlice.ts`

- `toggleWishlist(product)` — adds if not present, removes if present
- Heart icon fills red when wishlisted
- Wishlist count shown in header badge
- All wishlisted items shown on `/wishlist` page
- Items can be moved to cart from wishlist page

---

### 7.7 Profile Module

**File:** `src/pages/ProfilePage.tsx`

Three tabs:

| Tab | Features |
|-----|---------|
| **Profile** | Edit name and phone. Email is read-only. |
| **Addresses** | View, add, delete addresses. Set default address. |
| **Security** | Change password form. Enable 2FA (coming soon). |

**Profile Stats Header:**
- Total orders count
- Wishlist items count
- Saved addresses count

---

## 8. User Interface Design

### 8.1 Design System

**Primary Color:** Amazon Orange — `#ff9900`
**Background (dark):** `#131921` (Navy 800)
**Card background:** White / `#111827` (dark mode)
**Text:** `#111827` / `#f9fafb` (dark mode)

### 8.2 Typography

| Element | Style |
|---------|-------|
| Font Family | Inter (Google Fonts) |
| Page Titles | 2xl–3xl, font-bold |
| Section Headings | xl–2xl, font-semibold |
| Body Text | sm–base, font-normal |
| Labels | xs–sm, font-medium |

### 8.3 Responsive Breakpoints

| Breakpoint | Screen Width | Layout |
|-----------|-------------|--------|
| Mobile | < 640px | 1-2 column grid, hamburger menu |
| Tablet (sm) | 640px+ | 2-3 column grid |
| Laptop (md) | 768px+ | Side-by-side layouts |
| Desktop (lg) | 1024px+ | 4-column product grid |
| Wide (xl) | 1280px+ | 5-6 column product grid |

### 8.4 Dark Mode

- Toggle button in header (sun/moon icon)
- Adds/removes `.dark` class on `<html>` element
- Tailwind `dark:` variants apply automatically
- Preference saved in localStorage
- Persists across browser sessions

### 8.5 Loading States

| Component | Skeleton Used |
|-----------|-------------|
| Product grid | `<ProductCardSkeleton />` |
| Product detail page | `<ProductDetailSkeleton />` |
| Order list | `<OrderSkeleton />` |

Skeletons are animated grey blocks that pulse while data loads.

### 8.6 Toast Notification System

All user actions trigger toasts:

| Action | Toast |
|--------|-------|
| Add to cart | "Product added to cart" |
| Remove from cart | "Removed" |
| Add to wishlist | "Added to wishlist" |
| Apply coupon | "Coupon applied! You saved ₹X" |
| Invalid coupon | "Invalid coupon code" |
| Order placed | (redirect to success screen) |
| Profile updated | "Profile updated" |
| Address saved | "Address saved" |
| Link copied | "Link copied!" |

---

## 9. State Management Architecture

### 9.1 Redux Store Configuration

```typescript
// src/store/index.ts
export const store = configureStore({
  reducer: {
    auth: authReducer,        // User session
    cart: cartReducer,        // Shopping cart
    wishlist: wishlistReducer,// Saved products
    orders: orderReducer,     // Order history
    ui: uiReducer,            // App UI state
  }
})
```

### 9.2 Auth Slice

```
State:  { user, isAuthenticated, loading }
Actions: login, signup, logout, updateProfile
Persists to: localStorage['user']
```

### 9.3 Cart Slice

```
State:  { items[], savedForLater[] }
Actions: addToCart, removeFromCart, updateQuantity,
         saveForLater, moveToCart, removeSaved, clearCart
Persists to: localStorage['cart'], localStorage['savedForLater']
```

### 9.4 Wishlist Slice

```
State:  { items[] }
Actions: toggleWishlist, removeFromWishlist
Persists to: localStorage['wishlist']
```

### 9.5 Order Slice

```
State:  { orders[] }
Actions: placeOrder, cancelOrder, returnOrder
Persists to: localStorage['orders']
Initial state: mockOrders (3 sample orders)
```

### 9.6 UI Slice

```
State:  { darkMode, searchQuery, recentlyViewed[] }
Actions: toggleDarkMode, setSearchQuery, addRecentlyViewed
Persists to: localStorage['darkMode'], localStorage['recentlyViewed']
```

### 9.7 Typed Hooks

```typescript
// src/hooks/useAppDispatch.ts

// Always use these instead of raw useDispatch/useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

---

## 10. Routing & Navigation

### 10.1 All Application Routes

| Route | Component | Auth Required | Admin Required |
|-------|-----------|:---:|:---:|
| `/` | HomePage | ✗ | ✗ |
| `/products` | ProductsPage | ✗ | ✗ |
| `/products/:slug` | ProductDetailPage | ✗ | ✗ |
| `/cart` | CartPage | ✗ | ✗ |
| `/wishlist` | WishlistPage | ✗ | ✗ |
| `/checkout` | CheckoutPage | ✅ | ✗ |
| `/orders` | OrdersPage | ✅ | ✗ |
| `/orders/:id` | OrderDetailPage | ✅ | ✗ |
| `/profile` | ProfilePage | ✅ | ✗ |
| `/login` | LoginPage | ✗ | ✗ |
| `/signup` | SignupPage | ✗ | ✗ |
| `/forgot-password` | ForgotPasswordPage | ✗ | ✗ |
| `/admin` | AdminDashboard | ✅ | ✅ |
| `/admin/products` | AdminProducts | ✅ | ✅ |
| `/admin/orders` | AdminOrders | ✅ | ✅ |
| `/admin/users` | AdminUsers | ✅ | ✅ |
| `/admin/categories` | AdminCategories | ✅ | ✅ |
| `*` | NotFoundPage | ✗ | ✗ |

### 10.2 Navigation Guards

```typescript
// Requires login
<Route path="/checkout" element={
  <PrivateRoute><CheckoutPage /></PrivateRoute>
} />

// Requires admin role
<Route path="/admin" element={
  <AdminRoute><AdminLayout /></AdminRoute>
}>
```

### 10.3 Vercel SPA Routing Fix

Without `vercel.json`, refreshing `/products/apple-iphone` gives a 404 because Vercel looks for a file at that path.

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This sends ALL requests to `index.html`, letting React Router handle navigation.

---

## 11. Authentication & Authorization

### 11.1 How Authentication Works

**Login validation:**
```typescript
// authSlice.ts
login(state, action) {
  const { email } = action.payload
  let user = null

  if (email === 'admin@shopzone.com') {
    user = mockAdmin     // Admin role
  } else if (email includes '@') {
    user = { ...mockUser, email }  // Regular user
  }

  if (user) {
    state.user = user
    state.isAuthenticated = true
    localStorage.setItem('user', JSON.stringify(user))
  }
}
```

**Note:** In demo mode, **any valid email** creates a user session. The password field is not actually validated — focus is on demonstrating the flow, not security.

### 11.2 Session Persistence

On app load, `authSlice` checks localStorage:
```typescript
const storedUser = localStorage.getItem('user')
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser
}
```

This means users stay logged in after page refresh.

### 11.3 Role-Based Access Control

| Role | Access |
|------|--------|
| `guest` | Home, Products, Cart, Wishlist, Login, Signup |
| `user` | + Checkout, Orders, Profile |
| `admin` | + /admin/* (full admin panel) |

---

## 12. Payment System

### 12.1 Current Implementation

All three payment options are present in the UI but operate in **demo/mock mode**:

| Method | What happens on click |
|--------|----------------------|
| Razorpay | Selected → order placed with paymentStatus: 'paid' |
| Stripe | Selected → order placed with paymentStatus: 'paid' |
| Cash on Delivery | Selected → order placed with paymentStatus: 'pending' |

### 12.2 Integrating Real Razorpay

**Step 1:** Add env variable
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

**Step 2:** Add SDK to `index.html`
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

**Step 3:** Replace order placement logic
```typescript
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: total * 100,          // Amount in paise
  currency: 'INR',
  name: 'ShopZone',
  description: `Order ${orderId}`,
  image: '/favicon.svg',
  handler: function(response) {
    // Payment success
    dispatch(placeOrder({
      ...order,
      paymentStatus: 'paid',
      razorpayPaymentId: response.razorpay_payment_id
    }))
    navigate('/orders')
  },
  prefill: {
    name: user.name,
    email: user.email,
    contact: user.phone
  },
  theme: { color: '#ff9900' }
}
const rzp = new window.Razorpay(options)
rzp.open()
```

### 12.3 Integrating Real Stripe

**Step 1:** Install packages
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**Step 2:** Add env variable
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
```

**Step 3:** Wrap with Elements provider
```typescript
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

<Elements stripe={stripePromise}>
  <CheckoutPage />
</Elements>
```

---

## 13. Admin Panel

**Access URL:** `/admin`
**Required:** Login with `admin@shopzone.com` / `admin123`

### 13.1 Dashboard Page

**Stats Cards:**
| Card | Calculation |
|------|------------|
| Total Revenue | Sum of all orders where paymentStatus = 'paid' |
| Total Orders | orders.length |
| Active Products | products where stock > 0 |
| Average Rating | Sum of all product ratings / product count |

**Charts (Recharts):**
- **Bar Chart** — Monthly revenue (Jan–Jun sample data)
- **Line Chart** — Monthly order count trend

**Recent Orders Table:**
- Shows last 5 orders
- Columns: Order ID, Items, Status, Payment, Total, Date

### 13.2 Products Page

- **Search** by name or brand
- **Table columns:** Product image + name, Brand, Category, Price, Stock status, Rating, Actions
- **Edit:** Modal form with name, brand, category, prices, stock
- **Delete:** Confirmation dialog → removes from local state
- **Add:** Same modal form for new product

### 13.3 Orders Page

- Shows all orders from all users
- **Filter** by order status (dropdown)
- **Search** by Order ID
- Status badges with color coding
- Link to order detail page

### 13.4 Users Page

- Lists all users (mockAdmin + mockUser + 2 sample users)
- Columns: Name + avatar, Email, Role badge, Joined date, Status

### 13.5 Categories Page

- Grid view of all 8 categories with images
- **Edit:** Name, slug, description
- **Delete:** With confirmation
- **Add:** Creates new category in local state

---

## 14. API Layer Design

### 14.1 Current Architecture (Mock)

```
Component → mockData.ts → displays data
Component → Redux action → updates localStorage
```

### 14.2 Future Backend API Structure

When connecting a real backend, replace mock data calls with:

```typescript
// src/services/productService.ts
const BASE = import.meta.env.VITE_API_BASE_URL

export const productService = {
  getAll: async (params?: FilterParams) => {
    const query = new URLSearchParams(params as any).toString()
    const res = await fetch(`${BASE}/products?${query}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  getBySlug: async (slug: string) => {
    const res = await fetch(`${BASE}/products/${slug}`)
    if (!res.ok) throw new Error('Product not found')
    return res.json()
  },

  search: async (query: string) => {
    const res = await fetch(`${BASE}/products/search?q=${query}`)
    return res.json()
  }
}
```

```typescript
// src/services/orderService.ts
export const orderService = {
  place: async (order: Omit<Order, 'id'>) => {
    const res = await fetch(`${BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
    return res.json()
  },

  getByUser: async (userId: string) => {
    const res = await fetch(`${BASE}/orders?userId=${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return res.json()
  }
}
```

### 14.3 Utility Functions (`src/utils/format.ts`)

| Function | Input | Output | Example |
|----------|-------|--------|---------|
| `formatCurrency(n)` | number | INR string | `₹1,34,900` |
| `formatDate(d)` | ISO string | Readable date | `10 January 2024` |
| `truncate(text, len)` | string, number | Truncated string | `Apple iPho…` |
| `getDiscountedPrice(p, d)` | price, discount% | Discounted price | `900` |
| `calculateTax(amount)` | number | 9% tax | `900` |
| `calculateShipping(subtotal)` | number | 0 or 99 | `0` |
| `generateOrderId()` | — | Unique order ID | `ORD172634981` |
| `getStatusColor(status)` | string | Tailwind classes | `bg-green-100 text-green-700` |

---

## 15. Testing Strategy

### 15.1 Test Configuration

```typescript
// vite.config.ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts'
}
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
```

### 15.2 Test Coverage

**`src/test/utils.test.ts`** — 9 tests

```
formatCurrency
  ✓ formats number as INR
  ✓ handles zero

calculateTax
  ✓ calculates 9% tax by default
  ✓ calculates custom tax rate

calculateShipping
  ✓ returns 0 for orders above ₹499
  ✓ returns 99 for orders below ₹499

generateOrderId
  ✓ starts with ORD
  ✓ generates unique IDs at different times

getDiscountedPrice
  ✓ applies discount correctly
```

**`src/test/mockData.test.ts`** — 5 tests

```
Mock Data
  ✓ has at least 10 products
  ✓ all products have required fields (id, name, price, images)
  ✓ has at least 8 categories
  ✓ all coupons have valid structure (code, type, value)
  ✓ mockUser has valid role ('user' or 'admin')
```

**Total: 14 tests — all passing ✅**

### 15.3 Running Tests

```bash
# Run all tests once
npm run test -- --run

# Run in watch mode (re-runs on file change)
npm run test

# Run with coverage report
npm run test -- --coverage
```

### 15.4 Adding New Tests

```typescript
// src/test/newFeature.test.ts
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'

describe('ProductCard', () => {
  it('shows product name', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    )
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })
})
```

---

## 16. Deployment & DevOps

### 16.1 Local Development Setup

```bash
# Prerequisites
node --version    # Must be >= 18
npm --version     # Must be >= 9

# Clone and run
git clone https://github.com/nikhithakurra08-hue/ecommerce-app.git
cd ecommerce-app
npm install
npm run dev

# Open browser at:
# http://localhost:5173
```

### 16.2 Production Build

```bash
npm run build
```

**Output:**
```
dist/
├── index.html              (1.06 kB  │ gzip: 0.50 kB)
└── assets/
    ├── index-*.css         (37.80 kB │ gzip:  6.63 kB)
    ├── vendor-*.js         (155.75 kB│ gzip: 51.03 kB)
    ├── redux-*.js          (30.54 kB │ gzip: 11.44 kB)
    ├── charts-*.js         (383.54 kB│ gzip:105.45 kB)
    └── index-*.js          (204.30 kB│ gzip: 53.72 kB)

Total gzipped: ~228 kB
Build time:    ~10 seconds
```

### 16.3 Vercel Deployment

**Automatic (recommended):**
1. Push to GitHub `main` branch
2. Vercel detects push → auto builds → deploys
3. Live in ~60 seconds

**Manual:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**`vercel.json` explained:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

- **rewrites:** All URLs → `index.html` (React Router handles navigation)
- **headers:** Static assets cached for 1 year (content-hashed filenames)

### 16.4 Git Workflow

```bash
# Check current status
git status

# Add and commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub (auto-deploys to Vercel)
git push origin main
```

### 16.5 Environment Variables on Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable:

```
VITE_RAZORPAY_KEY_ID       = rzp_live_xxxxxxxxxx
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_xxxxxxxxxx
VITE_APP_URL               = https://your-domain.vercel.app
```

---

## 17. Security Considerations

### 17.1 Current Security (Demo Mode)

> This is a frontend-only demo application. It does NOT:
> - Store passwords (no real auth)
> - Make real payment charges
> - Send emails
> - Expose private keys

### 17.2 Security for Production

When adding a real backend, implement:

| Risk | Solution |
|------|---------|
| Password storage | bcrypt hashing (never plain text) |
| Authentication | JWT tokens with expiry |
| API calls | HTTPS only |
| Payment keys | Server-side only (never in frontend) |
| User input | Sanitize all inputs, prevent XSS |
| SQL/NoSQL injection | Use parameterized queries / ORM |
| CSRF | CSRF tokens on all state-changing requests |
| Rate limiting | Limit login attempts, API calls |
| CORS | Whitelist only trusted origins |

### 17.3 Environment Variables

- Never commit `.env` to Git (it's in `.gitignore`)
- Use `.env.example` to document what variables are needed
- `VITE_` prefix exposes variables to browser — never put secrets here
- Stripe/Razorpay secret keys must stay on the server

---

## 18. Performance Optimization

### 18.1 Code Splitting

Vite automatically splits code. Manual chunks defined:

```typescript
// vite.config.ts
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  redux: ['@reduxjs/toolkit', 'react-redux'],
  charts: ['recharts'],
}
```

Recharts (383 kB) only loads on admin pages — not loaded for regular users.

### 18.2 Image Optimization

- Images hosted on Unsplash CDN (globally cached)
- `loading="lazy"` on all product images
- CSS `transform` for hover effects (GPU-accelerated, no layout reflow)
- Images constrained with `object-cover` to prevent layout shifts

### 18.3 React Optimization

- `useMemo` for filtered/sorted product lists (prevents recalculation on unrelated renders)
- `useEffect` cleanup for timers (prevents memory leaks)
- Sticky header uses CSS `position: sticky` (no JavaScript scroll listeners)

### 18.4 Bundle Size

| Chunk | Size (gzip) |
|-------|------------|
| React + Router | 51 kB |
| Redux | 11 kB |
| App code | 54 kB |
| CSS | 7 kB |
| **Total (non-admin)** | **~123 kB** |

Admin users additionally load Recharts (105 kB gzip).

---

## 19. Accessibility & SEO

### 19.1 SEO

Each page has dynamic meta tags via `react-helmet-async`:

```tsx
// ProductDetailPage.tsx
<Helmet>
  <title>{product.name} — ShopZone</title>
  <meta name="description" content={product.description.slice(0, 160)} />
</Helmet>
```

| Page | Title Format |
|------|-------------|
| Home | `ShopZone - Online Shopping India` |
| Products | `Results for "iphone" — ShopZone` |
| Product Detail | `Apple iPhone 15 Pro Max — ShopZone` |
| Cart | `Cart — ShopZone` |
| Orders | `My Orders — ShopZone` |
| 404 | `404 — Page Not Found — ShopZone` |

### 19.2 Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`)
- `aria-label` on icon buttons
- Form inputs linked to labels
- Focus management in modals
- Color contrast meets WCAG AA standards
- Keyboard navigable (tab order follows visual layout)

---

## 20. Limitations & Known Issues

### 20.1 Current Limitations

| Limitation | Reason | Fix in Production |
|-----------|--------|------------------|
| No real backend | Demo only | Add Node.js / Firebase |
| No real payments | Demo only | Integrate Razorpay/Stripe server-side |
| Data resets if localStorage cleared | No database | Real database |
| Only 12 products | Mock data | Fetch from real API |
| No real email sending | No email service | Add SendGrid / Nodemailer |
| Password not validated | Mock auth | Real auth with bcrypt |
| Search is client-side only | No search engine | Add Algolia / Elasticsearch |
| No image upload | No storage | Add Cloudinary / S3 |

### 20.2 Known Browser Behavior

- Data persists per browser (not across devices)
- Clearing browser data / localStorage resets cart and orders
- Private/Incognito mode: new session, no saved data

---

## 21. Future Enhancements

### Phase 2 — Real Backend

```
□ Node.js + Express REST API
□ MongoDB database (Mongoose ORM)
□ JWT authentication with refresh tokens
□ Real password hashing (bcrypt)
□ Email verification on signup
□ Order confirmation emails (SendGrid)
□ Shipping updates via SMS (Twilio)
□ Real Razorpay + Stripe payment processing
□ Webhook handlers for payment events
```

### Phase 3 — Advanced Features

```
□ Product image upload (Cloudinary)
□ Real-time inventory tracking
□ Product recommendation engine
□ Advanced search (Algolia)
□ Product comparison tool
□ Bulk discount / flash sale system
□ Loyalty points & rewards
□ Multi-vendor / seller marketplace
□ Live chat support widget
□ Product Q&A section
□ Subscription / membership plans
```

### Phase 4 — Mobile & Scale

```
□ React Native mobile app (iOS + Android)
□ Push notifications
□ Offline support (PWA / Service Worker)
□ Barcode scanner for product lookup
□ AR product preview (try-before-you-buy)
□ Multi-language / multi-currency support
□ Microservices architecture
□ Redis caching layer
□ CDN for product images
□ Load balancing
```

---

## 22. Glossary

| Term | Definition |
|------|-----------|
| **SPA** | Single Page Application — loads once, navigates without full page reload |
| **Redux** | Predictable state container for JavaScript apps |
| **Slice** | A Redux Toolkit concept — a section of the Redux store with its own reducers |
| **Dispatch** | The method used to send an action to the Redux store |
| **Selector** | A function that reads data from the Redux store |
| **Mock Data** | Fake but realistic data used in place of a real database |
| **localStorage** | Browser storage that persists across sessions |
| **Vite** | A fast frontend build tool and development server |
| **Tailwind CSS** | A utility-first CSS framework |
| **TypeScript** | A typed superset of JavaScript |
| **HOC** | Higher-Order Component — a component that wraps another |
| **COD** | Cash on Delivery — pay when the order arrives |
| **MRP** | Maximum Retail Price — the original price before discount |
| **SKU** | Stock Keeping Unit — a unique product identifier |
| **PIN** | Postal Index Number — 6-digit Indian postal code |
| **JWT** | JSON Web Token — used for secure authentication |
| **CORS** | Cross-Origin Resource Sharing — security policy for API requests |
| **CSRF** | Cross-Site Request Forgery — a type of web attack |
| **PWA** | Progressive Web App — web app with native app capabilities |
| **CDN** | Content Delivery Network — serves files from servers near the user |

---

*Documentation version: 1.0.0*
*Project: ShopZone eCommerce Application*
*Last Updated: June 2026*
*Author: ShopZone Development Team*
*Repository: https://github.com/nikhithakurra08-hue/ecommerce-app*
