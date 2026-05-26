import styled from 'styled-components';
import { Card, List } from 'antd';

export const StyledCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: none;
  background-color: #fff;
`;

export const StyledListItem = styled(List.Item)`
  background-color: #fff;
  padding: 1rem !important;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
`;

export const DeviceImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ListTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
`;