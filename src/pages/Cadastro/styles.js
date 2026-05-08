import styled from 'styled-components';
import { Layout, Typography, Button, Input, Select } from 'antd';

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
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.01),
    0 20px 48px rgba(0, 0, 0, 0.01);
  width: 100%;
  max-width: 500px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  flex: ${({ $weight }) => $weight || 'auto'};
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledPassword = styled(Input.Password)`
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledSelect = styled(Select)`
  flex: ${({ $weight }) => $weight || 'auto'};
`;

export const SubmitButton = styled(Button)`
  && {
    margin-top: 0.5rem;
    background-color: ${({ theme }) => theme.colors.blue[500]};
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
