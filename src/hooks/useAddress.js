import { useState, useCallback } from 'react';
import { notification } from 'antd';

export const useAddress = (initialData = {}) => {
  const [address, setAddress] = useState({
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
    ...initialData
  });

  const [cidadesList, setCidadesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cepExist, setCepExist] = useState(true);
  const [disabledFields, setDisabledFields] = useState({
    rua: false,
    bairro: false,
    cidade: true,
    estado: false,
  });

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
      setDisabledFields(prev => ({ ...prev, cidade: false }));
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  }, []);

  const fetchAddressByCep = useCallback(async (cepStr, silent = false) => {
    const cepNumerico = cepStr.replace(/\D/g, '');
    if (!cepNumerico || cepNumerico.length !== 8) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://viacep.com.br/ws/${cepNumerico}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        setAddress((prev) => ({
          ...prev,
          cep: cepStr,
          rua: data.logradouro || prev.rua,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          estado: data.uf || prev.estado,
        }));
        setCepExist(true);
        if (data.uf) {
          await fetchCidades(data.uf);
        }

        setDisabledFields({
          rua: !!data.logradouro,
          bairro: !!data.bairro,
          cidade: !!data.localidade,
          estado: !!data.uf,
        });
      } else {
        if (!silent) {
          notification.error({
            message: 'CEP Inválido',
            description: 'O CEP informado não foi encontrado.',
          });
        }
        setCepExist(false);
        setDisabledFields({
          rua: false,
          bairro: false,
          cidade: true,
          estado: false,
        });
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      if (!silent) {
        notification.error({
          message: 'Erro na busca',
          description:
            'Ocorreu um erro ao tentar buscar o CEP. Tente novamente mais tarde.',
        });
      }
      setCepExist(false);
      setDisabledFields({
        rua: false,
        bairro: false,
        cidade: false,
        estado: false,
      });
    } finally {
      setLoading(false);
    }
  }, [fetchCidades]);

  const handleEstadoChange = useCallback((uf) => {
    setAddress(prev => ({ ...prev, estado: uf, cidade: '' }));
    fetchCidades(uf);
  }, [fetchCidades]);

  const updateAddressField = useCallback((field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    address,
    setAddress,
    cidadesList,
    loading,
    cepExist,
    disabledFields,
    fetchCidades,
    fetchAddressByCep,
    handleEstadoChange,
    updateAddressField,
    setDisabledFields
  };
};
