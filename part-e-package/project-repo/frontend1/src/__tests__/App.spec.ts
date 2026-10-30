import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('starts on the orders screen with 3 orders', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('3 of 3 orders')
  })

  it('"next 3 days" shows only order 1001', async () => {
    const wrapper = mount(App)
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.text()).toContain('1 of 3 orders')
    expect(wrapper.text()).toContain('#1001')
  })

  it('opens an order, shows set cost 37, and goes back', async () => {
    const wrapper = mount(App)
    const first = wrapper.findAll('li button')[0]!
    await first.trigger('click')
    expect(wrapper.text()).toContain('Set cost: 37')
    expect(wrapper.text()).toContain('Total: 37')
    const back = wrapper.findAll('button').find((b) => b.text() === 'Back')!
    await back.trigger('click')
    expect(wrapper.text()).toContain('3 of 3 orders')
  })

  it('does not delete a customer who has orders', async () => {
    const wrapper = mount(App)
    const customersTab = wrapper.findAll('nav button').find((b) => b.text() === 'Customers')!
    await customersTab.trigger('click')
    await wrapper.findAll('tbody button')[0]!.trigger('click')
    expect(wrapper.text()).toContain('3 of 3 customers')
    expect(wrapper.text()).toContain('cannot be deleted')
  })
})
