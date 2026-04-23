import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Container,
  ContentContainer,
  FormContainer,
  LinkContainer,
} from './styles';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { Layout, Spin, Button, Input, Typography, message } from 'antd';
import {
  ArrowLeftOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { GlobalHeader } from '../../components/GlobalHeader';

const { Title, Text } = Typography;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

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
    <Layout
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
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
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title
                  level={2}
                  style={{ color: theme.colors.blue[500], marginBottom: 4 }}
                >
                  Bem-vindo
                </Title>
                <Text type="secondary">
                  Faça login na sua conta para continuar
                </Text>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Input
                  size="large"
                  prefix={
                    <MailOutlined style={{ color: theme.colors.gray[400] }} />
                  }
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input.Password
                  size="large"
                  prefix={
                    <LockOutlined style={{ color: theme.colors.gray[400] }} />
                  }
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  loading={loading}
                  onClick={handleSubmit}
                  style={{
                    marginTop: '0.5rem',
                    backgroundColor: theme.colors.blue[500],
                  }}
                >
                  Entrar
                </Button>
              </div>

              <LinkContainer>
                Ainda não possui conta? <Link to="/signup">Criar conta</Link>
              </LinkContainer>
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </Layout>
  );
};
