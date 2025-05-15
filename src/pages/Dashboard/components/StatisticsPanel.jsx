import { useState, useEffect } from 'react';
import { fetchClients } from '../../../services/clientService';
import styles from './StatisticsPanel.module.css';

const StatisticsPanel = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    newClientsThisMonth: 0,
    clientsWithPendingTasks: 0 // Nova métrica mais útil
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const clients = await fetchClients();
      
      // Total de clientes
      const total = clients.length;
      
      // Novos clientes este mês
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const newClients = clients.filter(client => {
        const clientDate = new Date(client.createdAt);
        return clientDate >= firstDayOfMonth;
      }).length;

      // Clientes com interações recentes (últimos 30 dias)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentlyActive = clients.filter(client => {
        const lastInteraction = new Date(client.lastInteraction || client.createdAt);
        return lastInteraction >= thirtyDaysAgo;
      }).length;

      setStats({
        totalClients: total,
        newClientsThisMonth: newClients,
        clientsWithPendingTasks: recentlyActive // Por enquanto usaremos interações recentes
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  // Função para atualizar as estatísticas quando houver mudanças
  const updateStats = () => {
    loadStatistics();
  };

  // Expor a função de atualização para o componente pai
  useEffect(() => {
    // Registrar o evento personalizado para atualização
    window.addEventListener('updateClientStats', updateStats);
    return () => {
      window.removeEventListener('updateClientStats', updateStats);
    };
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
        <p className={styles.statNumber}>{stats.clientsWithPendingTasks}</p>
        <span className={styles.period}>Últimos 30 dias</span>
      </div>
    </div>
  );
};

export default StatisticsPanel; 