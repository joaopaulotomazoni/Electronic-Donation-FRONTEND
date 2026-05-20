import { List, Button, Tag, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { StyledCard, ListTitle, DeviceImagePreview } from './styles';

const { Title } = Typography;

export const MyDonationsList = ({ devices, showDrawer, loading }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
      case 'Aceito':
        return 'success';
      case 'Pendente':
        return 'processing';
      default:
        return 'default';
    }
  };

  return (
    <StyledCard
      title={
        <Title level={4} style={{ margin: 0 }}>
          Minhas Doações
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
                disabled={donation.status === 'Aceito'}
              >
                Editar
              </Button>,
              <Button
                type="link"
                icon={<MessageOutlined />}
                size="small"
                onClick={() => {
                  const acceptedRequest = donation.solicitacoes?.find(
                    (req) => req.status?.toLowerCase() === 'aceito'
                  );
                  if (acceptedRequest) {
                    navigate(`/chat/${acceptedRequest.id}`, {
                      state: {
                        item: { ...acceptedRequest, dispositivo: donation },
                      },
                    });
                  }
                }}
                disabled={donation.status !== 'Aceito'}
              >
                Chat
              </Button>,
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
