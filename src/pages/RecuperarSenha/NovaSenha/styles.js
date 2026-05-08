import styled from 'styled-components';
import { Layout, Typography } from 'antd';

const { Title, Text } = Typography;

export const LayoutContainer = styled(Layout)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: 2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 400px;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const TitleContainer = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.blue[500]};
    margin-bottom: 4px;
  }
`;

export const Subtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.gray[500]};
`;
