import { Typography, Image, Descriptions, Input, Button, Space } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

export function DeviceCardDetail({ device, onClose }) {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }}>
      <div>
        <Title level={3} style={{ margin: 0 }}>
          {device.name}
        </Title>
        <Text type="secondary">
          Solicite este dispositivo e justifique sua necessidade
        </Text>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Image
          src={device.url}
          alt={`Imagem de ${device.name}`}
          style={{ width: 300, height: 300, objectFit: "cover", borderRadius: 8 }}
        />
      </div>

      <Descriptions bordered column={2} size="small" style={{ tableLayout: "fixed" }}>
        <Descriptions.Item label="Categoria">{device.category}</Descriptions.Item>
        <Descriptions.Item label="Estado">{device.usage}</Descriptions.Item>
        <Descriptions.Item label="Doador" span={2}>{device.donor}</Descriptions.Item>
      </Descriptions>

      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Text strong>Descrição do Dispositivo</Text>
        <div
          style={{
            minHeight: "80px",
            maxHeight: "120px",
            overflowY: "auto",
            padding: "12px",
            backgroundColor: "#fafafa",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
          }}
        >
          <Text>{device.description || "Nenhuma descrição fornecida."}</Text>
        </div>
      </Space>

      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Text strong>Justificativa do Pedido</Text>
        <TextArea
          placeholder="Explique por que você precisa deste dispositivo e como ele será útil para você..."
          rows={4}
          style={{ resize: "none" }}
        />
      </Space>

      <Space style={{ width: "100%", justifyContent: "flex-end", marginTop: 8 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="primary">Enviar Solicitação</Button>
      </Space>
    </Space>
  );
}