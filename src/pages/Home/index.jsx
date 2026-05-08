import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { DeviceCard } from '../../components/DeviceCard';
import { useAuth } from '../../hooks/useAuth';
import { useDeviceFilters } from '../../hooks/useDeviceFilters';
import { List, Spin } from 'antd';
import { GlobalHeader } from '../../components/GlobalHeader';
import { HeroSection } from './components/HeroSection';
import { DeviceFilterBar } from './components/DeviceFilterBar';
import { UserMenu } from './components/UserMenu';
import {
  LayoutContainer,
  MainContent,
  ListWrapper,
  SectionTitle,
} from './styles';

export const Home = () => {
  const [devices, setDevices] = useState([]);
  const { isAuthenticated, signOut, user } = useAuth();
  const [initialLoading, setInitialLoading] = useState(false);

  const {
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedStatus, setSelectedStatus,
    selectedUf,
    selectedCity, setSelectedCity,
    cidadesList,
    loading: filterLoading,
    handleEstadoChange,
    handleFilterDevices
  } = useDeviceFilters(user, setDevices);

  const loading = initialLoading || filterLoading;

  useEffect(() => {
    async function fetchDevices() {
      try {
        setInitialLoading(true);
        const response = await api.get('/avaible-devices', {
          params: {
            userId: user?.id,
          },
        });
        setDevices(response.data);
      } catch (error) {
        console.log('Erro ao buscar dispositivos', error);
      } finally {
        setInitialLoading(false);
      }
    }

    fetchDevices();
  }, [user]);

  return (
    <LayoutContainer>
      <GlobalHeader>
        <UserMenu 
          isAuthenticated={isAuthenticated} 
          user={user} 
          signOut={signOut} 
        />
      </GlobalHeader>
      <MainContent>
        <HeroSection />

        <DeviceFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedUf={selectedUf}
          onEstadoChange={handleEstadoChange}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cidadesList={cidadesList}
          handleFilterDevices={handleFilterDevices}
          loading={filterLoading}
        />

        <ListWrapper>
          <SectionTitle level={3}>Dispositivos Disponíveis</SectionTitle>
          <Spin
            spinning={loading}
            size="large"
            description="Carregando dispositivos..."
          >
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
              dataSource={devices}
              renderItem={(item) => (
                <List.Item>
                  <DeviceCard device={item} />
                </List.Item>
              )}
            />
          </Spin>
        </ListWrapper>
      </MainContent>
    </LayoutContainer>
  );
};
