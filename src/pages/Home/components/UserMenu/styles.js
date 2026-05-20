import styled from 'styled-components';
import { Button, Avatar } from 'antd';

export const UserMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 76px;
  border-radius: 0;
  padding: 0 50px 0 24px;
  margin-right: -50px;
`;

export const UserAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.white};
`;

export const LoginButton = styled(Button)`
  font-weight: 500;
`;

export const RegisterButton = styled(Button)`
  font-weight: 500;
  border-radius: 6px;
`;
