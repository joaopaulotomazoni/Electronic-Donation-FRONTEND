import React from 'react'
import {
  ChartContainer,
  StyledSvg,
  CenterTextContainer,
  TotalText,
  LabelText
} from './styles';

export const DoughnutChart = ({ data, total, centerLabel = 'Total' }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <ChartContainer>
      <StyledSvg viewBox="0 0 120 120">
        {}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#f3f4f6"
          strokeWidth="18"
        />
        {data && data.map((segment, index) => {
          const dash = (segment.percentage / 100) * circumference;
          const offset = (accumulatedPercentage / 100) * circumference;
          accumulatedPercentage += segment.percentage;

          return (
            <circle
              key={index}
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth="18"
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </StyledSvg>
      <CenterTextContainer>
        <TotalText>{total}</TotalText>
        <LabelText>{centerLabel}</LabelText>
      </CenterTextContainer>
    </ChartContainer>
  );
};