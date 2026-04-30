import styled from 'styled-components';
import { Typography, Image } from 'antd';

const { Text } = Typography;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 8px 0;
  justify-content: ${({ $isCentered }) =>
    $isCentered ? 'center' : 'flex-start'};

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const SectionTitle = styled(Text)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const DescriptionBox = styled.div`
  min-height: 80px;
  max-height: 120px;
  overflow-y: auto;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.gray[700]};
`;
