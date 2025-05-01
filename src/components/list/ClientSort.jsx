import styles from './styles/ClientSort.module.css';
import Button from '../../ui/Button/Button';

const ClientSort = ({ sortField, setSortField, sortOrder, toggleSortOrder }) => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sortField">Ordenar por:</label>
      <select
        id="sortField"
        value={sortField}
        onChange={e => setSortField(e.target.value)}
        className={styles.sortSelect}
      >
        <option value="name">Nome</option>
        <option value="createdAt">Data de Cadastro</option>
        <option value="birthDate">Data de Nascimento</option>
      </select>
      <Button
        type="button"
        className={styles.sortButton}
        onClick={toggleSortOrder}
        title={sortOrder === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
        variant="default"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </Button>
    </div>
  );
};

export default ClientSort;
