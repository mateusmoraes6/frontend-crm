import { useState, useEffect } from 'react';
import styles from './RecentActivities.module.css';

const RecentActivities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'client_added',
      description: 'Novo cliente cadastrado',
      user: 'Sistema',
      timestamp: new Date(),
      details: 'João Silva'
    },
    {
      id: 2,
      type: 'client_updated',
      description: 'Cliente atualizado',
      user: 'Sistema',
      timestamp: new Date(Date.now() - 3600000), // 1 hora atrás
      details: 'Maria Santos'
    },
    {
      id: 3,
      type: 'client_contact',
      description: 'Contato realizado',
      user: 'Sistema',
      timestamp: new Date(Date.now() - 7200000), // 2 horas atrás
      details: 'Pedro Oliveira'
    }
  ]);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos atrás`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} horas atrás`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={styles.activitiesContainer}>
      <div className={styles.header}>
        <h3>Atividades Recentes</h3>
      </div>
      
      <div className={styles.timeline}>
        {activities.map(activity => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              {activity.type === 'client_added' && '➕'}
              {activity.type === 'client_updated' && '📝'}
              {activity.type === 'client_contact' && '📞'}
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
        ))}
      </div>
    </div>
  );
};

export default RecentActivities; 