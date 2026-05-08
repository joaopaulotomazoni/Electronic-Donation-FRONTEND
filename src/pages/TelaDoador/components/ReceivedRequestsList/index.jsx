import { List, Button, Typography } from 'antd';
import { StyledCard, ListTitle, InfoText } from './styles';

const { Title } = Typography;

export const ReceivedRequestsList = ({ requests, handleUpdateStatus, loading }) => {
  return (
    <StyledCard
      title={<Title level={4} style={{ margin: 0 }}>Solicitações Recebidas</Title>}
      style={{ width: '100%', minWidth: 400 }}
    >
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(req) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                size="small"
                onClick={() => handleUpdateStatus(req.id_dispositivo, 'aceito')}
              >
                Aceitar
              </Button>,
              <Button
                danger
                size="small"
                onClick={() => handleUpdateStatus(req.id_dispositivo, 'rejeitado')}
              >
                Rejeitar
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <ListTitle>
                  {req.dispositivo?.nome_dispositivo || 'Dispositivo Solicitado'}
                </ListTitle>
              }
              description={
                <>
                  <InfoText>
                    <strong>Justificativa:</strong> {req.justificativa || 'Não informada.'}
                  </InfoText>
                  <InfoText>
                    <strong>Status:</strong> {req.status || 'Pendente'}
                  </InfoText>
                </>
              }
            />
          </List.Item>
        )}
      />
    </StyledCard>
  );
};
