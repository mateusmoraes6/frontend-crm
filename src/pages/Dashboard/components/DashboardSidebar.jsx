import { Link } from 'react-router-dom';
import styles from './DashboardSidebar.module.css';

const DashboardSidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      id: 'clients',
      label: 'Clientes',
      icon: 'users',
      path: '/clients'
    },
    // Itens futuros
    {
      id: 'tasks',
      label: 'Tarefas',
      icon: 'tasks',
      path: '/tasks',
      disabled: true
    },
    {
      id: 'calendar',
      label: 'Calendário',
      icon: 'calendar',
      path: '/calendar',
      disabled: true
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: 'chart-bar',
      path: '/reports',
      disabled: true
    }
  ];

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <div className={styles.logo}>
        <h1>CRM</h1>
        <button onClick={onToggle} className={styles.toggleButton}>
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <nav className={styles.navigation}>
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''}`}
            onClick={e => item.disabled && e.preventDefault()}
          >
            <span className={styles.icon}>{/* Ícone aqui */}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar; 