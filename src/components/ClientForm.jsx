import { useState } from 'react';
import styles from './ClientForm.module.css';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados válidos:', formData);
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
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email*</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone*</label>
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Endereço</label>
          <input 
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
};

export default ClientForm;