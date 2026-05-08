export const formatCpfCnpj = (value) => {
  let val = value.replace(/\D/g, '');
  if (val.length > 14) val = val.slice(0, 14);

  if (val.length <= 11) {
    return val
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    return val
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
};

export const formatCep = (value) => {
  let val = value.replace(/\D/g, '');
  if (val.length > 8) val = val.slice(0, 8);
  if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, '$1-$2');
  return val;
};
