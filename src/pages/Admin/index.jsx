import React, { useState, useEffect, useCallback } from 'react'
import { GlobalHeader } from '../../components/GlobalHeader'
import { Button, Spin, Tabs, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card'
import { DoughnutChart } from './components/DoughnutChart'
import { api } from '../../services/api';
import { MyDonationsList } from './components/MyDonationsList/index.jsx';
import { EditarDoacoes } from '../TelaDoador/EditarDoacoes/index';
import { useAuth } from '../../hooks/useAuth';

import {
    Container, PageTitle, HeaderContainer,
    PageSubtitle,
    CardsContainer,
    ChartSection,
    LegendList,
    LegendItem,
    LegendColor,
    LegendLabel,
    LegendValue,
    SubmitButton
} from './styles.js';

export function Admin() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [useData, setUseData] = useState({});
    const [dispositivosDoar, setdispositivosDoar] = useState([]);
    const [editingDevice, setEditingDevice] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [editFileList, setEditFileList] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const fetchDevices = useCallback(async () => {
        try {
            const deviceResponse = await api.get('/devices', {
                headers: { 'X-User-Id': user?.id }
            });
            setdispositivosDoar(deviceResponse.data);
        } catch (error) {
            console.error('Erro ao carregar os dispositivos:', error);
        }
    }, [user?.id]);

    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
        payload,
        { headers: { 'X-User-Id': user?.id } }
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
        `/${editingDevice.id || editingDevice.id_dispositivo}/device/delete`,
        { headers: { 'X-User-Id': user?.id } }
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
        async function fetchData() {
            try {
                setLoading(true);
                const response = await api.get('/admin/dashboard', {
                    headers: { 'X-User-Id': user?.id }
                });
                setUseData(response.data);
                await fetchDevices();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    message.error('Acesso restrito. Redirecionando...');
                    navigate('/');
                } else {
                    message.error('Não foi possível carregar os dados do painel.');
                }
            } finally {
                setLoading(false);
            }
        }

        if (user?.id) {
            fetchData();
        }
    }, [user?.id, fetchDevices, navigate]);

    const TotalDoacoes = (useData?.inventory?.distribution?.doado || 0) + (useData?.inventory?.distribution?.doar || 0);
    const chartColors = ['#1677ff', '#faad14', '#722ed1'];
    
    const chartData = (useData?.inventory?.topCategories || []).map((item, index) => ({
        ...item,
        color: chartColors[index % chartColors.length],
        percentage: TotalDoacoes > 0 ? Number(((item.value / TotalDoacoes) * 100).toFixed(1)) : 0
    }));

        return (
            <>
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
                        <PageTitle level={2}>Admin</PageTitle>
                        <PageSubtitle>
                            Acompanhe o desempenho das doações e usuários.
                        </PageSubtitle>
                    </HeaderContainer>

                    <Spin spinning={loading} size="large" description="Carregando painel...">
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    key: '1',
                                    label: 'Visão Geral',
                                    children: (
                                        <>
                                            <CardsContainer >
                                                <Card value={useData?.kpis?.totalDonations || 0} title="Total de doações" />
                                                <Card value={useData?.inventory?.distribution?.doar || 0} title="Doações Pendentes" />
                                                <Card value={useData?.kpis?.matchSuccessRate || 0} title="Sucesso de aceitação" />
                                                <Card value={useData?.kpis?.totalUsers || 0} title="Total de Usuários" />
                                            </CardsContainer>

                                            <ChartSection>
                                                <PageTitle level={3}>Total de dispostivos por categoria</PageTitle>
                                                <DoughnutChart data={chartData} total={TotalDoacoes} />
                                                <LegendList>
                                                    {chartData.map((item, index) => (
                                                        <LegendItem key={index}>
                                                            <LegendColor style={{ backgroundColor: item.color }} />
                                                            <LegendLabel>{item.name}</LegendLabel>
                                                            <LegendValue>{item.value} ({item.percentage}%)</LegendValue>
                                                        </LegendItem>
                                                    ))}
                                                </LegendList>
                                            </ChartSection>
                                        </>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Gerenciamento',
                                    children: (
                                        <MyDonationsList
                                            devices={dispositivosDoar}
                                            showDrawer={showDrawer}
                                            loading={loading}
                                           
                                        />
                                    ),
                                },
                            ]}
                        />
                    </Spin>

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


            </>
        )
    }
