import { Typography, Space } from 'antd';
import { Container, HeaderContainer, TitleContainer } from './styles';

export function GlobalHeader({ children }) {
  return (
    <HeaderContainer>
      <TitleContainer level={3}>Electronic Donation</TitleContainer>
      <Container>{children}</Container>
    </HeaderContainer>
  );
}
