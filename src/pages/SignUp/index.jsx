import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import {
  Container,
  FormContainer,
  InputGroup,
  Button,
  LinkContainer,
} from "./styles";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.userData && response.data.token) {
        signIn(response.data.userData, response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error(
        "Falha no cadastro:",
        error.response?.data || error.message,
      );
    }
  }

  return (
    <Container>
      <FormContainer>
        <h2>Criar Conta</h2>
        <InputGroup>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Confirmar senha</label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleSubmit}>Cadastrar</Button>
        <LinkContainer>
          Já possui conta? <Link to="/login">Fazer login</Link>
        </LinkContainer>
      </FormContainer>
    </Container>
  );
};
