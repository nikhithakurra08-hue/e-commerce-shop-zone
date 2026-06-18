# ShopZone —  eCommerce App

A complete, production-ready eCommerce web application built with React + Vite + TypeScript, deployable directly on Vercel.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🌐 Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select the repo — Vercel auto-detects Vite. Click **Deploy**.

No configuration needed. `vercel.json` handles SPA routing.

## 🔑 Demo Credentials

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| User  | demo@shopzone.com       | demo123   |
| Admin | admin@shopzone.com      | admin123  |

## 🛒 Features

### Customer
- Browse 12+ sample products across 8 categories
- Product search, filtering (category, brand, price, rating, stock), sorting
- Product detail with image gallery, specs, reviews
- Add to cart, save for later, wishlist
- Full checkout flow: address → payment → review → confirmation
- **Coupon codes**: `SAVE10`, `FLAT200`, `NEWUSER`, `WELCOME50`
- Order history with tracking timeline, cancel & return
- User profile with address management

### Admin (`/admin`)
- Dashboard with revenue/orders charts (Recharts)
- Products CRUD
- Orders management
- Users list
- Categories CRUD

### UI/UX
- Light / Dark mode toggle
- Fully responsive (mobile, tablet, desktop)
- Loading skeletons
- Toast notifications
- Error boundary
- 404 page

## 🧪 Tests

```bash
npm run test
```

Unit tests for utility functions and mock data validation (Vitest).

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # ErrorBoundary, StarRating, Skeleton
│   ├── layout/        # Header, Footer, Layout, AdminLayout
│   └── product/       # ProductCard, ProductFilters
├── data/              # mockData.ts (products, categories, orders, coupons)
├── hooks/             # useAppDispatch, useAppSelector
├── pages/
│   ├── Auth/          # Login, Signup, ForgotPassword
│   ├── Admin/         # Dashboard, Products, Orders, Users, Categories
│   └── ...            # Home, Products, Cart, Checkout, Orders, Profile
├── store/
│   └── slices/        # auth, cart, wishlist, orders, ui
├── types/             # TypeScript interfaces
├── utils/             # format helpers
└── test/              # unit tests
```

## ⚙️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Redux Toolkit** (state management)
- **React Router DOM v6** (routing)
- **Tailwind CSS** (styling)
- **React Hook Form** (form validation)
- **React Hot Toast** (notifications)
- **Recharts** (admin analytics charts)
- **Lucide React** (icons)
- **Vitest** (unit testing)

## 💳 Payment Integration (Demo)

Payment buttons are present but run in demo/mock mode. To wire up real payments:

- **Razorpay**: Add `VITE_RAZORPAY_KEY_ID` to `.env` and load the Razorpay JS SDK
- **Stripe**: Add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env` and integrate `@stripe/stripe-js`

Copy `.env.example` → `.env` and fill in your keys.
