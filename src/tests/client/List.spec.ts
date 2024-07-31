import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import List from '../../components/client/List.vue';
import ClientDTO, { TypeClient, TypeGender } from '../../DTO/ClientDTO';


describe('List.vue', () => {
  const mockClients: ClientDTO[] = [
    {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      creationDate: new Date('2023-01-01'),
      isBlocked: false,
      typeClient: TypeClient.Fisica,
      password: 'password123',
      documentName: 'John Doe',
      documentIdentifier: '12345678901',
      inscricaoEstadual: '',
      typeGender: TypeGender.Masculino,
      birthDate: new Date('1990-01-01'),
    },
    {
      id: '456',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0987654321',
      creationDate: new Date('2023-01-02'),
      isBlocked: true,
      typeClient: TypeClient.Fisica,
      password: 'password123',
      documentName: 'Jane Doe',
      documentIdentifier: '09876543210',
      inscricaoEstadual: '',
      typeGender: TypeGender.Feminino,
      birthDate: new Date('1992-01-01'),
    },
  ];

  it('verify atributes form', () => {
    const wrapper = mount(List, {
      props: {
        clients: mockClients
      }
    });

    // Header
    expect(wrapper.find('th').text()).toBe('#');
    expect(wrapper.findAll('th')[1].text()).toBe('Nome/Razão Social');
    expect(wrapper.findAll('th')[2].text()).toBe('Email');
    expect(wrapper.findAll('th')[3].text()).toBe('Telefone');
    expect(wrapper.findAll('th')[4].text()).toBe('Data de cadastro');
    expect(wrapper.findAll('th')[5].text()).toBe('Bloqueado');
    expect(wrapper.findAll('th')[6].text()).toBe('Ações');

    const rows = wrapper.findAll('tr').slice(1); 

    //Linha 1
    expect(rows[0].findAll('td')[1].text()).toBe('John Doe');
    expect(rows[0].findAll('td')[2].text()).toBe('john.doe@example.com');
    expect(rows[0].findAll('td')[3].text()).toBe('1234567890');
    expect(rows[0].findAll('td')[5].text()).toBe(''); 

    //Linha 2
    expect(rows[1].findAll('td')[1].text()).toBe('Jane Doe');

    expect(wrapper.text()).toContain('Editar');
  });

  it('verify button form', () => {
    const wrapper = mount(List, {
      props: {
        clients: mockClients
      }
    });

    expect(wrapper.text()).toContain('Editar');
  });


});
