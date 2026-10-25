# Component tree: Tailoring Shop

Wireframes: `docs/wireframes/` (login, customers, orders, order-detail, materials).
Screens 2, 3 and 4 are built as components. Screens 1 and 5 are wireframe only for now.

## Rule used everywhere

- Data goes **down** as props. Events go **up**.
- A child component never changes data it receives. It emits "the user wants X" and the owner decides.
- Anything that can be calculated from other state is a `computed` or a plain function, never stored:
  `setCost`, `totalCost`, "due in 3 days", and the filtered lists.

## State owners

| State | Owner | Why |
|---|---|---|
| `customers`, `materials`, `orders` | `App.vue` | Several screens read them, and only App changes them. |
| `screen`, `selectedId`, `message` | `App.vue` | They decide which screen shows. (Next week: Vue Router and a Pinia store.) |
| `search` (customers) | `CustomerList` | Only that list uses it. |
| `search`, `dueOnly` (orders) | `OrderList` | Only that list uses it. |
| `setCost`, `totalCost`, `isDueSoon` | `src/cost.ts` (functions) | Derived values (FR-06, FR-07, FR-09): calculated, never stored. |

## Screen 1: Login (wireframe only, FR-01)

```
LoginView
  local state: username, password
  event:       login(username, password)
```
`App.vue` will own the signed-in user (a Pinia store next week).

## Screen 2: Customers (built, FR-02)

```
App
 └─ CustomerList
      props:  customers: Customer[]
      state:  search
      computed: visible (name or tel contains the search text)
      event:  delete(customerID)
```
`App.onDeleteCustomer` changes the data. It refuses to delete a customer who still has orders
and shows a message instead.

## Screen 3: Orders (built, FR-08 and FR-09)

```
App
 └─ OrderList
      props:  orders: Order[], customers: Customer[], materials: Material[]
      state:  search, dueOnly
      computed: visible (order id, customer name or pickup date; optional "next 3 days")
      event:  select(orderID)
```
`App` stores `selectedId` when it receives `select`.

## Screen 4: Order detail (built, FR-03 to FR-07)

```
App
 └─ OrderDetail
      props:  order: Order, customer: Customer, materials: Material[]
      state:  none
      event:  back()
```
Shows each cloth set with `setCost(set)` and the order `totalCost(order)` from `cost.ts`.

## Screen 5: Materials (wireframe only, FR-05)

```
MaterialList
  props:  materials: Material[]
  state:  search
  events: add, delete(materialID)
```

## In the wireframes but not built yet

Add customer, add order, add cloth set, print receipt (FR-10), the materials screen and login.
These come in the next weeks, with forms, routing and the Pinia store.
