import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Container,
  FormContainer,
  InputGroup,
  Button,
  LinkContainer,
} from './styles';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Spin } from 'antd';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.data.userData && response.data.token) {
        signIn(response.data.userData, response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Falha no login:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Spin spinning={loading} size="large">
        <FormContainer>
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
          <Button onClick={handleSubmit} disabled={loading}>
            Login
          </Button>
          <LinkContainer>
            Não possui conta? <Link to="/signup">Criar conta</Link>
          </LinkContainer>
        </FormContainer>
      </Spin>
    </Container>
  );
};
