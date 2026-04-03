// import { Header } from "../../components/Header";
// import { Footer } from "../../components/Footer";
import { Container, Content } from "./styles";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Upload,
  List,
  Card,
  Tag,
  Row,
  Col,
  Statistic,
  Space,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { api } from "../../services/api";

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const mockDonations = [
  {
    id: 1,
    name: "Notebook Dell",
    status: "Disponível",
    imageUrl: "https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG",
  },
  {
    id: 2,
    name: "iPhone 11",
    status: "Solicitado",
    imageUrl: "https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG",
  },
  {
    id: 3,
    name: "Tablet Samsung",
    status: "Entregue",
    imageUrl: "https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG",
  },
];

export function TelaDoador() {
  const [donations] = useState(mockDonations);

  const [fileList, setFileList] = useState([]);
  const [registerDevice, setRegisterDevice] = useState({
    name: null,
    category: null,
    conservationState: null,
    description: null,
  });

  const { user } = useAuth();

  // Função auxiliar para converter o arquivo em Base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    // Validação básica manual
    if (
      !registerDevice.name ||
      !registerDevice.category ||
      !registerDevice.conservationState ||
      !registerDevice.description
    ) {
      message.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Converte todas as imagens do fileList para um array de strings Base64
    console.log({ fileList });
    const base64Images = await Promise.all(
      fileList.map((file) => getBase64(file)),
    );

    const payload = {
      ...registerDevice,
      images: base64Images,
    };

    try {
      const response = await api.post(`/${user.id}/device/register`, payload);

      message.success("Doação cadastrada com sucesso!");

      // Limpando o formulário após sucesso
      setRegisterDevice({
        name: null,
        category: null,
        conservationState: null,
        description: null,
      });
      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error("Falha ao cadastrar a doação.");
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList,
    multiple: true,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Disponível":
        return "success";
      case "Solicitado":
        return "warning";
      case "Entregue":
        return "processing";
      default:
        return "default";
    }
  };

  return (
    <>
      <Container>
        <Title level={2} style={{ color: "#343a40", margin: 0 }}>
          Área do Doador
        </Title>
        <Paragraph
          style={{
            color: "#6c757d",
            marginTop: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          Cadastre seus dispositivos e ajude quem precisa
        </Paragraph>

        <Content>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Cadastrar Nova Doação
              </Title>
            }
            style={{ borderRadius: 8, height: "fit-content" }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Nome do Dispositivo <span style={{ color: "#ff4d4f" }}>*</span>
              </label>
              <Input
                size="large"
                placeholder="Ex: Notebook Dell Inspiron 15"
                value={registerDevice.name || ""}
                onChange={(e) =>
                  setRegisterDevice({ ...registerDevice, name: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Categoria <span style={{ color: "#ff4d4f" }}>*</span>
              </label>
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Selecione uma categoria"
                value={registerDevice.category}
                onChange={(value) =>
                  setRegisterDevice({ ...registerDevice, category: value })
                }
                options={[
                  { value: "notebook", label: "notebook" },
                  { value: "smartphone", label: "smartphone" },
                  { value: "tablet", label: "tablet" },
                ]}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Estado de Conservação{" "}
                <span style={{ color: "#ff4d4f" }}>*</span>
              </label>
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Selecione o estado"
                value={registerDevice.conservationState}
                onChange={(value) =>
                  setRegisterDevice({
                    ...registerDevice,
                    conservationState: value,
                  })
                }
                options={[
                  { value: "Novo", label: "Novo" },
                  {
                    value: "Usado - em bom estado",
                    label: "Usado - em bom estado",
                  },
                  {
                    value: "Usado - com defeito",
                    label: "Usado - com defeito",
                  },
                ]}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Descrição <span style={{ color: "#ff4d4f" }}>*</span>
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Descreva o dispositivo, especificações técnicas, acessórios incluídos..."
                value={registerDevice.description || ""}
                onChange={(e) =>
                  setRegisterDevice({
                    ...registerDevice,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Imagens do Dispositivo
              </label>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Clique para fazer upload ou arraste as imagens
                </p>
              </Dragger>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Button type="primary" size="large" onClick={handleSubmit}>
                Cadastrar Doação
              </Button>
            </div>
          </Card>

          <Space
            size="large"
            style={{ display: "flex", direction: "vertical" }}
          >
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Minhas Doações
                </Title>
              }
              style={{ borderRadius: 8, width: 400 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={donations}
                renderItem={(donation) => (
                  <List.Item
                    actions={[
                      <a key="details" href="#">
                        Ver Detalhes
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          src={donation.imageUrl}
                          alt={donation.name}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit: "cover",
                            border: "1px solid #dee2e6",
                          }}
                        />
                      }
                      title={
                        <span style={{ fontWeight: 600 }}>{donation.name}</span>
                      }
                      description={
                        <Tag color={getStatusColor(donation.status)}>
                          {donation.status}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Space>
        </Content>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
