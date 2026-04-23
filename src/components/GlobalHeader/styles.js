import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
const { Header } = Layout;

export const HeaderContainer = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0 50px;
  border-bottom: 1px solid #f0f0f0;
  height: 80px;
`;

export const TitleContainer = styled(Title)`
  && {
    margin: 0;
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`;
export const Container = styled.div`
  display: flex;
  gap: 8px;
`;
