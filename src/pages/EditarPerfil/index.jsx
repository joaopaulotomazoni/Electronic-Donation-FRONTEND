import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useAddress } from '../../hooks/useAddress';
import { api } from '../../services/api';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AddressForm } from '../../components/AddressForm';
import { AvatarUpload } from './components/AvatarUpload';
import { PersonalFields } from './components/PersonalFields';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import {
  LayoutContainer,
  ContentContainer,
  Container,
  ProfileCard,
  HeaderContainer,
  PageTitle,
  SubmitButton,
} from './styles';

export const EditarPerfil = () => {
  const { user, updateAvatar, updateUser } = useAuth();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalData, setPersonalData] = useState({
    nome: user?.nome || user?.name || '',
    email: user?.email || '',
  });

  const [formPasswordData, setFormPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { 
    address, 
    setAddress,
    cidadesList, 
    disabledFields, 
    loading: loadingAddress, 
    cepExist,
    fetchAddressByCep,
    handleEstadoChange,
    updateAddressField,
    setDisabledFields
  } = useAddress();

  const navigate = useNavigate();
  const loading = loadingSubmit || loadingAddress;

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !personalData.nome ||
      !address.cep ||
      !address.rua ||
      !address.numero ||
      !address.bairro ||
      !address.cidade ||
      !address.estado
    ) {
      message.warning('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (!cepExist) {
      message.error('O cep digitado não existe.');
      return;
    }

    try {
      setLoadingSubmit(true);

      const payload = {
        ...personalData,
        ...address,
        cep: address.cep.replace(/\D/g, ''),
        uf: address.estado // API expects 'uf' instead of 'estado' based on previous code
      };

      await api.put(`/users/${user.id}/update-profile`, payload);
      updateUser(payload);
      message.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      message.error('Erro ao atualizar o perfil. Tente novamente.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (user) {
      setPersonalData({
        nome: user.nome || user.name || '',
        email: user.email || '',
      });

      const userAddress = {
        cep: user?.endereco?.cep || '',
        rua: user?.endereco?.rua || '',
        numero: user?.endereco?.numero || '',
        complemento: user?.endereco?.complemento || '',
        bairro: user?.endereco?.bairro || '',
        cidade: user?.endereco?.cidade || '',
        estado: user?.endereco?.uf || '',
      };
      setAddress(userAddress);

      if (user?.endereco?.cep) {
        fetchAddressByCep(user.endereco.cep, true);
      } else {
        setDisabledFields({
          rua: !!user?.endereco?.rua,
          bairro: !!user?.endereco?.bairro,
          cidade: !!user?.endereco?.cidade,
          estado: !!user?.endereco?.uf,
        });
      }
    }
  }, [user, setAddress, fetchAddressByCep, setDisabledFields]);

  return (
    <LayoutContainer>
      <ContentContainer>
        <GlobalHeader>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </GlobalHeader>
        <Container>
          <ProfileCard>
            <HeaderContainer>
              <PageTitle level={2}>Editar Perfil</PageTitle>
            </HeaderContainer>

            <Spin spinning={loading} description="Processando..." size="large">
              <AvatarUpload 
                user={user} 
                updateAvatar={updateAvatar} 
                loading={loadingSubmit} 
                setLoading={setLoadingSubmit} 
              />

              <Form layout="vertical">
                <PersonalFields formData={personalData} handleChange={handlePersonalChange} />
                
                <AddressForm 
                  address={address}
                  cidadesList={cidadesList}
                  disabledFields={disabledFields}
                  onCepBlur={() => fetchAddressByCep(address.cep)}
                  onEstadoChange={handleEstadoChange}
                  onChangeField={updateAddressField}
                  withLabels={true}
                />

                <Form.Item style={{ marginTop: '2rem', marginBottom: 0 }}>
                  <Button type="link" size="large" onClick={() => setIsModalOpen(true)} style={{ width: '100%', marginBottom: '1rem' }}>
                    Alterar senha
                  </Button>
                  <SubmitButton
                    type="primary"
                    onClick={handleSubmit}
                    size="large"
                    block
                    loading={loading}
                  >
                    Salvar Alterações
                  </SubmitButton>
                </Form.Item>
              </Form>
            </Spin>
          </ProfileCard>
        </Container>
      </ContentContainer>

      <ChangePasswordModal 
        user={user}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        formPasswordData={formPasswordData}
        setFormPasswordData={setFormPasswordData}
      />
    </LayoutContainer>
  );
};
