import { EditarDoacoes } from './EditarDoacoes/index';
import { Container, Content } from './styles';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Upload,
  List,
  Card,
  Tag,
  Space,
  message,
  Layout,
  Spin,
} from 'antd';
import { InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { useTheme } from 'styled-components';
import { UF } from '../../constants/uf';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { Header } = Layout;

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
  const theme = useTheme();

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
      !registerDevice.description
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
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '0 50px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
          Electronic Donation
        </Title>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{ border: 0, boxShadow: 'none' }}
        >
          Voltar para Home
        </Button>
      </Header>
      <Container>
        <Title level={2} style={{ color: '#343a40', margin: 0 }}>
          Área do Doador
        </Title>
        <Paragraph
          style={{
            color: '#6c757d',
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          Cadastre seus dispositivos e ajude quem precisa
        </Paragraph>

        <Content>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Cadastrar Nova Doação
              </Title>
            }
            style={{ borderRadius: 8, height: 'fit-content' }}
          >
            <Spin spinning={loading} description="Carregando...">
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Nome do Dispositivo{' '}
                  <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
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
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Categoria <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione uma categoria"
                  value={registerDevice.category}
                  onChange={(value) =>
                    setRegisterDevice({ ...registerDevice, category: value })
                  }
                  options={[
                    { value: 'notebook', label: 'notebook' },
                    { value: 'smartphone', label: 'smartphone' },
                    { value: 'tablet', label: 'tablet' },
                  ]}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Estado de Conservação{' '}
                  <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
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
                  options={[
                    { value: 'Novo', label: 'Novo' },
                    {
                      value: 'Usado - em bom estado',
                      label: 'Usado - em bom estado',
                    },
                    {
                      value: 'Usado - com defeito',
                      label: 'Usado - com defeito',
                    },
                  ]}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  UF: <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Selecione o estado"
                  value={registerDevice.uf}
                  onChange={(value) => handleOnEstadoChange(value)}
                  options={UF}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Cidade: <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
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
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Descrição <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
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
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  Imagens do Dispositivo
                </label>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Clique para fazer upload ou arraste as imagens
                  </p>
                </Dragger>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Button type="primary" size="large" onClick={handleSubmit}>
                  Cadastrar Doação
                </Button>
              </div>
            </Spin>
          </Card>

          <Space vertical size="large" style={{ display: 'flex' }}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Minhas Doações
                </Title>
              }
              style={{ borderRadius: 8, width: '100%', minWidth: 400 }}
            >
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={dispositivosDoar}
                renderItem={(donation) => (
                  <List.Item
                    actions={[
                      <Button
                        type="default"
                        size="small"
                        onClick={() => showDrawer(donation)}
                        style={{
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          color:
                            donation.status === 'Aceito'
                              ? theme.colors.gray?.[500]
                              : theme.colors.blue?.[500],
                        }}
                        disabled={donation.status === 'Aceito'}
                      >
                        Editar
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          src={
                            donation.imagens && donation.imagens.length > 0
                              ? donation.imagens[0].url
                              : 'https://via.placeholder.com/60x60/E9ECEF/868E96.png?text=IMG'
                          }
                          alt={donation.nome_dispositivo}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit: 'cover',
                            border: '1px solid #dee2e6',
                          }}
                        />
                      }
                      title={
                        <span style={{ fontWeight: 600 }}>
                          {donation.nome_dispositivo}
                        </span>
                      }
                      description={
                        <Tag color={getStatusColor(donation.status)}>
                          {donation.status}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Solicitações Recebidas
                </Title>
              }
              style={{ borderRadius: 8, width: '100%', minWidth: 400 }}
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
                        <span style={{ fontWeight: 600 }}>
                          {req.dispositivo?.nome_dispositivo ||
                            'Dispositivo Solicitado'}
                        </span>
                      }
                      description={
                        <>
                          <div>
                            <strong>Justificativa:</strong>{' '}
                            {req.justificativa || 'Não informada.'}
                          </div>
                          <div>
                            <strong>Status:</strong> {req.status || 'Pendente'}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
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
    </Layout>
  );
}
