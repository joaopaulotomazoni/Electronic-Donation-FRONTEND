import styled from 'styled-components';
import { Button } from 'antd';

export const ChartContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
`;

export const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

export const CenterTextContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TotalText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.gray?.[800] || '#1f2937'};
`;

export const LabelText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme?.colors?.gray?.[500] || '#6b7280'};
`;

