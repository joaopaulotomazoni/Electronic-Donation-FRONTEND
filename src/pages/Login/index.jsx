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
} from './styles';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Spin, Button, message } from 'antd';
import { ArrowLeftOutlined, LaptopOutlined } from '@ant-design/icons';
import { GlobalHeader } from '../../components/GlobalHeader';
import { LoginForm } from './components/LoginForm';

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
                <TitleContainer level={2}>Electronic Donation</TitleContainer>
              </HeaderContainer>

              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                loading={loading}
              />

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
