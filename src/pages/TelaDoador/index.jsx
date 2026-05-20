import { EditarDoacoes } from './EditarDoacoes/index';
import {
  LayoutContainer,
  Container,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  Content,
} from './styles';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { GlobalHeader } from '../../components/GlobalHeader';
import { useDonationRegistration } from '../../hooks/useDonationRegistration';
import { RegisterDonationForm } from './components/RegisterDonationForm';
import { MyDonationsList } from './components/MyDonationsList';
import { ReceivedRequestsList } from './components/ReceivedRequestsList';

export function TelaDoador() {
  const navigate = useNavigate();
  const [dispositivosDoar, setdispositivosDoar] = useState([]);
  const [solicitacoesRecebidas, setSolicitacoesRecebidas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: null,
    conservationState: null,
    description: '',
  });

  const [editFileList, setEditFileList] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/${user.id}/devices`);
      setdispositivosDoar(response.data);
    } catch (error) {
      console.error('Erro ao carregar os dispositivos:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  const {
    loading: loadingReg,
    fileList,
    setFileList,
    registerDevice,
    setRegisterDevice,
    handleSubmit,
  } = useDonationRegistration(user?.id, fetchDevices);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpdateStatus = async (idSolicitacao, idDispositivo, status) => {
    try {
      setLoading(true);
      await api.put(`/${idSolicitacao}/updateStatus`, {
        status,
      });
      message.success(`Solicitação atualizada com sucesso!`);

      if (status === 'aceito') {
        setSolicitacoesRecebidas((prev) =>
          prev.filter((req) => req.id_dispositivo !== idDispositivo)
        );
      } else {
        setSolicitacoesRecebidas((prev) =>
          prev.filter((req) => req.id !== idSolicitacao)
        );
      }
      fetchDevices();
    } catch (error) {
      console.error(error);
      message.error('Erro ao atualizar o status da solicitação.');
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = (device) => {
    setEditingDevice(device);
    setEditFormData({
      name: device.nome_dispositivo,
      category: device.categoria,
      conservationState: device.estado_conservacao,
      description: device.descricao,
    });

    if (device.imagens && device.imagens.length > 0) {
      setEditFileList(
        device.imagens.map((img, index) => ({
          uid: img.id || String(index),
          name: `imagem-${index}.png`,
          status: 'done',
          url: img.url,
        }))
      );
    } else {
      setEditFileList([]);
    }
    setImagesToDelete([]);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setEditFormData({
      name: '',
      category: null,
      conservationState: null,
      description: '',
    });
    setEditFileList([]);
    setImagesToDelete([]);
  };

  const handleEditSubmit = async () => {
    if (
      !editFormData.name ||
      !editFormData.category ||
      !editFormData.conservationState ||
      !editFormData.description
    ) {
      message.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      const newImages = editFileList.filter((image) => !image.url);

      const base64Images = await Promise.all(
        newImages.map(async (file) => {
          if (file.url) return file.url;
          return await getBase64(file);
        })
      );

      const payload = {
        ...editFormData,
        images: base64Images,
        imagesToDelete,
      };

      await api.put(
        `/${editingDevice.id || editingDevice.id_dispositivo}/device/update`,
        payload
      );

      message.success('Doação atualizada com sucesso!');
      setOpen(false);

      await fetchDevices();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      message.error('Falha ao atualizar a doação.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(
        `/${editingDevice.id || editingDevice.id_dispositivo}/device/delete`
      );

      message.success('Doação excluída com sucesso!');
      setOpen(false);

      await fetchDevices();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      message.error('Falha ao excluir a doação.');
    } finally {
      setLoading(false);
    }
  };

  const editUploadProps = {
    onRemove: (file) => {
      const index = editFileList.indexOf(file);
      const newFileList = editFileList.slice();
      newFileList.splice(index, 1);
      if (file.url) {
        setImagesToDelete((prev) => [...prev, file.uid]);
      }
      setEditFileList(newFileList);
    },
    beforeUpload: (file) => {
      setEditFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList: editFileList,
    multiple: true,
  };

  useEffect(() => {
    const fetchSolicitacoesRecebidas = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/${user.id}/user-device-with-request`);
        console.log(solicitacoesRecebidas);
        setSolicitacoesRecebidas(response.data);
      } catch (error) {
        console.error('Erro ao carregar as solicitações:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDevices();
      fetchSolicitacoesRecebidas();
    }
  }, [fetchDevices, user]);

  return (
    <LayoutContainer>
      <GlobalHeader>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
        >
          Voltar para Home
        </Button>
      </GlobalHeader>
      <Container>
        <HeaderContainer>
          <PageTitle level={2}>Área do Doador</PageTitle>
          <PageSubtitle>
            Cadastre seus dispositivos e ajude quem precisa
          </PageSubtitle>
        </HeaderContainer>

        <Content>
          <RegisterDonationForm
            registerDevice={registerDevice}
            setRegisterDevice={setRegisterDevice}
            fileList={fileList}
            setFileList={setFileList}
            handleSubmit={handleSubmit}
            loading={loadingReg}
          />

          <Space
            direction="vertical"
            size="large"
            style={{ display: 'flex', width: '100%', minWidth: 400 }}
          >
            <MyDonationsList
              devices={dispositivosDoar}
              showDrawer={showDrawer}
              loading={loading}
              requests={solicitacoesRecebidas}
            />

            <ReceivedRequestsList
              requests={solicitacoesRecebidas}
              handleUpdateStatus={handleUpdateStatus}
              loading={loading}
            />
          </Space>
        </Content>
        <EditarDoacoes
          open={open}
          onClose={onClose}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          handleEditSubmit={handleEditSubmit}
          handleDelete={handleDelete}
          editUploadProps={editUploadProps}
          loading={loading}
        />
      </Container>
    </LayoutContainer>
  );
}
