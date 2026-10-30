<script setup lang="ts">
import type { Customer, Material, Order } from '../types'
import { setCost, totalCost } from '../cost'

defineProps<{ order: Order; customer: Customer; materials: Material[] }>()
const emit = defineEmits<{ back: [] }>()

function materialName(id: number, materials: Material[]): string {
  return materials.find((m) => m.materialID === id)?.name ?? '?'
}
</script>

<template>
  <section>
    <button @click="emit('back')">Back</button>
    <h2>Order #{{ order.orderID }} for {{ customer.name }}</h2>

    <article v-for="s in order.clothSets" :key="s.setNo" class="set">
      <h3>Set {{ s.setNo }}</h3>
      <p>Measurement: {{ s.measurement }}</p>
      <p>Pickup: {{ new Date(s.pickupDateTime).toLocaleString() }}</p>
      <ul>
        <li>Tailoring: {{ s.tailoringCost }}</li>
        <li v-for="u in s.materials" :key="u.materialID">
          {{ materialName(u.materialID, materials) }} x {{ u.amount }}
        </li>
      </ul>
      <p>
        <strong>Set cost: {{ setCost(s, materials) }}</strong>
      </p>
    </article>
    <p v-if="!order.clothSets.length">This order has no cloth sets yet.</p>

    <h3 class="total">Total: {{ totalCost(order, materials) }}</h3>
  </section>
</template>
