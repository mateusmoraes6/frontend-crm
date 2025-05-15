import api from './api';

// Função auxiliar para disparar eventos de atividade
const dispatchActivity = (type, details) => {
  const event = new CustomEvent('clientActivity', {
    detail: { type, details }
  });
  window.dispatchEvent(event);
};

export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData);
    dispatchActivity('client_added', clientData.name);
    window.dispatchEvent(new Event('updateClientStats'));
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
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

export const deleteClient = async (id, clientName) => {
  try {
    const response = await api.delete(`/clients/${id}`);
    dispatchActivity('client_deleted', clientName);
    window.dispatchEvent(new Event('updateClientStats'));
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    dispatchActivity('client_updated', clientData.name);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

// Nova função para registrar visualização
export const viewClient = (clientId, clientName) => {
  dispatchActivity('client_viewed', clientName);
};

// Nova função para registrar exportação
export const registerExport = () => {
  dispatchActivity('client_exported', 'Lista de clientes');
};
