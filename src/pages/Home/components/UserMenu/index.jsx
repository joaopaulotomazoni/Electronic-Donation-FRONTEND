import { useNavigate } from 'react-router-dom';
import { Space, Dropdown, Avatar } from 'antd';
import {
  DownOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  UserMenuButton,
  UserAvatar,
  LoginButton,
  RegisterButton,
} from './styles';

export const UserMenu = ({ isAuthenticated, user, signOut }) => {
  const navigate = useNavigate();

  const userMenuItems = [
    {
      key: 'editar_perfil',
      label: 'Editar perfil',
      onClick: () => navigate('/perfil'),
    },
    {
      key: 'doador',
      label: 'Tela do doador',
      onClick: () => navigate('/doador'),
    },
    {
      key: 'recebedor',
      label: 'Tela do recebedor',
      onClick: () => navigate('/recebedor'),
    },
    {
      key: 'historico',
      label: 'Histórico',
      onClick: () => navigate('/historico'),
    },
    {
      key: 'admin',
      label: 'Admin',
      onClick: () => navigate('/admin'),
    },
    {
      type: 'divider',
    },
    {
      key: 'sair',
      label: 'Sair',
      danger: true,
      onClick: signOut,
    },
  ];

  if (!isAuthenticated) {
    return (
      <Space size="middle">
        <LoginButton
          type="text"
          icon={<LoginOutlined />}
          onClick={() => navigate('/login')}
        >
          Entrar
        </LoginButton>
        <RegisterButton
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => navigate('/signup')}
        >
          Criar Conta
        </RegisterButton>
      </Space>
    );
  }

  return (
    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
      <UserMenuButton type="text">
        {user.avatar ? (
          <Avatar
            src={user.avatar}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 99,
              objectFit: 'cover',
            }}
            alt="Avatar do usuário"
          />
        ) : (
          <UserAvatar size="small" src={user?.foto}>
            {user?.nome?.charAt(0)?.toUpperCase() ||
              user?.name?.charAt(0)?.toUpperCase() ||
              'U'}
          </UserAvatar>
        )}
        Bem vindo(a) {user.nome}!
        <DownOutlined />
      </UserMenuButton>
    </Dropdown>
  );
};
