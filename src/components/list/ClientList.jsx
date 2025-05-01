import styles from './styles/ClientList.module.css';
import ClientListItem from './ClientListItem';

const ClientList = ({ clients, onEdit, onDelete, onSelect }) => {
  if (clients.length === 0) {
    return <p>Nenhum cliente encontrado.</p>;
  }

  return (
    <ul className={styles.clientList}>
      {clients.map((client) => (
        <ClientListItem
          key={client._id}
          client={client}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default ClientList;
