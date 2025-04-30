import { useState, useEffect, useMemo } from 'react';
import { fetchClients, deleteClient, updateClient } from '../../services/clientService';
import styles from './ListClients.module.css';
import Button from '../../ui/Button';
import EditClientModal from '../../components/EditClientModal';
import ClientDetailsModal from '../../components/ClientDetailsModal';
import { exportToCSV } from '../../utils/exportCSV';
import InputField from '../../ui/InputField';
import { useSort } from '../../hooks/useSort';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Ordenar
  const { sortField, setSortField, sortOrder, toggleSortOrder, sortItems } = useSort('name');
  const sortedClients = useMemo(() => sortItems(clients), [clients, sortField, sortOrder]);
  
  // Filtrar
  const { search, setSearch, filteredItems } = useSearch(sortedClients);
  
  // Paginar
  const { 
    currentPage, 
    totalPages, 
    currentItems, 
    goToNextPage, 
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage 
  } = usePagination(filteredItems);

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
        <Button
          type="button"
          className={styles.sortButton}
          onClick={toggleSortOrder}
          title={sortOrder === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
          variant="default"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>

      <InputField
        name="search"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome, email, telefone ou CPF"
        inputClassName={styles.searchInput}
      />

      {currentItems.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul className={styles.clientList}>
          {currentItems.map((client) => (
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
        <Button
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
          variant="default"
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          variant="default"
        >
          Próxima
        </Button>
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

      <Button
        variant="default"
        onClick={() => exportToCSV(filteredItems)}
      >
        Exportar CSV
      </Button>
    </div>
  );
};

export default ListClients;
