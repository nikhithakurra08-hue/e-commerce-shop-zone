import { describe, it, expect } from 'vitest'
import { products, categories, coupons, mockUser } from '../data/mockData'

describe('Mock Data', () => {
  it('has at least 10 products', () => {
    expect(products.length).toBeGreaterThanOrEqual(10)
  })

  it('all products have required fields', () => {
    products.forEach(p => {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.price).toBeGreaterThan(0)
      expect(p.images.length).toBeGreaterThan(0)
    })
  })

  it('has at least 8 categories', () => {
    expect(categories.length).toBeGreaterThanOrEqual(8)
  })

  it('all coupons have valid structure', () => {
    coupons.forEach(c => {
      expect(c.code).toBeTruthy()
      expect(['percentage', 'flat']).toContain(c.type)
      expect(c.value).toBeGreaterThan(0)
    })
  })

  it('mockUser has valid role', () => {
    expect(['user', 'admin']).toContain(mockUser.role)
  })
})
