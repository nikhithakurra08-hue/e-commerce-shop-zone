export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin'
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  parentId?: string
  description?: string
}

export interface Product {
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

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  helpful: number
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
  savedForLater?: boolean
}

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface Order {
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
  cancelledAt?: string
  deliveredAt?: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'flat'
  value: number
  minOrder: number
  maxDiscount?: number
  expiresAt: string
  usageLimit: number
  usedCount: number
  isActive: boolean
}

export interface FilterState {
  category: string[]
  brand: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
}
