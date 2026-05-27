import React from 'react'
import { Statistic } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { CardWrapper, StyledCard } from './styless';

export function Card({ value, title }) {
  return (
    <CardWrapper>
      <StyledCard bordered={false}>
        <Statistic 
          title={title} 
          value={value} 
          prefix={<BarChartOutlined  style={{ color: '#1677ff' }} />} 
        />
      </StyledCard>
    </CardWrapper>
  )
}
