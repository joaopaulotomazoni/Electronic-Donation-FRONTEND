import { Avatar, Button, Upload, message } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { AvatarContainer, AvatarWrapper, AvatarIconWrapper, AvatarText } from './styles';
import { api } from '../../../../services/api';

export const AvatarUpload = ({ user, updateAvatar, loading, setLoading }) => {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const customUpload = async ({ file, onError }) => {
    try {
      const base64Image = await getBase64(file);

      const response = await api.post(`/users/${user.id}/avatar`, {
        base64Image,
      });

      updateAvatar(response.data.novaFoto);
      message.success('Foto atualizada com sucesso!');
    } catch (error) {
      console.error(error);
      onError(error);
      message.error('Erro ao atualizar a foto.');
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setLoading(true);
      await api.delete(`/users/${user.id}/avatar`);

      updateAvatar(null);
      message.success('Foto removida com sucesso!');
    } catch (error) {
      console.error(error);
      message.error('Erro ao remover a foto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AvatarContainer>
      <AvatarWrapper>
        <Upload
          name="avatar"
          listType="picture-circle"
          showUploadList={false}
          customRequest={customUpload}
        >
          {user?.avatar ? (
            <Avatar
              src={user.avatar}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt="Avatar do usuário"
            />
          ) : (
            <AvatarIconWrapper>
              <UserOutlined />
              <AvatarText>Alterar Foto</AvatarText>
            </AvatarIconWrapper>
          )}
        </Upload>
        {user?.avatar && (
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zIndex: 10,
            }}
            onClick={handleRemoveAvatar}
          />
        )}
      </AvatarWrapper>
    </AvatarContainer>
  );
};
