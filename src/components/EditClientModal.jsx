import { useState } from 'react';
import Button from './Button';
import styles from './EditClientModal.module.css';
import InputField from '../ui/InputField';

const EditClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    address: client.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nome*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <InputField
            label="Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
          />
          <InputField
            label="Telefone*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefone"
            required
            type="tel"
          />
          <InputField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
          />
          <InputField
            label="Endereço"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Endereço"
          />
          <div className={styles.actions}>
            <Button type="submit" variant="edit">Salvar</Button>
            <Button type="button" variant="danger" onClick={onClose}>Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;