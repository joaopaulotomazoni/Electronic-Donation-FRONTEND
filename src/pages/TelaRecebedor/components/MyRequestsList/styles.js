import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  border: none;
`;

export const ListTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const DeviceImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;
