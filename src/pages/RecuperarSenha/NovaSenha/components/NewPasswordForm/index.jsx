import { LockOutlined } from '@ant-design/icons';
import { StyledPassword, SubmitButton, InputWrapper } from './styles';

export const NewPasswordForm = ({ senha, setSenha, confirmarSenha, setConfirmarSenha, handleSubmit, loading }) => {
  return (
    <InputWrapper>
      <StyledPassword
        size="large"
        prefix={<LockOutlined />}
        placeholder="Nova senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <StyledPassword
        size="large"
        prefix={<LockOutlined />}
        placeholder="Confirmar nova senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />
      <SubmitButton
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Redefinir Senha
      </SubmitButton>
    </InputWrapper>
  );
};
