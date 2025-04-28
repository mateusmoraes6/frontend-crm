import { useState, useEffect } from 'react';
import { fetchClients } from '../../services/clientService';
import styles from './ListClients.module.css'; 

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data || []); 
      } catch (error) {
        setError('Erro ao carregar clientes');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  if (loading) return <p>Carregando clientes...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <ul className={styles.clientList}>
          {clients.map((client) => (
            <li key={client._id} className={styles.clientItem}>
              <strong>{client.name}</strong><br />
              Email: {client.email} <br />
              Telefone: {client.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListClients;
