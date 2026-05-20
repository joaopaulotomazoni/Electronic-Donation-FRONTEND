import { SafetyCertificateOutlined } from '@ant-design/icons';
import { StyledInput, SubmitButton, InputWrapper } from './styles';

export const CodeForm = ({ codigo, setCodigo, handleSubmit, loading }) => {
  return (
    <InputWrapper>
      <StyledInput
        size="large"
        prefix={<SafetyCertificateOutlined />}
        placeholder="Código de 6 dígitos"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <SubmitButton
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Verificar Código
      </SubmitButton>
    </InputWrapper>
  );
};
