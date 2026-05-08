import { useState, useCallback } from 'react';
import { message } from 'antd';
import { api } from '../services/api';

export const useDonationRegistration = (userId, onDonationCreated) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [registerDevice, setRegisterDevice] = useState({
    name: null,
    category: null,
    conservationState: null,
    description: null,
    uf: null,
    city: null,
  });

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = useCallback(async () => {
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

    try {
      setLoading(true);
      const base64Images = await Promise.all(
        fileList.map((file) => getBase64(file))
      );

      const payload = {
        ...registerDevice,
        images: base64Images,
      };

      await api.post(`/${userId}/device/register`, payload);
      message.success('Doação cadastrada com sucesso!');

      setRegisterDevice({
        name: null,
        category: null,
        conservationState: null,
        description: null,
        uf: null,
        city: null,
      });
      setFileList([]);
      onDonationCreated();
    } catch (error) {
      console.error(error);
      message.error('Falha ao cadastrar a doação.');
    } finally {
      setLoading(false);
    }
  }, [userId, registerDevice, fileList, onDonationCreated]);

  return {
    loading,
    setLoading,
    fileList,
    setFileList,
    registerDevice,
    setRegisterDevice,
    handleSubmit
  };
};
