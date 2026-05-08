import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { DeviceCard } from '../../components/DeviceCard';
import { useAuth } from '../../hooks/useAuth';
import { Select, Space, List, Spin, Dropdown, Layout } from 'antd';
import {
  SearchOutlined,
  DownOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { DEVICE_CATEGORY } from '../../constants/deviceCategory';
import { DEVICE_STATUS } from '../../constants/deviceState';
import { UF } from '../../constants/uf';
import { useTheme } from 'styled-components';
import { GlobalHeader } from '../../components/GlobalHeader';
import {
  LayoutContainer,
  UserMenuButton,
  UserAvatar,
  LoginButton,
  RegisterButton,
  MainContent,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  SearchWrapper,
  SearchContainer,
  SearchInput,
  SearchSelect,
  UfSelect,
  CitySelect,
  SearchButton,
  ListWrapper,
  SectionTitle,
} from './styles';

const { Option } = Select;

export const Home = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, signOut, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cidadesList, setCidadesList] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();

  function handleSignOut() {
    signOut();
  }

  const userMenuItems = [
    {
      key: 'editar_perfil',
      label: 'Editar perfil',
      onClick: () => navigate('/perfil'),
    },
    {
      key: 'doador',
      label: 'Tela do doador',
      onClick: () => navigate('/doador'),
    },
    {
      key: 'recebedor',
      label: 'Tela do recebedor',
      onClick: () => navigate('/recebedor'),
    },
    {
      type: 'divider',
    },
    {
      key: 'sair',
      label: 'Sair',
      danger: true,
      onClick: handleSignOut,
    },
  ];

  const fetchCidades = async (uf) => {
    if (!uf) {
      setCidadesList([]);
      return;
    }
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
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleOnEstadoChange = (value) => {
    setSelectedUf(value);
    setSelectedCity('');
    fetchCidades(value);
  };

  const handleFilterDevices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/filter-avaible-devices', {
        params: {
          userId: user?.id,
          search: searchTerm || undefined,
          categoria: selectedCategory || undefined,
          estado_conservacao: selectedStatus || undefined,
          uf: selectedUf || undefined,
          cidade: selectedCity || undefined,
        },
      });
      setDevices(response.data);
    } catch (error) {
      console.log('Erro ao buscar dispositivos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchDevices() {
      try {
        setLoading(true);
        const response = await api.get('/avaible-devices', {
          params: {
            userId: user?.id,
          },
        });

        console.log({ response: response.data });

        setDevices(response.data);
      } catch (error) {
        console.log('Erro ao buscar dispositivos', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, [user]);

  return (
    <LayoutContainer>
      <GlobalHeader>
        {isAuthenticated ? (
          <>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <UserMenuButton type="text">
                <UserAvatar size="small" src={user?.foto}>
                  {user?.nome?.charAt(0)?.toUpperCase() ||
                    user?.name?.charAt(0)?.toUpperCase() ||
                    'U'}
                </UserAvatar>
                Bem vindo(a) {user.nome}!
                <DownOutlined />
              </UserMenuButton>
            </Dropdown>
          </>
        ) : (
          <Space size="middle">
            <LoginButton
              type="text"
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              Entrar
            </LoginButton>
            <RegisterButton
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => navigate('/signup')}
            >
              Criar Conta
            </RegisterButton>
          </Space>
        )}
      </GlobalHeader>
      <MainContent>
        <HeroSection>
          <HeroTitle level={1}>Transforme Tecnologia em Oportunidade</HeroTitle>
          <HeroSubtitle>
            Doe dispositivos eletrônicos que você não usa mais, ou encontre o
            equipamento que você precisa.
          </HeroSubtitle>
        </HeroSection>

        <SearchWrapper>
          <SearchContainer>
            <SearchInput
              size="large"
              prefix={
                <SearchOutlined style={{ color: theme.colors.gray[400] }} />
              }
              placeholder="O que você procura?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchSelect
              size="large"
              placeholder="Categoria"
              value={selectedCategory || undefined}
              onChange={(value) => setSelectedCategory(value)}
            >
              <Option value="">Todas</Option>
              {DEVICE_CATEGORY.map((categoria) => (
                <Option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </Option>
              ))}
            </SearchSelect>
            <SearchSelect
              size="large"
              placeholder="Estado de conservação"
              value={selectedStatus || undefined}
              onChange={(value) => setSelectedStatus(value)}
            >
              <Option value="">Qualquer estado</Option>
              {DEVICE_STATUS.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </SearchSelect>
            <UfSelect
              size="large"
              placeholder="UF"
              value={selectedUf || undefined}
              onChange={handleOnEstadoChange}
              showSearch
            >
              <Option value="">Todas</Option>
              {UF.map((estado) => (
                <Option key={estado.value} value={estado.value}>
                  {estado.label}
                </Option>
              ))}
            </UfSelect>
            <CitySelect
              size="large"
              placeholder="Cidade"
              value={selectedCity || undefined}
              onChange={(value) => setSelectedCity(value)}
              disabled={cidadesList.length === 0}
              $isDisabled={cidadesList.length === 0}
              showSearch
            >
              <Option value="">Todas as cidades</Option>
              {cidadesList.map((cidade) => (
                <Option key={cidade.value} value={cidade.value}>
                  {cidade.label}
                </Option>
              ))}
            </CitySelect>
            <SearchButton
              size="large"
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleFilterDevices}
            >
              Buscar
            </SearchButton>
          </SearchContainer>
        </SearchWrapper>

        <ListWrapper>
          <SectionTitle level={3}>Dispositivos Disponíveis</SectionTitle>
          <Spin
            spinning={loading}
            size="large"
            description="Carregando dispositivos..."
          >
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
              dataSource={devices}
              renderItem={(item) => (
                <List.Item>
                  <DeviceCard device={item} />
                </List.Item>
              )}
            />
          </Spin>
        </ListWrapper>
      </MainContent>
    </LayoutContainer>
  );
};
