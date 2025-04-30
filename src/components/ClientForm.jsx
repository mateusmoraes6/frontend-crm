import { useState } from 'react';
import styles from './ClientForm.module.css';
import { createClient } from '../services/clientService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePhone = (phone) => {
    // Aceita (11) 99999-9999 ou 11999999999
    const regex = /^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/;
    return regex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) error = 'Por favor, insira um email válido';
    }
    if (name === 'cpf') {
      if (!value.trim()) {
        error = 'CPF deve ter 11 dígitos. Ex: 123.456.789-01';
      } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) {
        error = 'CPF deve estar no formato 123.456.789-01';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await createClient(formData);
        toast.success('Cliente cadastrado com sucesso!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          address: ''
        });
        setErrors({});
      } catch (error) {
        toast.error('Erro ao cadastrar cliente.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Por favor, corrija os erros antes de enviar.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastro de Cliente</h2>
        
        <InputField
          label="Nome*"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Nome Sobrenome"
          error={errors.name}
          inputClassName={errors.name ? styles.inputError : ''}
        />

        <InputField
          label="Email*"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: seuemail@email.com"
          error={errors.email}
        />

        <InputField
          label="Telefone*"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ex: (11) 99999-9999 ou 11999999999"
          error={errors.phone}
          inputClassName={errors.phone ? styles.inputError : ''}
        />

        <InputField
          label="CPF"
          name="cpf"
          type="text"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="Ex: 123.456.789-01 ou 12345678901"
          error={errors.cpf}
        />

        <InputField
          label="Endereço"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Ex: Seu Endereço, 123"
        />

        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;