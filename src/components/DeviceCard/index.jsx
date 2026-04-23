import { Card, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { DeviceCardDetail } from '../DeviceCardDetail';

const { Meta } = Card;
const { Text } = Typography;

export function DeviceCard({ device }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={
          <img
            alt={device.nome_dispositivo}
            src={
              device.imagens?.[0]?.url ||
              'https://via.placeholder.com/300x200/E9ECEF/868E96.png?text=Sem+Imagem'
            }
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        }
        actions={[
          <Button type="primary" onClick={showModal} key="details">
            Ver detalhes
          </Button>,
        ]}
      >
        <Meta
          title={device.nome_dispositivo}
          description={
            <>
              <Text type="secondary">{device.categoria}</Text>
              <br />
              <Text>{device.estado_conservacao}</Text>
              <br />
              <Text>
                {device.cidade} - {device.uf}
              </Text>
            </>
          }
        />
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={800}
      >
        <DeviceCardDetail device={device} onClose={handleClose} />
      </Modal>
    </>
  );
}
