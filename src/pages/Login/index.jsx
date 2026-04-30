import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
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
  StyledPassword,
  SubmitButton,
  RecoverPasswordContainer,
} from './styles';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Spin, Button, message } from 'antd';
import {
  ArrowLeftOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { GlobalHeader } from '../../components/GlobalHeader';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !password) {
      message.warning('Por favor, preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.data.userData && response.data.token) {
        signIn(response.data.userData, response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Falha no login:', error.response?.data || error.message);
      message.error(
        error.response?.data?.message ||
          'Falha no login. Verifique suas credenciais.'
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
            onClick={() => navigate('/')}
          >
            Voltar para Home
          </Button>
        </GlobalHeader>
        <Container>
          <Spin spinning={loading} description="Autenticando..." size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Bem-vindo</TitleContainer>
                <Subtitle>Faça login na sua conta para continuar</Subtitle>
              </HeaderContainer>

              <InputWrapper>
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

                <RecoverPasswordContainer>
                  <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                </RecoverPasswordContainer>

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

              <LinkContainer>
                Ainda não possui conta? <Link to="/signup">Criar conta</Link>
              </LinkContainer>
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </LayoutContainer>
  );
};
