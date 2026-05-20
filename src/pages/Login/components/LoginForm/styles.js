import styled from 'styled-components';
import { Input, Button } from 'antd';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0;
`;

export const StyledInput = styled(Input)`
  height: 40px;
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledPassword = styled(Input.Password)`
  height: 40px;
  .anticon {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const OptionsRow = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 20px;

  .ant-checkbox-wrapper {
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: 14px;
  }

  a {
    color: ${({ theme }) => theme.colors.blue[500]};
    font-size: 14px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SubmitButton = styled(Button)`
  && {
    height: 40px;
    background-color: ${({ theme }) => theme.colors.blue[500]};
    font-weight: 500;
  }
`;
