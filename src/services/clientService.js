import api from './api';

export const createClient = async (clientData) => {
  const response = await api.post('/clients', clientData);
  return response.data;
};

export async function fetchClients() {
  try {
    const response = await fetch('http://localhost:5000/api/clients'); 
    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro no fetchClients:', error);
    throw error;
  }
}

export async function deleteClient(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir cliente');
    }
    return true;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
}

export async function updateClient(id, clientData) {
  try {
    const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
}
