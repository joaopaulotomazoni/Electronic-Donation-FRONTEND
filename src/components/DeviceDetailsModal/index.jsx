import React from 'react';
import { Image, Descriptions, Tag, Typography } from 'antd';
import {
  ModalContainer,
  ImageGallery,
  StyledImage,
  SectionContainer,
  SectionTitle,
  DescriptionBox,
} from './styles';

const { Text } = Typography;
export function DeviceDetailsModal({ selectedSolicitacao }) {
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
    <ModalContainer>
      <ImageGallery
        $isCentered={
          !selectedSolicitacao.dispositivos?.imagens ||
          selectedSolicitacao.dispositivos.imagens?.length <= 2
        }
      >
        <Image.PreviewGroup>
          {selectedSolicitacao?.dispositivos?.imagens &&
          selectedSolicitacao.dispositivos.imagens?.length > 0 ? (
            selectedSolicitacao.dispositivos.imagens?.map((img, index) => (
              <div key={index} style={{ flexShrink: 0 }}>
                <StyledImage
                  src={img.url}
                  alt={`Imagem ${index + 1} de ${
                    selectedSolicitacao.dispositivos.nome_dispositivo
                  }`}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))
          ) : (
            <div style={{ flexShrink: 0 }}>
              <StyledImage
                src={
                  'https://via.placeholder.com/200x200/E9ECEF/868E96.png?text=Sem+Imagem'
                }
                alt="Sem imagem"
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </Image.PreviewGroup>
      </ImageGallery>

      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Status da Solicitação">
          <Tag color={getStatusColor(selectedSolicitacao.status)}>
            {selectedSolicitacao.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Sua Justificativa">
          {selectedSolicitacao.justificativa || 'Não informada.'}
        </Descriptions.Item>
        <Descriptions.Item label="Categoria do Dispositivo">
          {selectedSolicitacao.dispositivos?.categoria || 'Não informado'}
        </Descriptions.Item>
        <Descriptions.Item label="Estado de Conservação">
          {selectedSolicitacao.dispositivos?.estado_conservacao ||
            'Não informado'}
        </Descriptions.Item>
        <Descriptions.Item label="Doador">
          {selectedSolicitacao.usuarios.nome || 'Não informado'}
        </Descriptions.Item>
      </Descriptions>

      <SectionContainer>
        <SectionTitle>Descrição do Dispositivo</SectionTitle>
        <DescriptionBox>
          <Text>
            {selectedSolicitacao.dispositivos?.descricao ||
              'Nenhuma descrição fornecida.'}
          </Text>
        </DescriptionBox>
      </SectionContainer>
    </ModalContainer>
  );
}
