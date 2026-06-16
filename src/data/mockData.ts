import type { Product, Category, User, Order, Coupon } from '../types'

export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', description: 'Gadgets and tech' },
  { id: 'c2', name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', description: 'Clothing and accessories' },
  { id: 'c3', name: 'Home & Kitchen', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', description: 'Home essentials' },
  { id: 'c4', name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400', description: 'Sports equipment' },
  { id: 'c5', name: 'Books', slug: 'books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', description: 'Books and media' },
  { id: 'c6', name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', description: 'Beauty and personal care' },
  { id: 'c7', name: 'Toys', slug: 'toys', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', description: 'Toys and games' },
  { id: 'c8', name: 'Grocery', slug: 'grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', description: 'Food and beverages' },
]

export const products: Product[] = [
  {
    id: 'p1', name: 'Apple iPhone 15 Pro Max 256GB', slug: 'apple-iphone-15-pro-max',
    description: 'The most powerful iPhone ever. Features the A17 Pro chip, titanium design, and a 48MP camera system with 5x optical zoom.',
    price: 134900, originalPrice: 159900, discount: 16,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
    ],
    category: 'Electronics', categoryId: 'c1', brand: 'Apple',
    rating: 4.8, reviewCount: 2847, stock: 45, sku: 'APL-IP15PM-256',
    tags: ['iphone', 'smartphone', '5g', 'apple'],
    specifications: { Display: '6.7" Super Retina XDR', Processor: 'A17 Pro', Storage: '256GB', Camera: '48MP + 12MP + 12MP', Battery: '4422mAh', OS: 'iOS 17' },
    isFeatured: true, isBestSeller: true, createdAt: '2024-01-10',
    reviews: [
      { id: 'r1', userId: 'u2', userName: 'Priya Sharma', rating: 5, title: 'Best iPhone ever!', comment: 'The camera quality is absolutely stunning. Worth every penny!', helpful: 124, createdAt: '2024-02-01' },
      { id: 'r2', userId: 'u3', userName: 'Rahul Verma', rating: 5, title: 'Excellent performance', comment: 'Blazing fast, great battery life. The titanium build feels premium.', helpful: 89, createdAt: '2024-02-15' },
      { id: 'r3', userId: 'u4', userName: 'Anjali Singh', rating: 4, title: 'Great but expensive', comment: 'Amazing phone but the price is steep. Camera and performance are top notch.', helpful: 56, createdAt: '2024-03-01' },
    ],
  },
  {
    id: 'p2', name: 'Samsung Galaxy S24 Ultra 512GB', slug: 'samsung-galaxy-s24-ultra',
    description: 'Galaxy AI is here. The S24 Ultra features a built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
    price: 129999, originalPrice: 154999, discount: 16,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600',
    ],
    category: 'Electronics', categoryId: 'c1', brand: 'Samsung',
    rating: 4.7, reviewCount: 1923, stock: 32, sku: 'SAM-S24U-512',
    tags: ['samsung', 'android', 'spen', '5g'],
    specifications: { Display: '6.8" Dynamic AMOLED 2X', Processor: 'Snapdragon 8 Gen 3', Storage: '512GB', Camera: '200MP + 12MP + 50MP + 10MP', Battery: '5000mAh', OS: 'Android 14' },
    isFeatured: true, isBestSeller: true, createdAt: '2024-01-20',
    reviews: [
      { id: 'r4', userId: 'u5', userName: 'Vikram Patel', rating: 5, title: 'S Pen is a game changer', comment: 'The S Pen productivity features are incredible for work.', helpful: 98, createdAt: '2024-02-10' },
    ],
  },
  {
    id: 'p3', name: 'Sony WH-1000XM5 Wireless Headphones', slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery life, multipoint connection.',
    price: 24990, originalPrice: 34990, discount: 29,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
    ],
    category: 'Electronics', categoryId: 'c1', brand: 'Sony',
    rating: 4.6, reviewCount: 3412, stock: 78, sku: 'SNY-WH1000XM5',
    tags: ['headphones', 'noise-cancelling', 'wireless', 'sony'],
    specifications: { Type: 'Over-ear', Connectivity: 'Bluetooth 5.2', Battery: '30 hours', 'Noise Cancellation': 'Yes', Weight: '250g', Codec: 'LDAC, AAC, SBC' },
    isFeatured: false, isBestSeller: true, createdAt: '2024-01-05',
    reviews: [
      { id: 'r5', userId: 'u6', userName: 'Meera Nair', rating: 5, title: 'Best headphones period', comment: 'The ANC is absolutely magical. Perfect for long flights.', helpful: 201, createdAt: '2024-01-25' },
    ],
  },
  {
    id: 'p4', name: 'Nike Air Max 270 Running Shoes', slug: 'nike-air-max-270',
    description: 'The Nike Air Max 270 delivers a look inspired by two icons of big Air: the Air Max 180 and Air Max 93.',
    price: 11995, originalPrice: 14995, discount: 20,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600',
    ],
    category: 'Fashion', categoryId: 'c2', brand: 'Nike',
    rating: 4.4, reviewCount: 892, stock: 156, sku: 'NIKE-AM270-42',
    tags: ['shoes', 'running', 'nike', 'sports'],
    specifications: { Type: 'Running', Upper: 'Mesh', Sole: 'Rubber', Cushioning: 'Air Max 270', Available: 'UK 6-12', Colour: 'White/Black' },
    isFeatured: false, isBestSeller: true, createdAt: '2024-02-01',
    reviews: [
      { id: 'r6', userId: 'u7', userName: 'Arjun Reddy', rating: 4, title: 'Very comfortable', comment: 'Great cushioning and looks stylish. Runs a bit large so size down.', helpful: 67, createdAt: '2024-02-20' },
    ],
  },
  {
    id: 'p5', name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6Qt', slug: 'instant-pot-duo-7in1',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer. 6 quart capacity.',
    price: 8999, originalPrice: 12999, discount: 31,
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600',
    ],
    category: 'Home & Kitchen', categoryId: 'c3', brand: 'Instant Pot',
    rating: 4.7, reviewCount: 5621, stock: 230, sku: 'IP-DUO-6QT',
    tags: ['pressure cooker', 'kitchen', 'cooking', 'instant pot'],
    specifications: { Capacity: '6 Quart', Functions: '7-in-1', Power: '1000W', Programs: '14 smart programs', Material: 'Stainless Steel', Safety: '10 safety features' },
    isFeatured: true, isBestSeller: true, createdAt: '2024-01-15',
    reviews: [
      { id: 'r7', userId: 'u8', userName: 'Sunita Kapoor', rating: 5, title: 'Changed my cooking life', comment: 'I use this every single day. Biryani in 30 minutes is unreal!', helpful: 341, createdAt: '2024-02-05' },
    ],
  },
  {
    id: 'p6', name: 'The Alchemist - Paulo Coelho', slug: 'the-alchemist-paulo-coelho',
    description: 'A magical story of Santiago, an Andalusian shepherd boy who yearns to travel the world in search of treasure.',
    price: 299, originalPrice: 399, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
    ],
    category: 'Books', categoryId: 'c5', brand: 'HarperCollins',
    rating: 4.9, reviewCount: 12453, stock: 500, sku: 'BOOK-ALCH-EN',
    tags: ['fiction', 'philosophy', 'bestseller', 'coelho'],
    specifications: { Pages: '197', Language: 'English', Publisher: 'HarperCollins', 'Publication Year': '1988', Format: 'Paperback', ISBN: '978-0062315007' },
    isFeatured: false, isBestSeller: true, createdAt: '2024-01-01',
    reviews: [
      { id: 'r8', userId: 'u9', userName: 'Kavya Iyer', rating: 5, title: 'Life changing book', comment: 'Every page holds wisdom. A must-read for everyone.', helpful: 892, createdAt: '2024-01-10' },
    ],
  },
  {
    id: 'p7', name: 'Yoga Mat Premium 6mm Non-Slip', slug: 'yoga-mat-premium-6mm',
    description: 'Extra thick 6mm premium eco-friendly yoga mat with carrying strap. Non-slip surface for all yoga types.',
    price: 1299, originalPrice: 1999, discount: 35,
    images: [
      'https://images.unsplash.com/photo-1601925228008-c9e5f63d2a01?w=600',
    ],
    category: 'Sports', categoryId: 'c4', brand: 'FitMat',
    rating: 4.3, reviewCount: 2341, stock: 89, sku: 'FM-YMAT-6MM',
    tags: ['yoga', 'fitness', 'mat', 'exercise'],
    specifications: { Thickness: '6mm', Material: 'NBR Foam', Size: '183cm x 61cm', Weight: '1.2kg', Feature: 'Non-slip', Includes: 'Carrying strap' },
    isFeatured: false, isBestSeller: false, createdAt: '2024-02-10',
    reviews: [],
  },
  {
    id: 'p8', name: 'Lakme Absolute Skin Natural Mousse SPF 8 Foundation', slug: 'lakme-absolute-foundation',
    description: 'Skin Natural Mousse Foundation for a natural look. SPF 8 protection with 12 hour wear.',
    price: 549, originalPrice: 699, discount: 21,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
    ],
    category: 'Beauty', categoryId: 'c6', brand: 'Lakme',
    rating: 4.1, reviewCount: 1876, stock: 312, sku: 'LAK-FNDTN-N',
    tags: ['makeup', 'foundation', 'lakme', 'beauty'],
    specifications: { Coverage: 'Medium', Finish: 'Natural', SPF: '8', Duration: '12 hours', 'Skin Type': 'All', Volume: '25g' },
    isFeatured: false, isBestSeller: false, createdAt: '2024-03-01',
    reviews: [],
  },
  {
    id: 'p9', name: 'LEGO Technic Bugatti Chiron 42083', slug: 'lego-technic-bugatti-chiron',
    description: 'Build and display the iconic Bugatti Chiron with this detailed LEGO Technic set. 3599 pieces.',
    price: 31999, originalPrice: 39999, discount: 20,
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600',
    ],
    category: 'Toys', categoryId: 'c7', brand: 'LEGO',
    rating: 4.9, reviewCount: 674, stock: 23, sku: 'LEGO-42083',
    tags: ['lego', 'technic', 'bugatti', 'collectible'],
    specifications: { Pieces: '3599', Age: '16+', Theme: 'Technic', Scale: '1:8', Features: 'W16 engine, gearbox', Dimensions: '14cm x 56cm x 25cm' },
    isFeatured: true, isBestSeller: false, createdAt: '2024-01-25',
    reviews: [],
  },
  {
    id: 'p10', name: 'MacBook Air M3 13" 8GB 256GB', slug: 'macbook-air-m3-13',
    description: 'MacBook Air with M3 chip delivers up to 18 hours of battery life and is blazing fast.',
    price: 114900, originalPrice: 119900, discount: 4,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    ],
    category: 'Electronics', categoryId: 'c1', brand: 'Apple',
    rating: 4.8, reviewCount: 1234, stock: 18, sku: 'APL-MBA-M3-256',
    tags: ['macbook', 'laptop', 'apple', 'm3'],
    specifications: { Chip: 'Apple M3', RAM: '8GB', Storage: '256GB SSD', Display: '13.6" Liquid Retina', Battery: '18 hours', Weight: '1.24kg' },
    isFeatured: true, isBestSeller: false, createdAt: '2024-03-08',
    reviews: [],
  },
  {
    id: 'p11', name: 'Adidas Ultraboost 23 Running Shoes', slug: 'adidas-ultraboost-23',
    description: 'Experience incredible energy return with BOOST midsole cushioning in the Ultraboost 23.',
    price: 16999, originalPrice: 19999, discount: 15,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600',
    ],
    category: 'Fashion', categoryId: 'c2', brand: 'Adidas',
    rating: 4.5, reviewCount: 743, stock: 67, sku: 'ADS-UB23-42',
    tags: ['shoes', 'running', 'adidas', 'boost'],
    specifications: { Type: 'Running', Upper: 'Primeknit', Sole: 'Continental Rubber', Cushioning: 'BOOST', Available: 'UK 6-12', Technology: 'BOOST + Linear Energy Push' },
    isFeatured: false, isBestSeller: false, createdAt: '2024-02-15',
    reviews: [],
  },
  {
    id: 'p12', name: 'Tata Sampann Unpolished Moong Dal 1kg', slug: 'tata-sampann-moong-dal',
    description: 'Tata Sampann Unpolished Moong Dal is made without chemicals giving you more nutrition naturally.',
    price: 159, originalPrice: 185, discount: 14,
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
    ],
    category: 'Grocery', categoryId: 'c8', brand: 'Tata Sampann',
    rating: 4.3, reviewCount: 3421, stock: 800, sku: 'TATA-MOONG-1KG',
    tags: ['dal', 'lentils', 'grocery', 'tata'],
    specifications: { Weight: '1kg', Type: 'Unpolished', Brand: 'Tata Sampann', 'Country of Origin': 'India', Allergen: 'None', 'Storage Instructions': 'Store in cool dry place' },
    isFeatured: false, isBestSeller: false, createdAt: '2024-02-20',
    reviews: [],
  },
]

export const mockUser: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@shopzone.com',
  phone: '+91 9876543210',
  role: 'user',
  createdAt: '2023-06-15',
  addresses: [
    {
      id: 'a1', name: 'Demo User', phone: '+91 9876543210',
      line1: '123, MG Road', line2: 'Near City Mall',
      city: 'Bangalore', state: 'Karnataka', pincode: '560001',
      country: 'India', isDefault: true,
    },
  ],
}

export const mockAdmin: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@shopzone.com',
  phone: '+91 9000000001',
  role: 'admin',
  createdAt: '2023-01-01',
  addresses: [],
}

export const mockOrders: Order[] = [
  {
    id: 'ORD001', userId: 'u1',
    items: [{ product: products[0], quantity: 1, price: products[0].price }],
    address: mockUser.addresses[0],
    paymentMethod: 'razorpay', paymentStatus: 'paid',
    orderStatus: 'delivered',
    subtotal: 134900, discount: 0, couponCode: undefined, couponDiscount: 0,
    shipping: 0, tax: 12141, total: 147041,
    trackingId: 'TRK123456789IN',
    estimatedDelivery: '2024-02-15', createdAt: '2024-02-10', updatedAt: '2024-02-15',
    deliveredAt: '2024-02-15',
  },
  {
    id: 'ORD002', userId: 'u1',
    items: [
      { product: products[2], quantity: 1, price: products[2].price },
      { product: products[5], quantity: 2, price: products[5].price },
    ],
    address: mockUser.addresses[0],
    paymentMethod: 'cod', paymentStatus: 'pending',
    orderStatus: 'shipped',
    subtotal: 25588, discount: 0, couponCode: 'SAVE10', couponDiscount: 2558,
    shipping: 0, tax: 2073, total: 25103,
    trackingId: 'TRK987654321IN',
    estimatedDelivery: '2024-03-20', createdAt: '2024-03-15', updatedAt: '2024-03-16',
  },
  {
    id: 'ORD003', userId: 'u1',
    items: [{ product: products[4], quantity: 1, price: products[4].price }],
    address: mockUser.addresses[0],
    paymentMethod: 'stripe', paymentStatus: 'paid',
    orderStatus: 'placed',
    subtotal: 8999, discount: 0, couponCode: undefined, couponDiscount: 0,
    shipping: 99, tax: 810, total: 9908,
    estimatedDelivery: '2024-03-25', createdAt: '2024-03-18', updatedAt: '2024-03-18',
  },
]

export const coupons: Coupon[] = [
  { id: 'cp1', code: 'SAVE10', type: 'percentage' as const, value: 10, minOrder: 999, maxDiscount: 500, expiresAt: '2025-12-31', usageLimit: 100, usedCount: 45, isActive: true },
  { id: 'cp2', code: 'FLAT200', type: 'flat' as const, value: 200, minOrder: 1999, expiresAt: '2025-12-31', usageLimit: 50, usedCount: 12, isActive: true },
  { id: 'cp3', code: 'NEWUSER', type: 'percentage' as const, value: 20, minOrder: 499, maxDiscount: 300, expiresAt: '2025-12-31', usageLimit: 1, usedCount: 0, isActive: true },
  { id: 'cp4', code: 'WELCOME50', type: 'flat' as const, value: 50, minOrder: 299, expiresAt: '2025-12-31', usageLimit: 200, usedCount: 87, isActive: true },
]

export const salesData = [
  { date: 'Jan', revenue: 245000, orders: 182 },
  { date: 'Feb', revenue: 312000, orders: 234 },
  { date: 'Mar', revenue: 289000, orders: 210 },
  { date: 'Apr', revenue: 421000, orders: 315 },
  { date: 'May', revenue: 398000, orders: 289 },
  { date: 'Jun', revenue: 512000, orders: 378 },
]
