import styles from './ClientDetailsModal.module.css';
import Button from './Button';

const ClientDetailsModal = ({ client, onClose }) => {
  if (!client) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Detalhes do Cliente</h2>
        <ul className={styles.detailsList}>
          <li><strong>Nome:</strong> {client.name}</li>
          <li><strong>Email:</strong> {client.email}</li>
          <li><strong>Telefone:</strong> {client.phone}</li>
          {client.cpf && <li><strong>CPF:</strong> {client.cpf}</li>}
          {client.address && <li><strong>Endereço:</strong> {client.address}</li>}
          {client.birthDate && <li><strong>Data de Nascimento:</strong> {new Date(client.birthDate).toLocaleDateString()}</li>}
          {client.createdAt && <li><strong>Cadastrado em:</strong> {new Date(client.createdAt).toLocaleString()}</li>}
          {/* Adicione outros campos relevantes aqui */}
        </ul>
        <div className={styles.actions}>
          <Button variant="default" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;