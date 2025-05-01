import styles from './styles/ClientListItem.module.css';
import Button from '../../ui/Button/Button';

const ClientListItem = ({ client, onEdit, onDelete, onSelect }) => {
  return (
    <li className={styles.clientItem}>
      <strong
        className={styles.clientName}
        style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
        onClick={() => onSelect(client)}
      >
        {client.name}
      </strong>
      <br />
      Email: {client.email} <br />
      Telefone: {client.phone}
      <Button
        variant="danger"
        onClick={() => onDelete(client._id)}
      >
        Excluir
      </Button>
      <Button
        variant="edit"
        onClick={() => onEdit(client)}
      >
        Editar
      </Button>
    </li>
  );
};

export default ClientListItem;
