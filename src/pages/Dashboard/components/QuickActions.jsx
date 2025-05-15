import styles from './QuickActions.module.css';

const QuickActions = ({ actions }) => {
  return (
    <div className={styles.quickActionsGrid}>
      {actions.map(action => (
        <button
          key={action.id}
          className={`${styles.actionCard} ${action.disabled ? styles.disabled : ''}`}
          onClick={action.action}
          disabled={action.disabled}
        >
          <div className={`${styles.iconWrapper} ${styles[action.color]}`}>
            <span className={styles.icon}>{/* Ícone aqui */}</span>
          </div>
          <h3>{action.title}</h3>
          <p>{action.description}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions; 