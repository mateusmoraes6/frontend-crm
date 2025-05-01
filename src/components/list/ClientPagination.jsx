import styles from './styles/ClientPagination.module.css';
import Button from '../../ui/Button/Button';

const ClientPagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage
}) => {
  return (
    <div className={styles.pagination}>
      <Button
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        variant="default"
      >
        Anterior
      </Button>
      <span>Página {currentPage} de {totalPages}</span>
      <Button
        onClick={onNextPage}
        disabled={!hasNextPage}
        variant="default"
      >
        Próxima
      </Button>
    </div>
  );
};

export default ClientPagination;
