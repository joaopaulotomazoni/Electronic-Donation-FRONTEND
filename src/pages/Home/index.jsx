import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { DeviceCard } from "../../components/DeviceCard";
import { useAuth } from "../../hooks/useAuth";
import { Layout, Button, Input, Select, Typography, Space, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
export const Home = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, signOut } = useAuth();

  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login");
  }

  useEffect(() => {
    async function fetchDevices() {
      try {
        const response = await api.get("/devices");
        setDevices(response.data);
      } catch (error) {
        console.log("Erro ao buscar dispositivos", error);
        setDevices([
          {
            id: 1,
            name: "Notebook Dell Inspiron",
            url: "https://via.placeholder.com/150",
            description:
              "sLKIJFbskjdhfbksUDBFlsikjudgbflsdjkfblisjhdgbfklsjdfhçlskidjgfksjdfçskjdifghslkidhgfblsdikjufhgdsiklhfgbskdjhfgbslkdjhfbg",
            category: "Eletrônicos",
            categoryDescription:
              "Dispositivos eletrônicos como notebooks, celulares e tablets",
            usage: "Usado - Bom estado",
            donor: "Maria Silva",
          },
          {
            id: 2,
            name: "Smartphone Samsung Galaxy A30",
            url: "https://via.placeholder.com/150",
            description:
              "Smartphone em bom estado geral, tela sem trincos, bateria durando um dia inteiro. Ideal para uso básico e redes sociais.",
            category: "Eletrônicos",
            categoryDescription:
              "Dispositivos eletrônicos como notebooks, celulares e tablets",
            usage: "Usado - Pequenos arranhões",
            donor: "João Pereira",
          },
          {
            id: 3,
            name: "Tablet Lenovo Tab M10",
            url: "https://via.placeholder.com/150",
            description:
              "Tablet seminovo, pouco uso. Acompanha capa protetora e carregador original. Ótimo para estudos e leitura.",
            category: "Eletrônicos",
            categoryDescription:
              "Dispositivos eletrônicos como notebooks, celulares e tablets",
            usage: "Seminovo",
            donor: "Ana Souza",
          },
          {
            id: 4,
            name: "Monitor LG 22 Polegadas",
            url: "https://via.placeholder.com/150",
            description:
              "Monitor com resolução Full HD. Apresenta excelente fidelidade de cores, sem dead pixels. Conexões HDMI e VGA.",
            category: "Periféricos",
            categoryDescription: "Acessórios e componentes para computadores",
            usage: "Usado - Funcionando perfeitamente",
            donor: "Carlos Mendes",
          },
          {
            id: 5,
            name: "Teclado Mecânico Redragon",
            url: "https://via.placeholder.com/150",
            description:
              "Teclado mecânico com switches azuis, iluminação RGB funcionando perfeitamente. Ótimo para digitação rápida.",
            category: "Periféricos",
            categoryDescription: "Acessórios e componentes para computadores",
            usage: "Seminovo",
            donor: "Fernanda Lima",
          },
          {
            id: 6,
            name: "Mouse Logitech M170",
            url: "https://via.placeholder.com/150",
            description:
              "Mouse sem fio básico, compacto e muito prático para uso no dia a dia. Pilha dura bastante.",
            category: "Periféricos",
            categoryDescription: "Acessórios e componentes para computadores",
            usage: "Usado - Bom estado",
            donor: "Lucas Oliveira",
          },
          {
            id: 7,
            name: "Impressora HP Deskjet",
            url: "https://via.placeholder.com/150",
            description:
              "Impressora multifuncional (imprime, copia e escaneia). Está funcionando, mas precisa da troca dos cartuchos de tinta.",
            category: "Equipamentos",
            categoryDescription: "Equipamentos de escritório e informática",
            usage: "Usado - Precisa trocar cartucho",
            donor: "Patricia Costa",
          },
          {
            id: 8,
            name: "Roteador TP-Link",
            url: "https://via.placeholder.com/150",
            description:
              "Roteador Wireless N 300Mbps, ideal para tarefas diárias como navegação, e-mails e streaming de vídeo.",
            category: "Redes",
            categoryDescription: "Equipamentos de conectividade e redes",
            usage: "Seminovo",
            donor: "Rafael Martins",
          },
          {
            id: 9,
            name: "HD Externo Seagate 1TB",
            url: "https://via.placeholder.com/150",
            description:
              "HD externo de 1TB, formatado e sem bad blocks. Excelente para backup de arquivos importantes.",
            category: "Armazenamento",
            categoryDescription: "Dispositivos para armazenamento de dados",
            usage: "Usado - Bom estado",
            donor: "Juliana Rocha",
          },
          {
            id: 10,
            name: "Webcam Logitech C270",
            url: "https://via.placeholder.com/150",
            description:
              "Webcam HD 720p com microfone embutido de redução de ruídos. Perfeita para videochamadas e aulas online.",
            category: "Periféricos",
            categoryDescription: "Acessórios e componentes para computadores",
            usage: "Seminovo",
            donor: "Bruno Alves",
          },
        ]);
      }
    }

    fetchDevices();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "0 50px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
          Electronic Donation
        </Title>
        <Space>
          <Button onClick={() => navigate("/doador")}>Doar</Button>
          <Button onClick={() => alert("Solicitar")}>Solicitar</Button>
          {isAuthenticated ? (
            <Button type="primary" danger onClick={handleSignOut}>
              Sair
            </Button>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Entrar
            </Button>
          )}
        </Space>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 24 }}>
        <div
          style={{
            background: "linear-gradient(to right, #40a9ff, #1890ff)",
            padding: "40px",
            textAlign: "center",
            color: "white",
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <Title level={2} style={{ color: "white" }}>
            Doe ou Receba Dispositivos Eletrônicos
          </Title>
          <Paragraph style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Transforme tecnologia em oportunidade
          </Paragraph>
          <Space
            direction="horizontal"
            size="middle"
            wrap
            style={{ justifyContent: "center" }}
          >
            <Input
              placeholder="Buscar notebooks, celulares..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 250 }}
            />
            <Select placeholder="Categoria" style={{ width: 150 }}>
              <Option value="">Todas</Option>
            </Select>
            <Select placeholder="Estado" style={{ width: 150 }}>
              <Option value="">Todos</Option>
            </Select>
            <Button type="primary" icon={<SearchOutlined />} />
          </Space>
        </div>

        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
          <Title level={4} style={{ marginBottom: 24 }}>
            Dispositivos Disponíveis
          </Title>
          <List
            grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
            dataSource={devices}
            renderItem={(item) => (
              <List.Item>
                <DeviceCard device={item} />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
};
