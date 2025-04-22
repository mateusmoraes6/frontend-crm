import api from './api';

export const createClient = async (clientData) => {
  const response = await api.post('/clients', clientData);
  return response.data;
};
