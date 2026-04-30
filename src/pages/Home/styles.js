import styled from 'styled-components';
import { Layout, Button, Avatar, Typography, Input, Select } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const LayoutContainer = styled(Layout)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const UserMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 64px;
  border-radius: 0;
  padding: 0 50px 0 24px;
  margin-right: -50px;
`;

export const UserAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.white};
`;

export const LoginButton = styled(Button)`
  font-weight: 500;
`;

export const RegisterButton = styled(Button)`
  font-weight: 500;
  border-radius: 6px;
`;

export const MainContent = styled(Content)`
  padding: 0;
`;

export const HeroSection = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue[500]} 0%,
    ${({ theme }) => theme.colors.blue[800]} 100%
  );
  padding: 80px 20px 120px;
  text-align: center;
`;

export const HeroTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 800;
    margin: 0;
  }
`;

export const HeroSubtitle = styled(Paragraph)`
  && {
    color: rgba(255, 255, 255, 0.85);
    font-size: 18px;
    margin-top: 16px;
  }
`;

export const SearchWrapper = styled.div`
  max-width: 1200px;
  margin: -50px auto 40px;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

export const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchInput = styled(Input)`
  flex: 1 1 200px;
`;

export const SearchSelect = styled(Select)`
  flex: 1 1 150px;
`;

export const UfSelect = styled(Select)`
  flex: 0 1 100px;
`;

export const CitySelect = styled(Select)`
  flex: 1 1 150px;
  .ant-select-selector {
    background-color: ${({ theme, $isDisabled }) =>
      $isDisabled ? theme.colors.gray[100] : 'transparent'} !important;
  }
`;

export const SearchButton = styled(Button)`
  flex: 0 1 auto;
  padding: 0 32px;
  border-radius: 8px;
`;

export const ListWrapper = styled.div`
  width: 100%;
  padding: 0 50px 60px;

  .ant-row {
    display: flex;
    align-items: stretch;
  }
  .ant-list-item {
    height: 100%;
  }
`;

export const SectionTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-bottom: 32px;
  }
`;
