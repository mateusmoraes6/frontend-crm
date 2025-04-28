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
