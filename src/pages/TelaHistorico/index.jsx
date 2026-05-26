import React from 'react'
import {LayoutContainer,Container, HeaderContainer,PageTitle,PageSubtitle, Content} from './styles';
import { GlobalHeader } from '../../components/GlobalHeader'
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HistoricoList } from './componets/historico';


export function TelaHistorico() {
    const navigate = useNavigate();
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
                <HeaderContainer style={{ textAlign: 'center' }}>
                    <PageTitle level={2}>Historico</PageTitle>
                    <PageSubtitle>
                        Acompanhe o historico dos dispositivos que você solicitou/cadastrou.
                    </PageSubtitle>
                </HeaderContainer>
                <Content>
                    <HistoricoList />
                </Content>
            </Container>
        </LayoutContainer>
    )
}
