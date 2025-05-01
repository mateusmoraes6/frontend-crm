import { useClientForm } from '../../hooks/useClientForm';
import styles from './EditClientModal.module.css';
import Button from '../../ui/Button/Button';
import InputField from '../../ui/InputField/InputField';
import Modal from '../../ui/Modal/Modal';

const EditClientModal = ({ client, onClose, onSave }) => {
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleChange
  } = useClientForm({
    name: client.name,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    address: client.address,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
        onClose();
      } catch (error) {
        // Tratamento de erro, se necessário
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nome*"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          required
          error={errors.name}
        />
        <InputField
          label="Email*"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          type="email"
          error={errors.email}
        />
        <InputField
          label="Telefone*"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefone"
          required
          type="tel"
          error={errors.phone}
        />
        <InputField
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="CPF"
          error={errors.cpf}
        />
        <InputField
          label="Endereço"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Endereço"
        />
        <div className={styles.actions}>
          <Button type="submit" variant="edit" disabled={isSubmitting}>
            Salvar
          </Button>
          <Button type="button" variant="danger" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditClientModal;