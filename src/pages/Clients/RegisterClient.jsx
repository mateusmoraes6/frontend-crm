import BackButton from '../../components/ui/BackButton';
import ClientForm from '../../components/form/ClientForm';
import styles from './RegisterClient.module.css';

const RegisterClient = () => {
  return (
    <div className={styles.pageContainer}>
      <BackButton />
      <ClientForm />
    </div>
  );
};

export default RegisterClient;