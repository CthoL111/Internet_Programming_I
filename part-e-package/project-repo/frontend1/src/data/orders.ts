import type { Order } from '../types'

// Pickup dates are relative to today, so the "next 3 days" demo
// keeps working whenever you open the app.
function inDays(days: number, hour: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, 0, 0, 0)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`
}

export const orders: Order[] = [
  {
    orderID: 1001,
    customerID: 1,
    clothSets: [
      {
        setNo: 1,
        measurement: 'Chest 90, waist 72',
        design: 'blouse.png',
        tailoringCost: 20,
        pickupDateTime: inDays(2, 10),
        materials: [
          { materialID: 1, amount: 3 },
          { materialID: 3, amount: 4 },
        ],
      },
    ],
  },
  {
    orderID: 1002,
    customerID: 2,
    clothSets: [
      {
        setNo: 1,
        measurement: 'Chest 100, waist 85',
        design: 'suit.png',
        tailoringCost: 60,
        pickupDateTime: inDays(10, 14),
        materials: [
          { materialID: 2, amount: 3 },
          { materialID: 3, amount: 6 },
        ],
      },
      {
        setNo: 2,
        measurement: 'Waist 85, length 100',
        design: 'trousers.png',
        tailoringCost: 25,
        pickupDateTime: inDays(10, 14),
        materials: [{ materialID: 1, amount: 2 }],
      },
    ],
  },
  { orderID: 1003, customerID: 3, clothSets: [] },
]
