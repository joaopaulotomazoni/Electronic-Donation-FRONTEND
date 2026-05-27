import React, { useState, useEffect } from 'react'
import { GlobalHeader } from '../../components/GlobalHeader'
import { Button, Spin, Tabs, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card'
import { DoughnutChart } from './components/DoughnutChart'
import { api } from '../../services/api';

import {Container, PageTitle, HeaderContainer,
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
    const [loading, setLoading] = useState(true);
    const [useData, setUseData] = useState([]);
 
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await api.get('/admin/dashboard');
                setUseData(response.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                message.error('Não foi possível carregar os dados do painel.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    



    const TotalDoacoes = (useData?.inventory?.distribution?.doado || 0) + (useData?.inventory?.distribution?.doar || 0);
    const chartColors = ['#1677ff', '#faad14', '#722ed1'];
    const charData1 = () => {
        const categories = useData?.inventory?.topCategories || [];
        
        

        return categories.map((item, index) => ({
            ...item,
            color: chartColors[ index % chartColors.length],
            percentage: TotalDoacoes > 0 ? Number(((item.value / TotalDoacoes ) * 100).toFixed(1)) : 0
        }));
    };

    console.log('Dados para o gráfico:', charData1());
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
                                        <CardsContainer style={{ paddingTop: 0 }}>
                                            <Card value={useData?.kpis?.totalDonations || 0} title="Total de doações" />
                                            <Card value={useData?.inventory?.distribution?.doar || 0} title="Doações Pendentes" />
                                            <Card value={useData?.kpis?.matchSuccessRate|| 0} title="Sucesso de aceitação" />
                                            <Card value={useData?.kpis?.totalUsers || 0} title="Total de Usuários" />
                                        </CardsContainer>

                                        <ChartSection>
                                            <PageTitle level={3}>Total de dispostivos por categoria</PageTitle>
                                            <DoughnutChart data={charData1()} total={TotalDoacoes} />
                                            <LegendList>
                                                {charData1().map((item, index) => (
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
                                    <div >
                                        OLAS
                                    </div>
                                ),
                            },
                        ]}
                    />
                </Spin>

            </Container>


        </>
    )
}
