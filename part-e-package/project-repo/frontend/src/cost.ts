import type { ClothSet, Material, Order } from './types'

const round2 = (n: number) => Math.round(n * 100) / 100

// FR-06: setCost = tailoringCost + sum of (amount x price)
export function setCost(set: ClothSet, materials: Material[]): number {
  const used = set.materials.reduce((sum, u) => {
    const m = materials.find((x) => x.materialID === u.materialID)
    return sum + (m ? m.price * u.amount : 0)
  }, 0)
  return round2(set.tailoringCost + used)
}

// FR-07: totalCost = sum of setCost of all cloth sets
export function totalCost(order: Order, materials: Material[]): number {
  return round2(order.clothSets.reduce((sum, s) => sum + setCost(s, materials), 0))
}

// FR-09: pickup is between now and now + 3 days
export function isDueSoon(set: ClothSet, now: Date = new Date(), days = 3): boolean {
  const t = new Date(set.pickupDateTime).getTime()
  return t >= now.getTime() && t <= now.getTime() + days * 24 * 60 * 60 * 1000
}
