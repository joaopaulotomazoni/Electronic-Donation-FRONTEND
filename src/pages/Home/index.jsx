import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { DeviceCard } from '../../components/DeviceCard';
import { useAuth } from '../../hooks/useAuth';
import {
  Layout,
  Button,
  Input,
  Select,
  Typography,
  Space,
  List,
  Spin,
  Dropdown,
  Avatar,
} from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { DEVICE_CATEGORY } from '../../constants/deviceCategory';
import { DEVICE_STATUS } from '../../constants/deviceState';
import { UF } from '../../constants/uf';
import { useTheme } from 'styled-components';
import { GlobalHeader } from '../../components/GlobalHeader';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
export const Home = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, signOut, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cidadesList, setCidadesList] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <GlobalHeader>
        {isAuthenticated ? (
          <>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button
                type="text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '64px',
                  borderRadius: 0,
                  padding: '0 50px 0 24px',
                  marginRight: '-50px',
                }}
              >
                <Avatar
                  size="small"
                  src={user?.foto}
                  style={{ backgroundColor: '#1890ff' }}
                >
                  {user?.nome?.charAt(0)?.toUpperCase() ||
                    user?.name?.charAt(0)?.toUpperCase() ||
                    'U'}
                </Avatar>
                Bem vindo(a) {user.nome}!
                <DownOutlined />
              </Button>
            </Dropdown>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button type="default" onClick={() => navigate('/signup')}>
              Registrar-se
            </Button>
          </>
        )}
      </GlobalHeader>
      <Content style={{ padding: '0 50px', marginTop: 24 }}>
        <div
          style={{
            background: 'linear-gradient(to right, #40a9ff, #1890ff)',
            padding: '40px',
            textAlign: 'center',
            color: 'white',
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <Title level={2} style={{ color: 'white' }}>
            Doe ou Receba Dispositivos Eletrônicos
          </Title>
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Transforme tecnologia em oportunidade
          </Paragraph>
          <Space
            horizontal
            size="middle"
            wrap
            style={{ justifyContent: 'center' }}
          >
            <Input
              placeholder="Buscar notebooks, celulares..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 250 }}
            />
            <Select placeholder="Categoria" style={{ width: 150 }}>
              <Option value="">Todas</Option>
              {DEVICE_CATEGORY.map((categoria) => (
                <Option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </Option>
              ))}
            </Select>
            <Select placeholder="Estado de conservação" style={{ width: 200 }}>
              <Option value="">Todos</Option>
              {DEVICE_STATUS.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="UF"
              style={{ width: 100 }}
              value={selectedUf}
              onChange={handleOnEstadoChange}
            >
              <Option value="">Todos</Option>
              {UF.map((estado) => (
                <Option key={estado.value} value={estado.value}>
                  {estado.label}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Cidade"
              style={{
                width: 150,
                backgroundColor:
                  cidadesList.length === 0
                    ? theme?.colors?.gray?.[100]
                    : theme?.colors?.white,
              }}
              value={selectedCity || undefined}
              onChange={(value) => setSelectedCity(value)}
              disabled={cidadesList.length === 0}
              showSearch
            >
              <Option value="">Todas</Option>
              {cidadesList.map((cidade) => (
                <Option key={cidade.value} value={cidade.value}>
                  {cidade.label}
                </Option>
              ))}
            </Select>
            <Button type="primary" icon={<SearchOutlined />} />
          </Space>
        </div>

        <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
          <Title level={4} style={{ marginBottom: 24 }}>
            Dispositivos Disponíveis
          </Title>
          <Spin
            spinning={loading}
            size="large"
            description="Carregando dispositivos..."
          >
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
              dataSource={devices}
              renderItem={(item) => (
                <List.Item>
                  <DeviceCard device={item} />
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </Content>
    </Layout>
  );
};
