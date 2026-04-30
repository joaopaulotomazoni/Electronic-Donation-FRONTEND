import { EditarDoacoes } from './EditarDoacoes/index';
import {
  LayoutContainer,
  Container,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  Content,
  StyledCard,
  FormRow,
  FormLabel,
  RequiredAsterisk,
  DeviceImagePreview,
  ListTitle,
  InfoText,
} from './styles';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Input,
  Select,
  Button,
  Upload,
  List,
  Tag,
  Space,
  message,
  Spin,
} from 'antd';
import { InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { UF } from '../../constants/uf';
import { DEVICE_STATUS } from '../../constants/deviceState';
import { DEVICE_CATEGORY } from '../../constants/deviceCategory';
import { GlobalHeader } from '../../components/GlobalHeader';

const { Title } = Typography;
const { Dragger } = Upload;

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
  const [fileList, setFileList] = useState([]);
  const [registerDevice, setRegisterDevice] = useState({
    name: null,
    category: null,
    conservationState: null,
    description: null,
    uf: null,
    city: null,
  });
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cidadesList, setCidadesList] = useState([]);

  const { user } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
      case 'Aceito':
        return 'success';
      case 'Pendente':
        return 'processing';
      default:
        return 'default';
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList,
    multiple: true,
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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  const fetchCidades = async (uf) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const data = await response.json();
      const cidadesFormatadas = data.map((cidadeIBGE) => ({
        value: cidadeIBGE.nome,
        label: cidadeIBGE.nome,
      }));
      setCidadesList(cidadesFormatadas);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleOnEstadoChange = (value) => {
    setRegisterDevice({ ...registerDevice, uf: value, city: '' });
    fetchCidades(value);
  };

  const handleSubmit = async () => {
    if (
      !registerDevice.name ||
      !registerDevice.category ||
      !registerDevice.conservationState ||
      !registerDevice.description ||
      !registerDevice.city ||
      !registerDevice.uf
    ) {
      message.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const base64Images = await Promise.all(
      fileList.map((file) => getBase64(file))
    );

    const payload = {
      ...registerDevice,
      images: base64Images,
    };

    try {
      setLoading(true);
      await api.post(`/${user.id}/device/register`, payload);

      message.success('Doação cadastrada com sucesso!');

      setRegisterDevice({
        name: null,
        category: null,
        conservationState: null,
        description: null,
      });
      setFileList([]);

      await fetchDevices();
    } catch (error) {
      console.error(error);
      message.error('Falha ao cadastrar a doação.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (deviceId, status) => {
    try {
      setLoading(true);
      await api.put(`/${deviceId}/updateStatus`, {
        status,
      });
      message.success(`Solicitação atualizada com sucesso!`);
      setSolicitacoesRecebidas((prev) =>
        prev.filter((req) => req.id_dispositivo !== deviceId)
      );
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

  useEffect(() => {
    const fetchSolicitacoesRecebidas = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/${user.id}/user-device-with-request`);

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
          <StyledCard
            title={
              <Title level={4} style={{ margin: 0 }}>
                Cadastrar Nova Doação
              </Title>
            }
            style={{ height: 'fit-content' }}
          >
            <Spin spinning={loading} description="Carregando...">
              <FormRow>
                <FormLabel>
                  Nome do Dispositivo <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Input
                  size="large"
                  placeholder="Ex: Notebook Dell Inspiron 15"
                  value={registerDevice.name || ''}
                  onChange={(e) =>
                    setRegisterDevice({
                      ...registerDevice,
                      name: e.target.value,
                    })
                  }
                />
              </FormRow>

              <FormRow>
                <FormLabel>
                  Categoria <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione uma categoria"
                  value={registerDevice.category}
                  onChange={(value) =>
                    setRegisterDevice({ ...registerDevice, category: value })
                  }
                  options={DEVICE_CATEGORY}
                />
              </FormRow>

              <FormRow>
                <FormLabel>
                  Estado de Conservação <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione o estado"
                  value={registerDevice.conservationState}
                  onChange={(value) =>
                    setRegisterDevice({
                      ...registerDevice,
                      conservationState: value,
                    })
                  }
                  options={DEVICE_STATUS}
                />
              </FormRow>

              <FormRow>
                <FormLabel>
                  UF: <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione o estado"
                  value={registerDevice.uf}
                  onChange={(value) => handleOnEstadoChange(value)}
                  options={UF}
                />
              </FormRow>

              <FormRow>
                <FormLabel>
                  Cidade: <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione a cidade"
                  value={registerDevice.city}
                  onChange={(value) =>
                    setRegisterDevice({ ...registerDevice, city: value })
                  }
                  options={cidadesList}
                  disabled={cidadesList.length === 0}
                />
              </FormRow>

              <FormRow>
                <FormLabel>
                  Descrição <RequiredAsterisk>*</RequiredAsterisk>
                </FormLabel>
                <Input.TextArea
                  rows={4}
                  placeholder="Descreva o dispositivo, especificações técnicas, acessórios incluídos..."
                  value={registerDevice.description || ''}
                  onChange={(e) =>
                    setRegisterDevice({
                      ...registerDevice,
                      description: e.target.value,
                    })
                  }
                />
              </FormRow>

              <FormRow>
                <FormLabel>Imagens do Dispositivo</FormLabel>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Clique para fazer upload ou arraste as imagens
                  </p>
                </Dragger>
              </FormRow>

              <div style={{ marginTop: '2rem' }}>
                <Button type="primary" size="large" onClick={handleSubmit}>
                  Cadastrar Doação
                </Button>
              </div>
            </Spin>
          </StyledCard>

          <Space vertical size="large" style={{ display: 'flex' }}>
            <StyledCard
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Minhas Doações
                </Title>
              }
              style={{ width: '100%', minWidth: 400 }}
            >
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={dispositivosDoar}
                renderItem={(donation) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        size="small"
                        onClick={() => showDrawer(donation)}
                        disabled={donation.status === 'Aceito'}
                      >
                        Editar
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <DeviceImagePreview
                          src={
                            donation.imagens && donation.imagens.length > 0
                              ? donation.imagens[0].url
                              : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                          }
                          alt={donation.nome_dispositivo}
                        />
                      }
                      title={<ListTitle>{donation.nome_dispositivo}</ListTitle>}
                      description={
                        <Tag color={getStatusColor(donation.status)}>
                          {donation.status}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            </StyledCard>

            <StyledCard
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Solicitações Recebidas
                </Title>
              }
              style={{ width: '100%', minWidth: 400 }}
            >
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={solicitacoesRecebidas}
                renderItem={(req) => (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                          handleUpdateStatus(req.id_dispositivo, 'aceito')
                        }
                      >
                        Aceitar
                      </Button>,
                      <Button
                        danger
                        size="small"
                        onClick={() =>
                          handleUpdateStatus(req.id_dispositivo, 'rejeitado')
                        }
                      >
                        Rejeitar
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <ListTitle>
                          {req.dispositivo?.nome_dispositivo ||
                            'Dispositivo Solicitado'}
                        </ListTitle>
                      }
                      description={
                        <>
                          <InfoText>
                            <strong>Justificativa:</strong>{' '}
                            {req.justificativa || 'Não informada.'}
                          </InfoText>
                          <InfoText>
                            <strong>Status:</strong> {req.status || 'Pendente'}
                          </InfoText>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </StyledCard>
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
