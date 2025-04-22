import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Total de Clientes</h3>
          <p>0</p>
        </div>
        {/* Outros cards de estatísticas virão aqui */}
      </div>
    </div>
  );
};

export default Dashboard;