import { UserOutlined, IdcardOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { StyledInput, StyledPassword } from './styles';
import { formatCpfCnpj } from '../../../../utils/formatters';

export const UserFields = ({ 
  name, setName, 
  cpfOrCnpj, setCpfOrCnpj, 
  email, setEmail, 
  password, setPassword, 
  confirmPassword, setConfirmPassword 
}) => {
  return (
    <>
      <StyledInput
        size="large"
        prefix={<UserOutlined />}
        placeholder="Nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <StyledInput
        size="large"
        prefix={<IdcardOutlined />}
        placeholder="CPF / CNPJ"
        maxLength={18}
        value={cpfOrCnpj}
        onChange={(e) => setCpfOrCnpj(formatCpfCnpj(e.target.value))}
      />

      <StyledInput
        size="large"
        prefix={<MailOutlined />}
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <StyledPassword
        size="large"
        prefix={<LockOutlined />}
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <StyledPassword
        size="large"
        prefix={<LockOutlined />}
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </>
  );
};
