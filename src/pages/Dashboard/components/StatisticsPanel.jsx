import { useState, useEffect } from 'react';
import styles from './StatisticsPanel.module.css';

const StatisticsPanel = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    newClientsThisMonth: 0,
    activeClients: 0
  });

  useEffect(() => {
    // Aqui virá a lógica para buscar as estatísticas
    setStats({
      totalClients: 150,
      newClientsThisMonth: 12,
      activeClients: 89
    });
  }, []);

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <h3>Total de Clientes</h3>
        <p className={styles.statNumber}>{stats.totalClients}</p>
      </div>
      
      <div className={styles.statCard}>
        <h3>Novos Clientes</h3>
        <p className={styles.statNumber}>{stats.newClientsThisMonth}</p>
        <span className={styles.period}>Este mês</span>
      </div>
      
      <div className={styles.statCard}>
        <h3>Clientes Ativos</h3>
        <p className={styles.statNumber}>{stats.activeClients}</p>
      </div>
    </div>
  );
};

export default StatisticsPanel; 