import { mount } from '@vue/test-utils';
import CustomerManagement from '../components/CustomerManagement.vue';
import { describe, expect, it } from 'vitest';

describe('CustomerManagement.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(CustomerManagement);
    expect(wrapper.text()).toContain('Hello Word');
  });
});
