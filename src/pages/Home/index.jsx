import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

import {
  Container,
  Header,
  Banner,
  Search,
  Grid,
  Card,
  Button,
  InputGroup,
  SectionTitle,
} from "./styles";
import { useAuth } from "../../hooks/useAuth";

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
            description: "Notebook • Usado",
            image: "a",
          },
          {
            id: 2,
            name: "iPhone 11",
            description: "Smartphone • Usado",
            image: "a",
          },
        ]);
      }
    }

    fetchDevices();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Electronic Donation</h1>
        <div className="header-actions">
          <Button className="outline" onClick={() => alert("Doar")}>
            Doar
          </Button>
          <Button className="outline" onClick={() => alert("Solicitar")}>
            Solicitar
          </Button>
          {isAuthenticated ? (
            <Button onClick={handleSignOut}>Sair</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Entrar</Button>
          )}
        </div>
      </Header>

      <Banner>
        <h2>Doe ou Receba Dispositivos Eletrônicos</h2>
        <p>Transforme tecnologia em oportunidade</p>

        <Search>
          <InputGroup>
            <label htmlFor="searchTerm">Buscar</label>
            <input
              id="searchTerm"
              placeholder="Buscar notebooks, celulares..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar dispositivos"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="category">Categoria</label>
            <select id="category">
              <option value="">Categoria</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label htmlFor="state">Estado</label>
            <select id="state">
              <option value="">Estado</option>
            </select>
          </InputGroup>

          <Button
            style={{ width: "auto", marginTop: 0, alignSelf: "flex-end" }}
          >
            🔍
          </Button>
        </Search>
      </Banner>

      <SectionTitle>Dispositivos Disponíveis</SectionTitle>

      <Grid>
        {devices.map((item) => (
          <Card key={item.id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <Button>Solicitar Doação</Button>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
