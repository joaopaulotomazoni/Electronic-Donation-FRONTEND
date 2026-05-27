import { List, Button, Tag, Typography } from 'antd';
import { StyledCard, ListTitle, DeviceImagePreview } from './styles';

const { Title } = Typography;

export const MyDonationsList = ({ devices, showDrawer, loading }) => {


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'disponível':
      case 'aceito':
      case 'doado':
        return 'success';
      case 'pendente':
        return 'processing';
      default:
        return 'default';
    }
  };

  return (
    <StyledCard
      title={
        <Title level={4} style={{ margin: 0 }}>
          Todas as Doações
        </Title>
      }
      style={{ width: '100%', minWidth: 400 }}
    >
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={devices}
        renderItem={(donation) => (
          <List.Item
            actions={[
              <Button
                type="link"
                size="small"
                onClick={() => showDrawer(donation)}
                disabled={donation.status?.toLowerCase() === 'doado'}
              >
                Editar
              </Button>
              
            ]}
          >
            <List.Item.Meta
              avatar={
                <DeviceImagePreview
                  src={
                    donation.imagens && donation.imagens.length > 0
                      ? donation.imagens[0].url
                      : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                  }
                  alt={donation.nome_dispositivo}
                />
              }
              title={<ListTitle>{donation.nome_dispositivo}</ListTitle>}
              description={
                <Tag color={getStatusColor(donation.status)}>
                  {donation.status}
                </Tag>
              }
            />
          </List.Item>
        )}
      />
    </StyledCard>
  );
};
