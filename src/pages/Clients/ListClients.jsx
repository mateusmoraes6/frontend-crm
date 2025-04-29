import { useState, useEffect } from 'react';
import { fetchClients, deleteClient, updateClient } from '../../services/clientService';
import styles from './ListClients.module.css'; 
import Button from '../../components/Button';
import EditClientModal from '../../components/EditClientModal';
import ClientDetailsModal from '../../components/ClientDetailsModal';

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedClient, setSelectedClient] = useState(null);

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

  function compareValues(a, b, field) {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;

    if (field === 'name') {
      return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
    }
    if (field === 'createdAt' || field === 'birthDate') {
      // Garante que está comparando datas
      return new Date(a[field]) - new Date(b[field]);
    }
    return 0;
  }

  const sortedClients = [...clients].sort((a, b) => {
    const result = compareValues(a, b, sortField);
    return sortOrder === 'asc' ? result : -result;
  });

  const filteredClients = sortedClients.filter(client => {
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
      <div className={styles.sortContainer}>
        <label htmlFor="sortField">Ordenar por:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={e => setSortField(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="name">Nome</option>
          <option value="createdAt">Data de Cadastro</option>
          <option value="birthDate">Data de Nascimento</option>
        </select>
        <button
          type="button"
          className={styles.sortButton}
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          title={sortOrder === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
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
              <strong
                className={styles.clientName}
                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                onClick={() => setSelectedClient(client)}
              >
                {client.name}
              </strong><br />
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
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

export default ListClients;
