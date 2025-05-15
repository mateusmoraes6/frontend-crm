import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import QuickActions from './components/QuickActions';
import StatisticsPanel from './components/StatisticsPanel';
import RecentActivities from './components/RecentActivities';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'new-client',
      title: 'Novo Cliente',
      icon: 'user-plus',
      description: 'Cadastrar novo cliente no sistema',
      action: () => navigate('/clients/new'),
      color: 'primary'
    },
    {
      id: 'list-clients',
      title: 'Lista de Clientes',
      icon: 'users',
      description: 'Visualizar e gerenciar clientes',
      action: () => navigate('/clients'),
      color: 'info'
    },
    // Preparado para futuras ações
    {
      id: 'new-task',
      title: 'Nova Tarefa',
      icon: 'task',
      description: 'Criar nova tarefa ou lembrete',
      action: () => navigate('/tasks/new'),
      color: 'success',
      disabled: true // Será habilitado quando o módulo for implementado
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={styles.mainContent}>
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className={styles.dashboardGrid}>
          {/* Seção de Ações Rápidas */}
          <section className={styles.quickActionsSection}>
            <h2>Ações Rápidas</h2>
            <QuickActions actions={quickActions} />
          </section>

          {/* Painel de Estatísticas */}
          <section className={styles.statisticsSection}>
            <h2>Visão Geral</h2>
            <StatisticsPanel />
          </section>

          {/* Atividades Recentes */}
          <section className={styles.recentActivitiesSection}>
            <h2>Atividades Recentes</h2>
            <RecentActivities />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;