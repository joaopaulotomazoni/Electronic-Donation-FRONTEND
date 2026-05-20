import { Modal, Input, message } from 'antd';
import { ChangePasswordContainer } from './styles';
import { api } from '../../../../services/api';

export const ChangePasswordModal = ({ user, isOpen, onCancel, formPasswordData, setFormPasswordData }) => {
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setFormPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOk = async () => {
    try {
      if (
        !formPasswordData.currentPassword ||
        !formPasswordData.newPassword ||
        !formPasswordData.confirmNewPassword
      ) {
        message.error('Preencha todos os campos');
        return;
      }

      if (
        formPasswordData.newPassword !== formPasswordData.confirmNewPassword
      ) {
        message.error('As senhas não coincidem');
        return;
      }

      await api.put(`/users/${user.id}/change-password`, formPasswordData);

      message.success('Senha alterada com sucesso!');
      onCancel();
    } catch (error) {
      console.error(error);
      message.error('Erro ao salvar nova senha');
    }
  };

  return (
    <Modal
      title="Alterar senha"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Salvar"
      cancelText="Cancelar"
      centered
    >
      <ChangePasswordContainer
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingTop: '1rem',
        }}
      >
        <Input.Password
          name="currentPassword"
          value={formPasswordData.currentPassword}
          onChange={handleChangePassword}
          placeholder="Digite sua senha atual"
          size="large"
        />

        <Input.Password
          name="newPassword"
          value={formPasswordData.newPassword}
          onChange={handleChangePassword}
          placeholder="Digite sua nova senha"
          size="large"
        />

        <Input.Password
          name="confirmNewPassword"
          value={formPasswordData.confirmNewPassword}
          onChange={handleChangePassword}
          placeholder="Confirme sua nova senha"
          size="large"
        />
      </ChangePasswordContainer>
    </Modal>
  );
};
