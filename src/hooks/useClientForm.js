import { useState } from 'react';
import { validatePhone, validateEmail, validateCPF } from '../utils/validation';

export function useClientForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'O email é obrigatório';
    else if (!validateEmail(formData.email)) newErrors.email = 'Por favor, insira um email válido';
    if (!formData.phone.trim()) newErrors.phone = 'O telefone é obrigatório';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Telefone deve ter DDD e 9 dígitos. Ex: (11) 99999-9999';
    if (formData.cpf && !validateCPF(formData.cpf)) newErrors.cpf = 'CPF deve estar no formato 123.456.789-01';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error = '';
    if (name === 'phone') {
      if (!value.trim()) error = 'O telefone é obrigatório.';
      else if (!validatePhone(value)) error = 'Telefone deve ter DDD e 9 dígitos. Ex: (11) 99999-9999';
    }
    if (name === 'name' && !value.trim()) error = 'O nome é obrigatório';
    if (name === 'email') {
      if (!value.trim()) error = 'O email é obrigatório';
      else if (!validateEmail(value)) error = 'Por favor, insira um email válido';
    }
    if (name === 'cpf') {
      if (value && !validateCPF(value)) error = 'CPF deve estar no formato 123.456.789-01';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleChange,
  };
}
