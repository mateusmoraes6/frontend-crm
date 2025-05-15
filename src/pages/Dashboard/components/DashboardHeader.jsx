import { useNavigate } from 'react-router-dom';
import styles from './DashboardHeader.module.css';

const DashboardHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button 
          onClick={onMenuClick} 
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.searchBar}>
          <input 
            type="search" 
            placeholder="Buscar..." 
            className={styles.searchInput}
          />
        </div>

        <div className={styles.userSection}>
          <button 
            className={styles.notificationButton}
            aria-label="Notificações"
          >
            🔔
          </button>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Usuário</span>
            <button 
              className={styles.userMenu}
              onClick={() => {/* Implementar menu do usuário */}}
            >
              👤
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 