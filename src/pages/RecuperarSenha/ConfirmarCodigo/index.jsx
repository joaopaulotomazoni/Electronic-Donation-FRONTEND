import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { api } from '../../../services/api';
import { CodeForm } from './components/CodeForm';
import {
  Container,
  ContentContainer,
  FormContainer,
  LinkContainer,
  LayoutContainer,
  HeaderContainer,
  TitleContainer,
  Subtitle,
} from './styles';

export function ConfirmarCodigo() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      message.error('E-mail não encontrado. Por favor, reinicie o processo.');
      navigate('/recuperar-senha/email');
    }
  }, [email, navigate]);

  async function handleSubmit() {
    if (!codigo) {
      message.warning('Por favor, preencha o código de verificação!');
      return;
    }

    try {
      setLoading(true);
      const isCodeValid = await api.post('/forgot-password/verify-code', {
        email,
        code: codigo,
      });

      if (isCodeValid) {
        message.success('Código verificado com sucesso!');
        navigate('/recuperar-senha/nova-senha', {
          state: { email, code: codigo },
        });
      }
    } catch (error) {
      console.error(
        'Falha ao verificar código:',
        error.response?.data || error.message
      );
      message.error(
        error.response?.data?.message ||
          'Código inválido ou expirado. Tente novamente.'
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
            onClick={() => navigate('/recuperar-senha/email')}
          >
            Voltar para o envio de e-mail
          </Button>
        </GlobalHeader>
        <Container>
          <Spin spinning={loading} description="Verificando..." size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Verificar Código</TitleContainer>
                <Subtitle>
                  Digite o código de verificação que enviamos para{' '}
                  <strong>{email}</strong>
                </Subtitle>
              </HeaderContainer>
              
              <CodeForm 
                codigo={codigo} 
                setCodigo={setCodigo} 
                handleSubmit={handleSubmit} 
                loading={loading} 
              />

              <LinkContainer>
                Lembrou a senha?{' '}
                <a onClick={() => navigate('/login')}>Fazer login</a>
              </LinkContainer>
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </LayoutContainer>
  );
}
