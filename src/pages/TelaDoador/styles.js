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
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const FormRow = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.red[500]};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const DeviceImagePreview = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const ListTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  strong {
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;
