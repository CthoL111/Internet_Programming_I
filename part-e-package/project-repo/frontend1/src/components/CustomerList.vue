<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Customer } from '../types'

const props = defineProps<{ customers: Customer[] }>()
const emit = defineEmits<{ delete: [id: number] }>()

const search = ref('')

// derived from props + search, so it is a computed, not a second ref
const visible = computed(() => {
  const q = search.value.toLowerCase()
  return props.customers.filter((c) => c.name.toLowerCase().includes(q) || c.tel.includes(q))
})
</script>

<template>
  <section>
    <input v-model="search" type="search" placeholder="Search name or tel" aria-label="Search" />
    <p class="count">{{ visible.length }} of {{ customers.length }} customers</p>
    <table v-if="visible.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Tel</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in visible" :key="c.customerID">
          <td>{{ c.customerID }}</td>
          <td>{{ c.name }}</td>
          <td>{{ c.gender }}</td>
          <td>{{ c.tel }}</td>
          <td><button @click="emit('delete', c.customerID)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty">No customers match your search.</p>
  </section>
</template>
