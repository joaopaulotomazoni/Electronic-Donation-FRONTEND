import { MailOutlined } from '@ant-design/icons';
import { StyledInput, SubmitButton, InputWrapper } from './styles';

export const EmailForm = ({ email, setEmail, handleSubmit, loading }) => {
  return (
    <InputWrapper>
      <StyledInput
        size="large"
        prefix={<MailOutlined />}
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubmitButton
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Enviar Código
      </SubmitButton>
    </InputWrapper>
  );
};
