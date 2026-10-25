# Week 3: Answers

**1. Array index as `:key` while the list is filtered**

Vue uses the key to decide which component instance belongs to which item. With the index as key, position 0 always keeps the same instance, so after filtering, the card at position 0 is a different event but still has the old local state, for example an open details panel. The wrong card then shows the panel. With `:key="e.id"` the instance follows its event, and it is removed when its event is filtered out.

**2. Why `visible` is a computed and not a function in the template**

A computed remembers its result and recalculates only when something it reads changes (`search`, `category` or `events`). A function in the template runs again on every render and every time the template calls it. When I type in the search box, `search` changes, so `visible` is recalculated once, and the count line and the `v-for` both reuse that one result. Any other re-render of the component reuses the saved result and does not filter again.

**3. Why `EventCard` emits `book` and does not change `event.booked`**

First, props are read-only: the data belongs to the parent, and if a child changes it, Vue warns and it becomes hard to find who changed the data. Second, the rule for booking (only if a seat is left, add the id to `myBookings`, save it) lives in one place, `App.vue`. The card only says "the user wants to book event 7", so it can be reused and tested without knowing what booking means.

**4. `const { booked } = reactive(event); booked++`**

Destructuring copies the number out of the reactive object into a normal variable. That variable has no connection to the reactive object, so `booked++` only changes the copy, and `event.booked` never changes. Vue sees no change, so nothing on the page updates. I need to write `event.booked++` on the reactive object itself, or use `toRefs`.

**5. Where `myBookings` lives**

It lives in `App.vue`, because the header that shows the count and the `onBook` function that changes the data are both in `App`, and `App` is the closest component above everything that uses it. `EventCard` only knows one event, so it cannot hold the bookings of all events. `EventList` is a sibling of the header, so the header could not read it, and the list is hidden when it has no events, so the state would be lost.
