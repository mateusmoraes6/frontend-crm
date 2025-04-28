import styles from './Button.module.css';

const Button = ({ children, onClick, type = "button", variant = "default", ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;