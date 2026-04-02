import { Card, Button, Modal, Typography } from "antd";
import { useState } from "react";
import { DeviceCardDetail } from "../DeviceCardDetail";

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
        style={{ width: "100%" }}
        cover={
          <img
            alt={device.name}
            src={device.url}
            style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
          />
        }
        actions={[
          <Button type="primary" onClick={showModal} key="details">
            Ver detalhes
          </Button>,
        ]}
      >
        <Meta
          title={device.name}
          description={
            <>
              <Text type="secondary">{device.category}</Text>
              <br />
              <Text>{device.usage}</Text>
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
