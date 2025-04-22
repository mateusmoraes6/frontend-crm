import styles from './ListClients.module.css';

const ListClients = () => {
  return (
    <div className={styles.container}>
      <h1>Lista de Clientes</h1>
      <div className={styles.clientList}>
        {/* Aqui virá a tabela ou cards de clientes */}
        <p>Em desenvolvimento...</p>
      </div>
    </div>
  );
};

export default ListClients;