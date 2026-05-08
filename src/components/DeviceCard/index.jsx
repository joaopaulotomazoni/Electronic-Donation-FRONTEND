import { Modal } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DeviceCardDetail } from '../DeviceCardDetail';
import {
  StyledCard,
  DeviceImage,
  TagsContainer,
  LocationContainer,
  ActionButton,
  DeviceTitle,
  CategoryTag,
  StateTag,
  LocationText,
} from './styles';

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
      <StyledCard
        hoverable
        cover={
          <DeviceImage
            alt={device.nome_dispositivo}
            src={
              device.imagens?.[0]?.url ||
              'https://via.placeholder.com/300x200/E9ECEF/868E96.png?text=Sem+Imagem'
            }
          />
        }
        actions={[
          <ActionButton type="primary" onClick={showModal} key="details">
            Ver detalhes
          </ActionButton>,
        ]}
      >
        <DeviceTitle
          level={5}
          ellipsis={{ rows: 1, tooltip: device.nome_dispositivo }}
        >
          {device.nome_dispositivo}
        </DeviceTitle>

        <TagsContainer>
          <CategoryTag>{device.categoria}</CategoryTag>
          <StateTag>{device.estado_conservacao}</StateTag>
        </TagsContainer>

        <LocationContainer>
          <EnvironmentOutlined />
          <LocationText type="secondary">
            {device.cidade} - {device.uf}
          </LocationText>
        </LocationContainer>
      </StyledCard>

      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={800}
        centered
      >
        <DeviceCardDetail device={device} onClose={handleClose} />
      </Modal>
    </>
  );
}
