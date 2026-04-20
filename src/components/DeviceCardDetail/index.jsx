import {
  Typography,
  Image,
  Descriptions,
  Input,
  Button,
  Space,
  message,
  Spin,
} from 'antd';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

export function DeviceCardDetail({ device, onClose }) {
  const [justificativa, setJustificativa] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function sendDeviceRequest() {
    if (!user) {
      message.warning(
        'Você precisa estar logado para solicitar um dispositivo.'
      );
      return;
    }

    try {
      setLoading(true);
      await api.post(`/${user.id}/${device.id}/device-request`, {
        justificativa,
      });
      message.success('Solicitação enviada com sucesso!');
      onClose();
    } catch (error) {
      console.error(error);
      message.error('Erro ao enviar solicitação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Spin spinning={loading} description="Enviando solicitação...">
      <Space vertical size="middle" style={{ width: '100%', display: 'flex' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {device.nome_dispositivo}
          </Title>
          <Text type="secondary">
            Solicite este dispositivo e justifique sua necessidade
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '8px',
            justifyContent:
              device.imagens && device.imagens.length > 1
                ? 'flex-start'
                : 'center',
          }}
        >
          <Image.PreviewGroup>
            {device.imagens && device.imagens.length > 0 ? (
              device.imagens.map((img, index) => (
                <div key={index} style={{ flexShrink: 0 }}>
                  <Image
                    src={img.url}
                    alt={`Imagem ${index + 1} de ${device.nome_dispositivo}`}
                    style={{
                      width: 250,
                      height: 250,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                </div>
              ))
            ) : (
              <div style={{ flexShrink: 0 }}>
                <Image
                  src={
                    'https://via.placeholder.com/250x250/E9ECEF/868E96.png?text=Sem+Imagem'
                  }
                  alt={`Imagem de ${device.nome_dispositivo}`}
                  style={{
                    width: 250,
                    height: 250,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </div>
            )}
          </Image.PreviewGroup>
        </div>

        <Descriptions
          bordered
          column={2}
          size="small"
          style={{ tableLayout: 'fixed' }}
        >
          <Descriptions.Item label="Categoria">
            {device.categoria}
          </Descriptions.Item>
          <Descriptions.Item label="Estado">
            {device.estado_conservacao}
          </Descriptions.Item>
          <Descriptions.Item label="Doador" span={2}>
            {device.nome_usuario || 'Não informado'}
          </Descriptions.Item>
        </Descriptions>

        <Space vertical size="small" style={{ width: '100%' }}>
          <Text strong>Descrição do Dispositivo</Text>
          <div
            style={{
              minHeight: '80px',
              maxHeight: '120px',
              overflowY: 'auto',
              padding: '12px',
              backgroundColor: '#fafafa',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
            }}
          >
            <Text>{device.descricao || 'Nenhuma descrição fornecida.'}</Text>
          </div>
        </Space>

        <Space vertical size="small" style={{ width: '100%' }}>
          <Text strong>Justificativa do Pedido</Text>
          <TextArea
            placeholder="Explique por que você precisa deste dispositivo e como ele será útil para você..."
            rows={4}
            style={{ resize: 'none' }}
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />
        </Space>

        <Space
          style={{ width: '100%', justifyContent: 'flex-end', marginTop: 8 }}
        >
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={sendDeviceRequest}>
            Enviar Solicitação
          </Button>
        </Space>
      </Space>
    </Spin>
  );
}
