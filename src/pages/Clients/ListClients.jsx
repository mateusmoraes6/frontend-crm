import { useState, useEffect } from 'react';
import { fetchClients, deleteClient, updateClient } from '../../services/clientService';
import styles from './ListClients.module.css'; 
import Button from '../../components/Button';
import EditClientModal from '../../components/EditClientModal';

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient(id);
        setClients((prev) => prev.filter((c) => c._id !== id));
      } catch (error) {
        setError('Erro ao excluir cliente');
      }
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
  };

  const handleSaveEdit = async (formData) => {
    try {
      await updateClient(editingClient._id, formData);
      setClients((prev) =>
        prev.map((c) =>
          c._id === editingClient._id ? { ...c, ...formData } : c
        )
      );
      setEditingClient(null);
    } catch (error) {
      setError('Erro ao editar cliente');
    }
  };

  const filteredClients = clients.filter(client => {
    const term = search.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.phone.toLowerCase().includes(term) ||
      (client.cpf && client.cpf.toLowerCase().includes(term))
    );
  });

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  if (loading) return <p>Carregando clientes...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Clientes</h2>
      <input
        type="text"
        placeholder="Buscar por nome, email, telefone ou CPF"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      {currentClients.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul className={styles.clientList}>
          {currentClients.map((client) => (
            <li key={client._id} className={styles.clientItem}>
              <strong>{client.name}</strong><br />
              Email: {client.email} <br />
              Telefone: {client.phone}
              <Button
                variant="danger"
                onClick={() => handleDelete(client._id)}
              >
                Excluir
              </Button>
              <Button
                variant="edit"
                onClick={() => handleEdit(client)}
              >
                Editar
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
      {editingClient && (
        <EditClientModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ListClients;
