import { useState, useEffect, useMemo } from 'react';
import { fetchClients, deleteClient, updateClient } from '../../services/clientService';
import styles from './ListClients.module.css';
import Button from '../../ui/Button/Button';
import EditClientModal from '../../components/modals/EditClientModal';
import ClientDetailsModal from '../../components/modals/ClientDetailsModal';
import { exportToCSV } from '../../utils/exportCSV';
import { useSort } from '../../hooks/useSort';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';

// Novos componentes
import ClientSort from '../../components/list/ClientSort';
import ClientSearch from '../../components/list/ClientSearch';
import ClientList from '../../components/list/ClientList';
import ClientPagination from '../../components/list/ClientPagination';

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const { sortField, setSortField, sortOrder, toggleSortOrder, sortItems } = useSort('name');
  const sortedClients = useMemo(() => sortItems(clients), [clients, sortField, sortOrder]);
  
  const { search, setSearch, filteredItems } = useSearch(sortedClients);
  
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
    loadClients();
  }, []);

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient(id);
        setClients(prev => prev.filter(c => c._id !== id));
      } catch (error) {
        setError('Erro ao excluir cliente');
      }
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      await updateClient(editingClient._id, formData);
      setClients(prev =>
        prev.map(c => c._id === editingClient._id ? { ...c, ...formData } : c)
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
      
      <ClientSort
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      />

      <ClientSearch
        search={search}
        setSearch={setSearch}
      />

      <ClientList
        clients={currentItems}
        onEdit={setEditingClient}
        onDelete={handleDelete}
        onSelect={setSelectedClient}
      />

      <ClientPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />

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
