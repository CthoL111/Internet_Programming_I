<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Customer, Material, Order } from '../types'
import { isDueSoon, totalCost } from '../cost'

const props = defineProps<{
  orders: Order[]
  customers: Customer[]
  materials: Material[]
}>()
const emit = defineEmits<{ select: [orderID: number] }>()

const search = ref('')
const dueOnly = ref(false)

function customerName(id: number): string {
  return props.customers.find((c) => c.customerID === id)?.name ?? '?'
}

// FR-08 (search by order id, customer name or pickup date) and FR-09 (due in 3 days)
const visible = computed(() => {
  const q = search.value.toLowerCase()
  return props.orders.filter((o) => {
    const matches =
      String(o.orderID).includes(q) ||
      customerName(o.customerID).toLowerCase().includes(q) ||
      o.clothSets.some((s) => s.pickupDateTime.includes(q))
    const due = !dueOnly.value || o.clothSets.some((s) => isDueSoon(s))
    return matches && due
  })
})
</script>

<template>
  <section>
    <input
      v-model="search"
      type="search"
      placeholder="Order ID, customer or date (2026-11-05)"
      aria-label="Search"
    />
    <label class="check"
      ><input v-model="dueOnly" type="checkbox" /> Pickup in the next 3 days</label
    >
    <p class="count">{{ visible.length }} of {{ orders.length }} orders</p>
    <ul v-if="visible.length" class="list">
      <li v-for="o in visible" :key="o.orderID">
        <button @click="emit('select', o.orderID)">
          <span>#{{ o.orderID }} {{ customerName(o.customerID) }}</span>
          <b>{{ totalCost(o, materials) }} USD</b>
        </button>
      </li>
    </ul>
    <p v-else class="empty">No orders match.</p>
  </section>
</template>
