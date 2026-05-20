import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useDeviceFilters = (initialUser, onResults) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [cidadesList, setCidadesList] = useState([]);

  const fetchCidades = useCallback(async (uf) => {
    if (!uf) {
      setCidadesList([]);
      return;
    }
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
  }, []);

  const handleEstadoChange = useCallback((value) => {
    setSelectedUf(value);
    setSelectedCity('');
    fetchCidades(value);
  }, [fetchCidades]);

  const handleFilterDevices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/filter-avaible-devices', {
        params: {
          userId: initialUser?.id,
          search: searchTerm || undefined,
          categoria: selectedCategory || undefined,
          estado_conservacao: selectedStatus || undefined,
          uf: selectedUf || undefined,
          cidade: selectedCity || undefined,
        },
      });
      onResults(response.data);
    } catch (error) {
      console.log('Erro ao buscar dispositivos', error);
    } finally {
      setLoading(false);
    }
  }, [initialUser, searchTerm, selectedCategory, selectedStatus, selectedUf, selectedCity, onResults]);

  return {
    searchTerm, setSearchTerm,
    selectedUf, setSelectedUf,
    selectedCity, setSelectedCity,
    selectedCategory, setSelectedCategory,
    selectedStatus, setSelectedStatus,
    loading, setLoading,
    cidadesList,
    handleEstadoChange,
    handleFilterDevices
  };
};
