import styled from 'styled-components';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  border: none;
`;

export const FormRow = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.red[500]};
  margin-left: 4px;
`;
