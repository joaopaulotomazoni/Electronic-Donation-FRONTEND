import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Container, Form, InputGroup, Button } from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data.userData && response.data.token) {
        signIn(response.data.userData, response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Falha no login:", error.response?.data || error.message);
    }
  }

  return (
    <Container>
      <Form>
        <h2>Login</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleSubmit}>Login</Button>
      </Form>
    </Container>
  );
};
