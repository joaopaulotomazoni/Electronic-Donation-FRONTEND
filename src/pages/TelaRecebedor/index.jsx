import { useEffect, useState } from 'react';
import {
  LayoutContainer,
  Container,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  Content,
  StyledCard,
  DeviceImagePreview,
  ListTitle,
} from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Typography, List, Tag, Button, message, Spin, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { DeviceDetailsModal } from '../../components/DeviceDetailsModal';
import { GlobalHeader } from '../../components/GlobalHeader';

const { Title } = Typography;

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
    <LayoutContainer>
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
        <HeaderContainer>
          <PageTitle level={2}>Área do Recebedor</PageTitle>
          <PageSubtitle>
            Acompanhe o status dos dispositivos que você solicitou.
          </PageSubtitle>
        </HeaderContainer>

        <Content>
          <StyledCard
            title={
              <Title level={4} style={{ margin: 0 }}>
                Minhas Solicitações
              </Title>
            }
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
                        <DeviceImagePreview
                          src={
                            item.dispositivos?.imagens &&
                            item.dispositivos.imagens.length > 0
                              ? item.dispositivos.imagens[0].url
                              : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                          }
                          alt={
                            item.dispositivos?.nome_dispositivo || 'Dispositivo'
                          }
                        />
                      }
                      title={
                        <ListTitle>
                          {item.dispositivos?.nome_dispositivo || 'Dispositivo'}
                        </ListTitle>
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
          </StyledCard>
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
    </LayoutContainer>
  );
}
