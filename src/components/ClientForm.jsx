import { useClientForm } from '../hooks/useClientForm';
import styles from './ClientForm.module.css';
import { createClient } from '../services/clientService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';

const ClientForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: ''
  };

  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleChange
  } = useClientForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await createClient(formData);
        toast.success('Cliente cadastrado com sucesso!');
        setFormData(initialValues); // Reset do formulário
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