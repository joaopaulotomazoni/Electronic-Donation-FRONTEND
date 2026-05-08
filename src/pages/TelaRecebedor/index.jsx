import { useEffect, useState } from 'react';
import {
  LayoutContainer,
  Container,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  Content,
} from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, message, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { DeviceDetailsModal } from '../../components/DeviceDetailsModal';
import { GlobalHeader } from '../../components/GlobalHeader';
import { MyRequestsList } from './components/MyRequestsList';

export function TelaRecebedor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);

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
          <MyRequestsList 
            requests={solicitacoes} 
            showModal={setSelectedSolicitacao} 
            loading={loading} 
          />
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
