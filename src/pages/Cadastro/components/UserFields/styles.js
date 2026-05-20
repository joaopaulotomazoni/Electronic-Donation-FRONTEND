import styled from 'styled-components';
import { Input, Select } from 'antd';

export const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  flex: ${({ $weight }) => $weight || 'auto'};
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledPassword = styled(Input.Password)`
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledSelect = styled(Select)`
  flex: ${({ $weight }) => $weight || 'auto'};
`;
