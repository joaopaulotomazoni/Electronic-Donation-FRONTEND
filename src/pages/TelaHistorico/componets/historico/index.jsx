import React, { useState, useEffect } from 'react';
import { List, Tag, Button, Spin, message, Modal, Typography, Tabs } from 'antd';
import { api } from '../../../../services/api';
import { useAuth } from '../../../../hooks/useAuth';
import { DeviceDetailsModal } from '../../../../components/DeviceDetailsModal';
import { StyledCard, StyledListItem, DeviceImagePreview, ListTitle } from './styles';

const { Title } = Typography;

export function HistoricoList() {
  const [minhasSolicitacoes, setMinhasSolicitacoes] = useState([]);
  const [dispositivosDoados, setDispositivosDoados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchHistorico() {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const [requestsRes, receivedRes] = await Promise.all([
          api.get(`/${user.id}/requests`),
          api.get(`/${user.id}/devices`)
        ]);
        setMinhasSolicitacoes(requestsRes.data);
        setDispositivosDoados(receivedRes.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        message.error('Não foi possível carregar o histórico de dispositivos.');
      } finally {
        setLoading(false);
      }
    }
    fetchHistorico();
}, [user]);



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

  const handleCloseModal = () => {
    setSelectedSolicitacao(null);
  };

  const renderList = (data) => (
    <List
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        pageSize: 5,
        position: 'bottom',
        align: 'center',
      }}
      locale={{ emptyText: 'Nenhum histórico encontrado.' }}
      renderItem={(item) => {
        const isDeviceDirect = !item.dispositivos;
        const device = isDeviceDirect ? item : item.dispositivos;
        const status = item.status || 'Registrado/Doado';

        return (
          <StyledListItem
          actions={[
            <Button type="primary" onClick={() => {
              // Se for um dispositivo direto, adaptamos o formato para o Modal não quebrar
              if (isDeviceDirect) {
                setSelectedSolicitacao({
                  status: status,
                  dispositivos: device,
                  usuarios: user, // Você é o doador neste caso
                  justificativa: 'Dispositivo cadastrado por você para doação.'
                });
              } else {
                setSelectedSolicitacao(item);
              }
            }}>
              Ver detalhes
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={
              <DeviceImagePreview
                src={
                  device?.imagens && device.imagens.length > 0
                    ? device.imagens[0].url
                    : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                }
                alt={device?.nome_dispositivo || 'Dispositivo'}
              />
            }
            title={
              <ListTitle>
                {device?.nome_dispositivo || 'Dispositivo'}
              </ListTitle>
            }
            description={
              <div style={{ marginTop: '8px' }}>
                <Tag color={getStatusColor(status)}>
                  {status.toUpperCase()}
                </Tag>
                <span style={{ marginLeft: '8px' }}>
                  Categoria: {device?.categoria || 'N/A'}
                </span>
                {(item.created_at || device?.created_at) && (
                  <span style={{ marginLeft: '8px', color: 'gray' }}>
                    • Data: {new Date(item.created_at || device.created_at).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            }
          />
        </StyledListItem>
        );
      }}
    />
  );

  return (
    <StyledCard
      title={<Title level={4} style={{ margin: 0 }}>Meu Histórico</Title>}
    >
      <Spin spinning={loading} size="large" description="Carregando histórico...">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Solicitações Enviadas',
              children: renderList(minhasSolicitacoes),
            },
            {
              key: '2',
              label: 'Dispositivos Doados / Cadastrados',
              children: renderList(dispositivosDoados),
            },
          ]}
        />
      </Spin>

      <Modal
        title={selectedSolicitacao?.dispositivos?.nome_dispositivo || 'Detalhes da Solicitação'}
        open={!!selectedSolicitacao}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Fechar
          </Button>,
        ]}
        width={800}
      >
        {selectedSolicitacao && (
          <DeviceDetailsModal selectedSolicitacao={selectedSolicitacao} />
        )}
      </Modal>
    </StyledCard>
  );
}
