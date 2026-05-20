import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { api } from '../../../services/api';
import { NewPasswordForm } from './components/NewPasswordForm';
import {
  Container,
  ContentContainer,
  FormContainer,
  LayoutContainer,
  HeaderContainer,
  TitleContainer,
  Subtitle,
} from './styles';
import { useAuth } from '../../../hooks/useAuth';

export function NovaSenha() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const email = location.state?.email;
  const code = location.state?.code;

  useEffect(() => {
    if (!email || !code) {
      message.error('Dados não encontrados. Por favor, reinicie o processo.');
      navigate('/recuperar-senha/email');
    }
  }, [email, code, navigate]);

  async function handleSubmit() {
    if (!senha || !confirmarSenha) {
      message.warning('Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      message.warning('As senhas não coincidem!');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/forgot-password/reset-password', {
        email,
        code,
        senha,
      });

      if (!response.data.userData || !response.data.token) {
        message.success('Houve um erro ao fazer login!');
      }

      signIn(response.data.userData, response.data.token);

      message.success('Senha redefinida com sucesso!');
      navigate('/');
    } catch (error) {
      console.error(
        'Falha ao redefinir senha:',
        error.response?.data || error.message
      );
      message.error(
        error.response?.data?.message ||
          'Falha ao redefinir a senha. Tente novamente.'
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
          <Spin spinning={loading} description="Redefinindo..." size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Nova Senha</TitleContainer>
                <Subtitle>Crie uma nova senha para acessar sua conta</Subtitle>
              </HeaderContainer>
              
              <NewPasswordForm 
                senha={senha} 
                setSenha={setSenha} 
                confirmarSenha={confirmarSenha} 
                setConfirmarSenha={setConfirmarSenha} 
                handleSubmit={handleSubmit} 
                loading={loading} 
              />
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </LayoutContainer>
  );
}
