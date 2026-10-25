<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomerList from './components/CustomerList.vue'
import OrderList from './components/OrderList.vue'
import OrderDetail from './components/OrderDetail.vue'
import { customers as initialCustomers } from './data/customers'
import { materials as initialMaterials } from './data/materials'
import { orders as initialOrders } from './data/orders'

// App owns the data. Children only get props and send events up.
const customers = ref(initialCustomers.map((c) => ({ ...c })))
const materials = ref(initialMaterials.map((m) => ({ ...m })))
const orders = ref(initialOrders.map((o) => ({ ...o })))

const screen = ref<'orders' | 'customers'>('orders')
const selectedId = ref<number | null>(null)
const message = ref('')

const selected = computed(() => orders.value.find((o) => o.orderID === selectedId.value) ?? null)
const selectedCustomer = computed(() =>
  customers.value.find((c) => c.customerID === selected.value?.customerID),
)

function show(next: 'orders' | 'customers') {
  screen.value = next
  selectedId.value = null
  message.value = ''
}

function onDeleteCustomer(id: number) {
  // keep orders valid: a customer who has orders cannot be deleted
  if (orders.value.some((o) => o.customerID === id)) {
    message.value = 'This customer has orders and cannot be deleted.'
    return
  }
  customers.value = customers.value.filter((c) => c.customerID !== id)
  message.value = ''
}
</script>

<template>
  <main>
    <h1>Tailoring Shop</h1>
    <nav>
      <button @click="show('orders')">Orders</button>
      <button @click="show('customers')">Customers</button>
    </nav>

    <template v-if="screen === 'customers'">
      <p v-if="message" class="message" role="alert">{{ message }}</p>
      <CustomerList :customers="customers" @delete="onDeleteCustomer" />
    </template>
    <template v-else>
      <OrderDetail
        v-if="selected && selectedCustomer"
        :order="selected"
        :customer="selectedCustomer"
        :materials="materials"
        @back="selectedId = null"
      />
      <OrderList
        v-else
        :orders="orders"
        :customers="customers"
        :materials="materials"
        @select="selectedId = $event"
      />
    </template>
  </main>
</template>

<style scoped>
main {
  max-width: 760px;
  margin: 0 auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.message {
  color: #b42318;
}
</style>
