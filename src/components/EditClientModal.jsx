import { useState } from 'react';
import Button from './Button';
import styles from './EditClientModal.module.css';
import InputField from '../ui/InputField';
import { validatePhone, validateEmail, validateCPF } from '../utils/validation';

const EditClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    address: client.address,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone deve ter DDD e 9 dígitos. Ex: (11) 99999-9999';
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF deve estar no formato 123.456.789-01';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = '';
    if (name === 'phone') {
      if (!value.trim()) {
        error = 'O telefone é obrigatório.';
      } else if (!validatePhone(value)) {
        error = 'Telefone deve ter DDD e 9 dígitos. Ex: (11) 99999-9999';
      }
    }
    if (name === 'name' && !value.trim()) error = 'O nome é obrigatório';
    if (name === 'email') {
      if (!value.trim()) error = 'O email é obrigatório';
      else if (!validateEmail(value)) error = 'Por favor, insira um email válido';
    }
    if (name === 'cpf') {
      if (value && !validateCPF(value)) {
        error = 'CPF deve estar no formato 123.456.789-01';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      onSave(formData);
      setIsSubmitting(false);
    }
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
            <Button type="submit" variant="edit" disabled={isSubmitting}>Salvar</Button>
            <Button type="button" variant="danger" onClick={onClose}>Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;