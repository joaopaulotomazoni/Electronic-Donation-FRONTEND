import styled from 'styled-components';
import { Card, Button, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  height: 100%;
  width: 344px;
  max-width: 344px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .ant-card-cover {
    height: 200px;
    overflow: hidden;
  }

  .ant-card-body {
    padding: 16px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-card-actions {
    border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
    background-color: ${({ theme }) => theme.colors.white};
    padding: 8px;

    li {
      margin: 0;
    }
  }
`;

export const DeviceImage = styled.img`
  && {
    width: 100%;
    height: 200px;
    object-fit: contain;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    display: block;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  margin-top: auto;
  padding-top: 16px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const ActionButton = styled(Button)`
  && {
    width: 90%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.blue[500]};
  }
`;

export const DeviceTitle = styled(Title)`
  && {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const CategoryTag = styled(Tag)`
  color: ${({ theme }) => theme.colors.gray[700]};
  border-color: ${({ theme }) => theme.colors.gray[300]};
  margin: 0;
`;

export const StateTag = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  margin: 0;
`;

export const LocationText = styled(Text)`
  font-size: 13px;
  margin: 0;
`;
