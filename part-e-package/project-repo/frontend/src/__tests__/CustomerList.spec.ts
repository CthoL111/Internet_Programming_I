import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomerList from '../components/CustomerList.vue'
import { customers } from '../data/customers'

describe('CustomerList', () => {
  it('shows all customers at first', () => {
    const wrapper = mount(CustomerList, { props: { customers } })
    expect(wrapper.text()).toContain('3 of 3 customers')
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
  })

  it('filters by name, ignoring case', async () => {
    const wrapper = mount(CustomerList, { props: { customers } })
    await wrapper.find('input').setValue('DARA')
    expect(wrapper.text()).toContain('1 of 3 customers')
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  })

  it('shows the empty message when nothing matches', async () => {
    const wrapper = mount(CustomerList, { props: { customers } })
    await wrapper.find('input').setValue('zzz')
    expect(wrapper.text()).toContain('No customers match your search.')
  })

  it('emits delete with the customer id and does not change the data', async () => {
    const wrapper = mount(CustomerList, { props: { customers } })
    await wrapper.findAll('button')[0]!.trigger('click')
    expect(wrapper.emitted('delete')![0]).toEqual([1])
    expect(customers).toHaveLength(3)
  })
})
