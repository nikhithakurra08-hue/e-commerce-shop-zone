import { describe, it, expect } from 'vitest'
import { formatCurrency, calculateTax, calculateShipping, generateOrderId, getDiscountedPrice } from '../utils/format'

describe('formatCurrency', () => {
  it('formats number as INR', () => {
    expect(formatCurrency(1000)).toContain('1,000')
  })
  it('handles zero', () => {
    expect(formatCurrency(0)).toContain('0')
  })
})

describe('calculateTax', () => {
  it('calculates 9% tax by default', () => {
    expect(calculateTax(1000)).toBe(90)
  })
  it('calculates custom tax rate', () => {
    expect(calculateTax(1000, 0.18)).toBe(180)
  })
})

describe('calculateShipping', () => {
  it('returns 0 for orders above 499', () => {
    expect(calculateShipping(500)).toBe(0)
    expect(calculateShipping(1000)).toBe(0)
  })
  it('returns 99 for orders below 499', () => {
    expect(calculateShipping(498)).toBe(99)
    expect(calculateShipping(100)).toBe(99)
  })
})

describe('generateOrderId', () => {
  it('starts with ORD', () => {
    expect(generateOrderId()).toMatch(/^ORD/)
  })
  it('generates unique IDs when called at different times', async () => {
    const ids = new Set<string>()
    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 2))
      ids.add(generateOrderId())
    }
    expect(ids.size).toBeGreaterThan(1)
  })
})

describe('getDiscountedPrice', () => {
  it('applies discount correctly', () => {
    expect(getDiscountedPrice(1000, 10)).toBe(900)
    expect(getDiscountedPrice(1000, 25)).toBe(750)
  })
})
