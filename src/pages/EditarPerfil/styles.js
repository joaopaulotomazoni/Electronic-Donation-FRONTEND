import styled from 'styled-components';
import { Layout, Typography, Button } from 'antd';

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

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.01),
    0 20px 48px rgba(0, 0, 0, 0.01);
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .ant-form-item-label > label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const PageTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.blue[500]};
    margin-bottom: 4px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const AvatarIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .anticon {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`;

export const AvatarText = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const SubmitButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue[500]};
  }
`;
