import { Link, useLocation } from 'react-router-dom';
import styles from './DashboardSidebar.module.css';

const DashboardSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard'
    },
    {
      id: 'new-client',
      label: 'Novo Cliente',
      icon: '➕',
      path: '/clients/new'
    },
    {
      id: 'clients',
      label: 'Lista de Clientes',
      icon: '👥',
      path: '/clients'
    },
    // Itens futuros
    {
      id: 'tasks',
      label: 'Tarefas',
      
      path: '/tasks',
      disabled: true
    },
    {
      id: 'calendar',
      label: 'Calendário',
      path: '/calendar',
      disabled: true
    },
    {
      id: 'reports',
      label: 'Relatórios',
      path: '/reports',
      disabled: true
    }
  ];

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} 
        onClick={onToggle}
      />
      <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
        <div className={styles.logo}>
          <h1>CRM</h1>
          <button 
            onClick={onToggle} 
            className={styles.toggleButton}
            aria-label="Toggle sidebar"
          >
            {isOpen ? '←' : '→'}
          </button>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`${styles.menuItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar; 