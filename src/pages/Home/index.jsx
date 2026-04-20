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
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
export const Home = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, signOut, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  useEffect(() => {
    async function fetchDevices() {
      try {
        setLoading(true);
        const response = await api.get('/avaible-devices', {
          params: {
            userId: user?.id,
          },
        });

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
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '0 50px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
          Electronic Donation
        </Title>
        <Space>
          {isAuthenticated && (
            <>
              <Button onClick={() => navigate('/doador')}>
                Tela do doador
              </Button>
              <Button onClick={() => navigate('/recebedor')}>
                Tela do recebedor
              </Button>
            </>
          )}
          {isAuthenticated ? (
            <Button type="primary" danger onClick={handleSignOut}>
              Sair
            </Button>
          ) : (
            <Button type="primary" onClick={() => navigate('/login')}>
              Entrar
            </Button>
          )}
        </Space>
      </Header>
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
            </Select>
            <Select placeholder="Estado" style={{ width: 150 }}>
              <Option value="">Todos</Option>
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
