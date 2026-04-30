import { Spin, Button, message, notification } from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { GlobalHeader } from '../../components/GlobalHeader';
import { UF } from '../../constants/uf';
import { useAuth } from '../../hooks/useAuth';
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
  InputRow,
  StyledInput,
  StyledPassword,
  StyledSelect,
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
  const [cep, setCep] = useState('');
  const [cepExist, setCepExist] = useState(false);
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidadesList, setCidadesList] = useState([]);
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [disabledFields, setDisabledFields] = useState({
    rua: false,
    bairro: false,
    cidade: true,
    estado: false,
  });
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const fetchCidades = async (uf) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const data = await response.json();
      const cidadesFormatadas = data.map((cidadeIBGE) => ({
        value: cidadeIBGE.nome,
        label: cidadeIBGE.nome,
      }));
      setCidadesList(cidadesFormatadas);
      setDisabledFields({
        cidade: false,
      });
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  async function handleCepBlur() {
    const cepNumerico = cep.replace(/\D/g, '');
    if (!cepNumerico) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://viacep.com.br/ws/${cepNumerico}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
        setCepExist(true);
        if (data.uf) {
          await fetchCidades(data.uf);
        }
        setCidade(data.localidade);

        setDisabledFields({
          rua: !!data.logradouro,
          bairro: !!data.bairro,
          cidade: !!data.localidade,
          estado: !!data.uf,
        });
      } else {
        notification.error({
          message: 'CEP Inválido',
          description: 'O CEP informado não foi encontrado.',
        });
        setCepExist(false);
        setDisabledFields({
          rua: false,
          bairro: false,
          cidade: true,
          estado: false,
        });
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      notification.error({
        message: 'Erro na busca',
        description:
          'Ocorreu um erro ao tentar buscar o CEP. Tente novamente mais tarde.',
      });
      setCepExist(false);
      setDisabledFields({
        rua: false,
        bairro: false,
        cidade: false,
        estado: false,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleOnEstadoChange(value) {
    setEstado(value);
    setCidade('');
    fetchCidades(value);
  }

  async function handleSubmit() {
    if (
      !name ||
      !cpfOrCnpj ||
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      message.warning('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      setLoading(true);
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
        cep: cep.replace(/\D/g, ''),
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
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
          <Spin spinning={loading} description="Criando conta..." size="large">
            <FormContainer>
              <HeaderContainer>
                <TitleContainer level={2}>Criar Conta</TitleContainer>
                <Subtitle>Preencha os dados abaixo para se cadastrar</Subtitle>
              </HeaderContainer>

              <InputWrapper>
                <StyledInput
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <StyledInput
                  size="large"
                  prefix={<IdcardOutlined />}
                  placeholder="CPF / CNPJ"
                  maxLength={18}
                  value={cpfOrCnpj}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 14) value = value.slice(0, 14);

                    if (value.length <= 11) {
                      value = value
                        .replace(/(\d{3})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                    } else {
                      value = value
                        .replace(/^(\d{2})(\d)/, '$1.$2')
                        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                        .replace(/\.(\d{3})(\d)/, '.$1/$2')
                        .replace(/(\d{4})(\d)/, '$1-$2');
                    }
                    setCpfOrCnpj(value);
                  }}
                />

                <StyledInput
                  size="large"
                  prefix={<EnvironmentOutlined />}
                  placeholder="CEP"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 8) value = value.slice(0, 8);
                    if (value.length > 5)
                      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                    setCep(value);
                  }}
                  onBlur={handleCepBlur}
                />

                <InputRow>
                  <StyledSelect
                    $weight={1}
                    size="large"
                    placeholder="Estado"
                    value={estado || undefined}
                    onChange={handleOnEstadoChange}
                    options={UF}
                    disabled={disabledFields.estado}
                    showSearch
                  />
                  <StyledSelect
                    $weight={2}
                    size="large"
                    placeholder="Cidade"
                    value={cidade || undefined}
                    onChange={(value) => setCidade(value)}
                    options={cidadesList}
                    disabled={disabledFields.cidade}
                    showSearch
                  />
                </InputRow>

                <StyledInput
                  size="large"
                  prefix={<HomeOutlined />}
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  disabled={disabledFields.bairro}
                />

                <InputRow>
                  <StyledInput
                    $weight={2}
                    size="large"
                    prefix={<HomeOutlined />}
                    placeholder="Rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    disabled={disabledFields.rua}
                  />
                  <StyledInput
                    $weight={1}
                    size="large"
                    prefix={<NumberOutlined />}
                    placeholder="Número"
                    value={numero}
                    onChange={(e) =>
                      setNumero(e.target.value.replace(/\D/g, ''))
                    }
                  />
                </InputRow>

                <StyledInput
                  size="large"
                  prefix={<HomeOutlined />}
                  placeholder="Complemento (Opcional)"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />

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

                <StyledPassword
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
