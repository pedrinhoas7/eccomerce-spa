import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Form from '../../components/client/Form.vue';
import { TypeClient, TypeGender } from '../../DTO/ClientDTO';

describe('form.vue', () => {
  const mockClient = {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    creationDate: new Date(),
    isBlocked: false,
    typeClient: TypeClient.Fisica,
    password: 'password123',
    documentName: 'John Doe',
    documentIdentifier: '12345678901',
    inscricaoEstadual: '',
    typeGender: TypeGender.Masculino,
    birthDate: new Date('1990-01-01')
  };

  it('renders correctly', () => {
    const wrapper = mount(Form, {
      props: {
        client: mockClient
      }
    });

    expect(wrapper.find('input#name').exists());
    expect(wrapper.find('input#email').exists());
    expect(wrapper.find('input#phone').exists());
    expect(wrapper.find('select#typeClient').exists());
    expect(wrapper.find('input#documentIdentifier').exists());
    expect(wrapper.find('input#inscricaoEstadual').exists());
    expect(wrapper.find('select#typeGender').exists());
    expect(wrapper.find('input#birthDate').exists());

  });


  it('check email lenght', () => {
    const wrapper = mount(Form, {
      props: {
        client: mockClient
      }
    });

    const nameInput = wrapper.find('input#name');
    const emailInput = wrapper.find('input#email');
    expect(nameInput.attributes('maxlength')).toBe('150');
    expect(emailInput.attributes('maxlength')).toBe('150');

  });

  it('check password lenght', () => {
    const wrapper = mount(Form, {
      props: {
        client: mockClient
      }
    });
    const passwordInput = wrapper.find('input#password');
    const confirmPasswordInput = wrapper.find('input#confirmPassword');

    expect(passwordInput.attributes('minlength')).toBe('8');
    expect(passwordInput.attributes('maxlength')).toBe('15');
    expect(confirmPasswordInput.attributes('minlength')).toBe('8');
    expect(confirmPasswordInput.attributes('maxlength')).toBe('15');

  });


  it('updates input fields correctly', async () => {
    const wrapper = mount(Form, {
      props: {
        client: mockClient
      }
    });
    await wrapper.find('input#name').setValue(mockClient.name);
    await wrapper.find('input#email').setValue(mockClient.email);

    expect(wrapper.vm.client.name).toBe(mockClient.name);
    expect(wrapper.vm.client.email).toBe(mockClient.email);
  });
});
