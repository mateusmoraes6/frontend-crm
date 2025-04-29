import { useState } from 'react';
import styles from './ClientForm.module.css';
import { createClient } from '../services/clientService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
        
        <div className={styles.inputGroup}>
          <label>Nome*</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Nome Sobrenome"
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.error}>O nome é obrigatório.</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email*</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: seuemail@email.com"
          />
          {errors.email && <span className={styles.error}>Insira um email válido. Ex: mateus@email.com</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone*</label>
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ex: (11) 99999-9999 ou 11999999999"
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>CPF</label>
          <input 
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="Ex: 123.456.789-01 ou 12345678901"
          />
          {errors.cpf && <span className={styles.error}>CPF deve ter 11 dígitos. Ex: 123.456.789-01</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Endereço</label>
          <input 
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ex: Seu Endereço, 123"
          />
        </div>

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