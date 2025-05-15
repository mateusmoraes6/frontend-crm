import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecentActivities.module.css';

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // Função para adicionar nova atividade
  const addActivity = (type, details) => {
    const newActivity = {
      id: Date.now(),
      type,
      description: getActivityDescription(type),
      details,
      timestamp: new Date()
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 10)); // Mantém apenas as 10 atividades mais recentes
  };

  // Função para obter descrição baseada no tipo
  const getActivityDescription = (type) => {
    const descriptions = {
      client_added: 'Novo cliente cadastrado',
      client_updated: 'Cliente atualizado',
      client_deleted: 'Cliente removido',
      client_exported: 'Lista de clientes exportada',
      client_viewed: 'Detalhes do cliente visualizados'
    };
    return descriptions[type] || 'Ação realizada';
  };

  // Registrar listeners para eventos de atividade
  useEffect(() => {
    const handleActivity = (event) => {
      const { type, details } = event.detail;
      addActivity(type, details);
    };

    window.addEventListener('clientActivity', handleActivity);
    return () => window.removeEventListener('clientActivity', handleActivity);
  }, []);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    const icons = {
      client_added: '➕',
      client_updated: '📝',
      client_deleted: '🗑️',
      client_exported: '📊',
      client_viewed: '👁️'
    };
    return icons[type] || '📋';
  };

  const handleActivityClick = (activity) => {
    if (activity.type === 'client_viewed' && activity.clientId) {
      navigate(`/clients/${activity.clientId}`);
    }
  };

  return (
    <div className={styles.activitiesContainer}>
      <div className={styles.header}>
        <h3>Atividades Recentes</h3>
      </div>
      
      <div className={styles.timeline}>
        {activities.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhuma atividade recente</p>
        ) : (
          activities.map(activity => (
            <div 
              key={activity.id} 
              className={`${styles.activityItem} ${activity.clientId ? styles.clickable : ''}`}
              onClick={() => handleActivityClick(activity)}
            >
              <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className={styles.activityContent}>
                <p className={styles.activityDescription}>
                  {activity.description}
                  <span className={styles.activityDetails}>{activity.details}</span>
                </p>
                <span className={styles.activityTime}>
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivities; 