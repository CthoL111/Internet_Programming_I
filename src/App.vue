<script setup lang="ts">
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import type { CampusEvent } from "./types";
import { seatsLeft } from "./format.ts";

// A reactive copy of the hard-coded events
const events = ref<CampusEvent[]>(initialEvents.map(e => ({ ...e })));

// TODO 1: a ref `myBookings` holding the ids of the events I booked (one entry per seat)
const myBookings = ref<number[]>([]);
// TODO 2: a computed `bookingCount`
const bookingCount = computed(() => myBookings.value.length);
// TODO 3: onBook(id): find the event; if it still has a seat,
//         increase its `booked` and add the id to myBookings
function onBook(id: number) {
  const event = events.value.find((e) => e.id === id);
  if (event && seatsLeft(event) > 0) {
    event.booked++;
    myBookings.value.push(id);
  }
}
// TODO 4 (bonus): keep my bookings after a page reload
//   - watch myBookings and save it to localStorage (JSON.stringify)
//   - read it back when the app starts, and add those seats to `booked`
// TODO 4 (bonus): save
watch(
  myBookings,
  (value) => localStorage.setItem("myBookings", JSON.stringify(value)),
  { deep: true },
);
// TODO 4 (bonus): read back at startup
try {
  const saved = JSON.parse(localStorage.getItem("myBookings") ?? "[]");
  if (Array.isArray(saved)) {
    for (const id of saved) {
      const event = events.value.find((e) => e.id === id);
      if (event && seatsLeft(event) > 0) {
        event.booked++;
        myBookings.value.push(id);
      }
    }
  }
} catch {
  // stored text was not valid JSON: ignore it
}
</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>
      <!-- TODO 5: show the real count ("1 seat" / "N seats") -->
      <p class="mine">
        You have booked {{ bookingCount === 1 ? "1 seat" : `${bookingCount} seats` }}.
      </p>
    </header>
    <EventList :events="events" @book="onBook" />
  </main>
</template>

<style scoped>
header { margin-bottom: 16px; }
.mine { color: #6b7280; margin: 0; }
</style>
