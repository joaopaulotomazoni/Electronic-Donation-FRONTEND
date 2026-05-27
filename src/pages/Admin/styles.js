import styled from 'styled-components';
import { Layout, Typography } from 'antd';
import { Button } from 'antd';

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
  text-align: center;
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

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding-top: 24px;
`;

export const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const LegendColor = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const LegendLabel = styled.span`
  color: ${({ theme }) => theme?.colors?.gray?.[600] || '#595959'};
  flex-shrink: 0;
`;

export const LegendValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme?.colors?.gray?.[800] || '#262626'};
  margin-left: auto;
  padding-left: 12px;
`;

export const SubmitButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue[500]};
  }
`;