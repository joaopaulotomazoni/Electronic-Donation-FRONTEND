import styled from 'styled-components';
import { Layout, Button, Avatar, Typography, Input, Select } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const LayoutContainer = styled(Layout)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const MainContent = styled(Content)`
  padding: 0;
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
