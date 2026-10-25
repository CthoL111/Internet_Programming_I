import { describe, it, expect } from 'vitest'
import { isDueSoon, setCost, totalCost } from '../cost'
import { materials } from '../data/materials'
import { orders } from '../data/orders'
import type { ClothSet } from '../types'

describe('cost', () => {
  it('setCost = 20 + 3x5 + 4x0.5 = 37 (example from the proposal)', () => {
    expect(setCost(orders[0]!.clothSets[0]!, materials)).toBe(37)
  })

  it('totalCost adds all cloth sets: (60 + 3x18 + 6x0.5) + (25 + 2x5) = 152', () => {
    expect(totalCost(orders[1]!, materials)).toBe(152)
  })

  it('an order with no cloth sets costs 0', () => {
    expect(totalCost(orders[2]!, materials)).toBe(0)
  })

  it('does not show floating point noise (0.1 + 0.2)', () => {
    const set: ClothSet = {
      setNo: 1,
      measurement: '',
      design: '',
      tailoringCost: 0.1,
      pickupDateTime: '2026-01-01T10:00',
      materials: [{ materialID: 99, amount: 1 }],
    }
    const fake = [{ materialID: 99, name: 'x', price: 0.2, type: 'fabric' as const, origin: '' }]
    expect(setCost(set, fake)).toBe(0.3)
  })
})

describe('isDueSoon', () => {
  const set: ClothSet = {
    setNo: 1,
    measurement: '',
    design: '',
    tailoringCost: 0,
    pickupDateTime: '2026-10-27T10:00',
    materials: [],
  }

  it('is true when pickup is within 3 days', () => {
    expect(isDueSoon(set, new Date('2026-10-25T09:00'))).toBe(true)
  })
  it('is false when pickup is more than 3 days away', () => {
    expect(isDueSoon(set, new Date('2026-10-20T09:00'))).toBe(false)
  })
  it('is false when pickup is already in the past', () => {
    expect(isDueSoon(set, new Date('2026-10-28T09:00'))).toBe(false)
  })
})
