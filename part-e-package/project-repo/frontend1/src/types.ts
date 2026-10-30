export type Gender = 'female' | 'male' | 'other'

export interface Customer {
  customerID: number
  name: string
  gender: Gender
  tel: string
}

export interface Material {
  materialID: number
  name: string
  price: number
  type: 'fabric' | 'accessory'
  origin: string
}

// "uses" relationship: a cloth set uses some amount of a material
export interface MaterialUse {
  materialID: number
  amount: number
}

// ClothSet is a weak entity: setNo is only unique inside one order.
// setCost is derived, so it is NOT stored here (see cost.ts).
export interface ClothSet {
  setNo: number
  measurement: string
  design: string // image file name for now
  tailoringCost: number
  pickupDateTime: string // local date and time, "2026-11-05T14:00"
  materials: MaterialUse[]
}

// totalCost is derived, so it is NOT stored here (see cost.ts).
export interface Order {
  orderID: number
  customerID: number
  clothSets: ClothSet[]
}
