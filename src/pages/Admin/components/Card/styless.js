import styled from 'styled-components';
import { Layout, Typography, Card } from 'antd';

const { Title, Text } = Typography;

export const LayoutContainer = styled(Layout)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Container = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 2.5rem;
`;

export const PageTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.gray[800]};
    margin: 0;
  }
`;

export const PageSubtitle = styled(Text)`
  display: block;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: 0.5rem;
  font-size: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 220px;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;
