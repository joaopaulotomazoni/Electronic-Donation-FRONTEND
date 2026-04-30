import React from 'react';
import { Image, Descriptions, Space, Tag, Typography } from 'antd';

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
    <Space vertical size="large" style={{ width: '100%', display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '8px 0',
          justifyContent:
            selectedSolicitacao.dispositivos?.imagens?.length > 2
              ? 'flex-start'
              : 'center',
        }}
      >
        <Image.PreviewGroup>
          {selectedSolicitacao?.dispositivos?.imagens &&
          selectedSolicitacao.dispositivos.imagens?.length > 0 ? (
            selectedSolicitacao.dispositivos.imagens?.map((img, index) => (
              <div key={index} style={{ flexShrink: 0 }}>
                <Image
                  src={img.url}
                  alt={`Imagem ${index + 1} de ${
                    selectedSolicitacao.dispositivos.nome_dispositivo
                  }`}
                  style={{
                    width: 200,
                    height: 200,
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
                  'https://via.placeholder.com/200x200/E9ECEF/868E96.png?text=Sem+Imagem'
                }
                alt="Sem imagem"
                style={{
                  width: 200,
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </div>
          )}
        </Image.PreviewGroup>
      </div>

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
          <Text>
            {selectedSolicitacao.dispositivos?.descricao ||
              'Nenhuma descrição fornecida.'}
          </Text>
        </div>
      </Space>
    </Space>
  );
}
