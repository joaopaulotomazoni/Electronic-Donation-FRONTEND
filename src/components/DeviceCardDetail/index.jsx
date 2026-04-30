import { Image, Descriptions, Input, Button, message, Spin } from 'antd';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  DetailContainer,
  HeaderSection,
  DeviceTitle,
  Subtitle,
  ImageGallery,
  StyledImage,
  SectionContainer,
  SectionTitle,
  DescriptionBox,
} from './styles';

const { TextArea } = Input;

export function DeviceCardDetail({ device, onClose }) {
  const [justificativa, setJustificativa] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

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
    <Spin spinning={loading} description="Enviando solicitação..." size="large">
      <DetailContainer>
        <HeaderSection>
          <DeviceTitle level={3}>{device.nome_dispositivo}</DeviceTitle>
          <Subtitle>
            Solicite este dispositivo e justifique sua necessidade
          </Subtitle>
        </HeaderSection>

        <ImageGallery $isSingle={!device.imagens || device.imagens.length <= 1}>
          <Image.PreviewGroup>
            {device.imagens && device.imagens.length > 0 ? (
              device.imagens.map((img, index) => (
                <div key={index} style={{ flexShrink: 0 }}>
                  <StyledImage
                    src={img.url}
                    alt={`Imagem ${index + 1} de ${device.nome_dispositivo}`}
                    width={250}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))
            ) : (
              <div style={{ flexShrink: 0 }}>
                <StyledImage
                  src={
                    'https://via.placeholder.com/250x250/E9ECEF/868E96.png?text=Sem+Imagem'
                  }
                  alt={`Imagem de ${device.nome_dispositivo}`}
                  width={250}
                  height={250}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </Image.PreviewGroup>
        </ImageGallery>

        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Categoria">
            {device.categoria}
          </Descriptions.Item>
          <Descriptions.Item label="Estado">
            {device.estado_conservacao}
          </Descriptions.Item>
          <Descriptions.Item label="Doador" span={2}>
            {device.nome_usuario || 'Não informado'}
          </Descriptions.Item>
          <Descriptions.Item label="Localização" span={2}>
            {device.cidade} - {device.uf}
          </Descriptions.Item>
        </Descriptions>

        <SectionContainer>
          <SectionTitle>Descrição do Dispositivo</SectionTitle>
          <DescriptionBox>
            {device.descricao || 'Nenhuma descrição fornecida.'}
          </DescriptionBox>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Justificativa do Pedido</SectionTitle>
          <TextArea
            placeholder="Explique por que você precisa deste dispositivo e como ele será útil para você..."
            rows={4}
            style={{ resize: 'none', borderRadius: '8px' }}
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />
        </SectionContainer>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <Button size="large" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={sendDeviceRequest}
            style={{ backgroundColor: theme.colors.blue[500] }}
          >
            Enviar Solicitação
          </Button>
        </div>
      </DetailContainer>
    </Spin>
  );
}
