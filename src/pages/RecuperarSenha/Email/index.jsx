import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Spin, Button, message } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { api } from '../../../services/api';
import {
  Container,
  ContentContainer,
  FormContainer,
  LinkContainer,
  LayoutContainer,
  HeaderContainer,
  TitleContainer,
  Subtitle,
  InputWrapper,
  StyledInput,
  SubmitButton,
} from './styles';

export function Email() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email) {
      message.warning('Por favor, preencha o campo de e-mail!');
      return;
    }

    try {
      setLoading(true);

      await api.post('/forgot-password/send-code', { email });

      console.log('enviado');
      message.success('Código de verificação enviado!');
      navigate('/recuperar-senha/codigo-verificacao', { state: { email } });
    } catch (error) {
      console.error(
        'Falha ao enviar código:',
        error.response?.data || error.message
      );
      message.error(
        error.response?.data?.message ||
          'Falha ao enviar o código. Verifique se o e-mail está correto.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutContainer>
      <ContentContainer>
        <GlobalHeader>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/login')}
          >
            Voltar para Login
          </Button>
        </GlobalHeader>
        <Container>
          <Spin spinning={loading} description="Enviando..." size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Recuperar Senha</TitleContainer>
                <Subtitle>
                  Digite seu e-mail para receber um código de verificação
                </Subtitle>
              </HeaderContainer>
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
              <LinkContainer>
                Lembrou a senha? <Link to="/login">Fazer login</Link>
              </LinkContainer>
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </LayoutContainer>
  );
}
