import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import {
  InputWrapper,
  InputGroup,
  Label,
  StyledInput,
  StyledPassword,
  OptionsRow,
  SubmitButton,
} from './styles';

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}) => {
  return (
    <InputWrapper>
      <InputGroup>
        <Label>E-mail</Label>
        <StyledInput
          size="large"
          prefix={<MailOutlined />}
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Label>Senha</Label>
        <StyledPassword
          size="large"
          prefix={<LockOutlined />}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <OptionsRow>
        <Link to="/recuperar-senha/email">Esqueceu sua senha?</Link>
      </OptionsRow>

      <SubmitButton
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Entrar
      </SubmitButton>
    </InputWrapper>
  );
};
