import React from 'react';
import styles from './InputField.module.css';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  inputClassName = '',
  ...rest
}) => (
  <div className={`${styles.inputGroup} ${className}`}>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${error ? styles.inputError : ''} ${inputClassName}`}
      {...rest}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputField;
