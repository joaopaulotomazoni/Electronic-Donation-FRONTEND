// import { Header } from "../../components/Header"; 
// import { Footer } from "../../components/Footer"; 
import {
  Container,
  Content,
  DonationFormSection,
  MyDonationsSection,
  Title,
  Subtitle,
  Form,
  InputGroup,
  ImageUpload,
  SubmitButton,
  DonationsList,
  DonationCard,
  DonationInfo,
  DonationStatus,
  ImpactCard,
  ImpactStats,
  Stat,
} from "./styles";
import { useState } from "react";
// import { AuthContext } from "../../context/AuthContext";

// Dados de exemplo para demonstração
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

const mockStats = {
  donatedDevices: 3,
  peopleHelped: 2,
};

export function TelaDoador() {
  // const { user } = useContext(AuthContext) || {}; // Comentado para rodar sem o contexto
  const [donations] = useState(mockDonations);
  const [stats] = useState(mockStats);

  // State para o formulário
  const [deviceName, setDeviceName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   if (user) {
  //     api.get(`/donations/user/${user.id}`).then(response => setDonations(response.data));
  //     api.get(`/stats/user/${user.id}`).then(response => setStats(response.data));
  //   }
  // }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de submissão do formulário aqui
    console.log({ deviceName, category, condition, description, image });
    alert("Doação cadastrada com sucesso! (simulação)");
  };

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Title>Área do Doador</Title>
        <Subtitle>Cadastre seus dispositivos e ajude quem precisa</Subtitle>

        <Content>
          <DonationFormSection>
            <h3>Cadastrar Nova Doação</h3>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <label htmlFor="deviceName">Nome do Dispositivo</label>
                <input type="text" id="deviceName" placeholder="Ex: Notebook Dell Inspiron 15" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} required />
              </InputGroup>
              <InputGroup>
                <label htmlFor="category">Categoria</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Selecione uma categoria</option>
                  <option value="notebook">Notebook</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label htmlFor="condition">Estado de Conservação</label>
                <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} required>
                  <option value="">Selecione o estado</option>
                  <option value="new">Novo</option>
                  <option value="used_good">Usado - em bom estado</option>
                  <option value="used_defect">Usado - com defeito</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label htmlFor="description">Descrição</label>
                <textarea id="description" placeholder="Descreva o dispositivo, especificações técnicas, acessórios incluídos..." value={description} onChange={(e) => setDescription(e.target.value)} required />
              </InputGroup>
              <InputGroup>
                <label>Imagem do Dispositivo</label>
                <ImageUpload>
                  {image ? (
                    <p style={{ color: '#007bff', fontWeight: '500' }}>Arquivo selecionado: {image.name}</p>
                  ) : (
                    <p>Clique para fazer upload ou arraste a imagem</p>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </ImageUpload>
              </InputGroup>
              <SubmitButton type="submit">Cadastrar Doação</SubmitButton>
            </Form>
          </DonationFormSection>

          <MyDonationsSection>
            <DonationsList>
              <h3>Minhas Doações</h3>
              {donations.map((donation) => (
                <DonationCard key={donation.id}>
                  <img src={donation.imageUrl} alt={donation.name} />
                  <DonationInfo>
                    <h4>{donation.name}</h4>
                    <DonationStatus status={donation.status}>
                      {donation.status}
                    </DonationStatus>
                  </DonationInfo>
                  <a href="#">Ver Detalhes</a>
                </DonationCard>
              ))}
            </DonationsList>

            <ImpactCard>
              <h3>Impacto das suas doações</h3>
              <ImpactStats>
                <Stat>
                  <strong>{stats.donatedDevices}</strong>
                  <span>Dispositivos doados</span>
                </Stat>
                <Stat>
                  <strong>{stats.peopleHelped}</strong>
                  <span>Pessoas ajudadas</span>
                </Stat>
              </ImpactStats>
            </ImpactCard>
          </MyDonationsSection>
        </Content>
      </Container>
      {/* <Footer /> */}
    </>
  );
}