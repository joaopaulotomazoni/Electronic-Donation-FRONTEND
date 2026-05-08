import { Spin, Button, message, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AddressForm } from '../../components/AddressForm';
import { UserFields } from './components/UserFields';
import { useAuth } from '../../hooks/useAuth';
import { useAddress } from '../../hooks/useAddress';
import { api } from '../../services/api';
import {
  ContentContainer,
  Container,
  FormContainer,
  LinkContainer,
  LayoutContainer,
  HeaderContainer,
  TitleContainer,
  Subtitle,
  InputWrapper,
  SubmitButton,
} from './styles';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { 
    address, 
    cidadesList, 
    disabledFields, 
    loading: loadingAddress, 
    cepExist,
    fetchAddressByCep,
    handleEstadoChange,
    updateAddressField
  } = useAddress();

  const loading = loadingAddress || loadingSubmit;

  async function handleSubmit() {
    if (
      !name ||
      !cpfOrCnpj ||
      !address.cep ||
      !address.rua ||
      !address.numero ||
      !address.bairro ||
      !address.cidade ||
      !address.estado ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      message.warning('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      setLoadingSubmit(true);
      if (!cepExist) {
        notification.error({
          message: 'Erro no Cadastro',
          description: 'O cep digitado não existe.',
        });
        return;
      }

      const response = await api.post('/register', {
        name,
        cpfOrCnpj: cpfOrCnpj.replace(/\D/g, ''),
        cep: address.cep.replace(/\D/g, ''),
        rua: address.rua,
        numero: address.numero,
        complemento: address.complemento,
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
        email,
        password,
        confirmPassword,
      });

      if (response.data.userData && response.data.token) {
        signIn(response.data.userData, response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error(
        'Falha no cadastro:',
        error.response?.data || error.message
      );
      notification.error({
        message: 'Erro no Cadastro',
        description:
          'Ocorreu um erro ao tentar realizar o cadastro. Verifique os dados e tente novamente.',
      });
    } finally {
      setLoadingSubmit(false);
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
          <Spin spinning={loading} description={loadingSubmit ? "Criando conta..." : "Buscando endereço..."} size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Criar Conta</TitleContainer>
                <Subtitle>Preencha os dados abaixo para se cadastrar</Subtitle>
              </HeaderContainer>

              <InputWrapper>
                <UserFields 
                  name={name} setName={setName}
                  cpfOrCnpj={cpfOrCnpj} setCpfOrCnpj={setCpfOrCnpj}
                  email={email} setEmail={setEmail}
                  password={password} setPassword={setPassword}
                  confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                />

                <AddressForm 
                  address={address}
                  cidadesList={cidadesList}
                  disabledFields={disabledFields}
                  onCepBlur={() => fetchAddressByCep(address.cep)}
                  onEstadoChange={handleEstadoChange}
                  onChangeField={updateAddressField}
                />

                <SubmitButton
                  type="primary"
                  size="large"
                  block
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Cadastrar
                </SubmitButton>
              </InputWrapper>

              <LinkContainer>
                Já possui conta? <Link to="/login">Fazer login</Link>
              </LinkContainer>
            </FormContainer>
          </Spin>
        </Container>
      </ContentContainer>
    </LayoutContainer>
  );
};
