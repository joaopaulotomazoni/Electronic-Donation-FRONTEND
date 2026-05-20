import styled from 'styled-components';
import { Button } from 'antd';

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const AvatarIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .anticon {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`;

export const AvatarText = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SubmitButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue[500]};
  }
`;
