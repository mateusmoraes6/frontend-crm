import styles from './styles/ClientSearch.module.css';
import InputField from '../../ui/InputField/InputField';

const ClientSearch = ({ search, setSearch }) => {
  return (
    <InputField
      name="search"
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Buscar por nome, email, telefone ou CPF"
      inputClassName={styles.searchInput}
    />
  );
};

export default ClientSearch;
