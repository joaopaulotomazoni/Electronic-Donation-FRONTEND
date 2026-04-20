import { useEffect, useState } from 'react';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  Card,
  Tag,
  Button,
  Layout,
  message,
  Spin,
  Modal,
  Image,
  Descriptions,
  Space,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { DeviceDetailsModal } from '../../components/DeviceDetailsModal';

const { Title, Paragraph, Text } = Typography;
const { Header } = Layout;

export function TelaRecebedor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'warning';
      case 'aceito':
        return 'success';
      case 'rejeitado':
        return 'error';
      default:
        return 'default';
    }
  };

  const showModal = (item) => {
    setSelectedSolicitacao(item);
  };

  const handleCloseModal = () => {
    setSelectedSolicitacao(null);
  };

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/${user.id}/requests`);

        setSolicitacoes(response.data);
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
        message.error('Não foi possível carregar suas solicitações.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchSolicitacoes();
  }, [user]);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
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
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{ border: 0, boxShadow: 'none' }}
        >
          Voltar para Home
        </Button>
      </Header>
      <Container>
        <Title level={2} style={{ color: '#343a40', margin: 0 }}>
          Área do Recebedor
        </Title>
        <Paragraph
          style={{
            color: '#6c757d',
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          Acompanhe o status dos dispositivos que você solicitou.
        </Paragraph>

        <Content>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Minhas Solicitações
              </Title>
            }
            style={{ borderRadius: 8 }}
          >
            <Spin
              spinning={loading}
              size="large"
              description="Carregando solicitações..."
            >
              <List
                itemLayout="horizontal"
                dataSource={solicitacoes}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={
                            item.dispositivos?.imagens &&
                            item.dispositivos.imagens.length > 0
                              ? item.dispositivos.imagens[0].url
                              : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                          }
                          alt={
                            item.dispositivos?.nome_dispositivo || 'Dispositivo'
                          }
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit: 'cover',
                            border: '1px solid #dee2e6',
                          }}
                        />
                      }
                      title={
                        <span style={{ fontWeight: 600 }}>
                          {item.dispositivos?.nome_dispositivo || 'Dispositivo'}
                        </span>
                      }
                      description={
                        <Tag color={getStatusColor(item.status)}>
                          {item.status || 'Pendente'}
                        </Tag>
                      }
                    />
                    <Button type="primary" onClick={() => showModal(item)}>
                      Ver detalhes
                    </Button>
                  </List.Item>
                )}
              />
            </Spin>
          </Card>
        </Content>
        {selectedSolicitacao && (
          <Modal
            title={
              selectedSolicitacao.dispositivos?.nome_dispositivo ||
              'Detalhes da Solicitação'
            }
            open={!!selectedSolicitacao}
            onCancel={handleCloseModal}
            footer={[
              <Button key="close" onClick={handleCloseModal}>
                Fechar
              </Button>,
            ]}
            width={800}
          >
            <DeviceDetailsModal selectedSolicitacao={selectedSolicitacao} />
          </Modal>
        )}
      </Container>
    </Layout>
  );
}
