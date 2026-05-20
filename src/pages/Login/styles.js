import styled from 'styled-components';
import { Layout, Typography } from 'antd';

const { Title } = Typography;

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
  padding: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 400px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
`;

export const TitleContainer = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.blue[500]};
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
`;

export const LinkContainer = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[600]};

  a {
    color: ${({ theme }) => theme.colors.blue[500]};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
