import { List, Tag, Button, Spin, Typography } from 'antd';
import { StyledCard, ListTitle, DeviceImagePreview } from './styles';

const { Title } = Typography;

export const MyRequestsList = ({ requests, showModal, loading }) => {
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

  return (
    <StyledCard
      title={<Title level={4} style={{ margin: 0 }}>Minhas Solicitações</Title>}
    >
      <Spin spinning={loading} size="large" description="Carregando solicitações...">
        <List
          itemLayout="horizontal"
          dataSource={requests}
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
                    alt={item.dispositivos?.nome_dispositivo || 'Dispositivo'}
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
  );
};
