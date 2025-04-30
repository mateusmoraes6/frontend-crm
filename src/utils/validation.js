export function validatePhone(phone) {
  const regex = /^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/;
  return regex.test(phone);
}

export function validateEmail(email) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

export function validateCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}
