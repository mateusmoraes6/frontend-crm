import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      className={styles.backButton}
      aria-label="Voltar"
    >
      ← Voltar
    </button>
  );
};

export default BackButton; 