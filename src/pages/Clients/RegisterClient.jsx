import ClienteForm from '../../components/ClientForm';
import styles from './RegisterClient.module.css';

const RegisterClient = () => {
  return (
    <div className={styles.pageContainer}>
      <ClienteForm />
    </div>
  );
};

export default RegisterClient;