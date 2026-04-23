import { notification, Select } from 'antd';
import { UF } from '../../constants/uf';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Container,
  FormContainer,
  InputGroup,
  Button,
  LinkContainer,
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
    try {
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
    }
  }

  function handleOnEstadoChange(value) {
    setEstado(value);
    setCidade('');
    fetchCidades(value);
  }

  async function handleSubmit() {
    try {
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
    }
  }

  return (
    <Container>
      <FormContainer>
        <h2>Criar Conta</h2>
        <InputGroup>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="cpf">CPF / CNPJ</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            required
            maxLength={18}
            inputMode="numeric"
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
        </InputGroup>
        <InputGroup>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            required
            maxLength={9}
            inputMode="numeric"
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
        </InputGroup>
        <InputGroup>
          <label htmlFor="estado">Estado</label>
          <Select
            id="estado"
            size="large"
            style={{ width: '100%' }}
            placeholder="Selecione um estado"
            value={estado || undefined}
            onChange={handleOnEstadoChange}
            options={UF}
            disabled={disabledFields.estado}
            showSearch
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="cidade">Cidade</label>
          <Select
            id="cidade"
            size="large"
            style={{ width: '100%' }}
            placeholder="Selecione uma cidade"
            value={cidade || undefined}
            onChange={(value) => setCidade(value)}
            options={cidadesList}
            disabled={disabledFields.cidade}
            showSearch
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            required
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            disabled={disabledFields.bairro}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            name="rua"
            required
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            disabled={disabledFields.rua}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            inputMode="numeric"
            id="numero"
            name="numero"
            required
            value={numero}
            onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="complemento">Complemento (Opcional)</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Confirmar senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleSubmit}>Cadastrar</Button>
        <LinkContainer>
          Já possui conta? <Link to="/login">Fazer login</Link>
        </LinkContainer>
      </FormContainer>
    </Container>
  );
};
