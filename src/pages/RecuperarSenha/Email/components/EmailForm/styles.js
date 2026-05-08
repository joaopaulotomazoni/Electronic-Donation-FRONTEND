import styled from 'styled-components';
import { Input, Button } from 'antd';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const SubmitButton = styled(Button)`
  && {
    margin-top: 0.5rem;
    background-color: ${({ theme }) => theme.colors.blue[500]};
  }
`;
