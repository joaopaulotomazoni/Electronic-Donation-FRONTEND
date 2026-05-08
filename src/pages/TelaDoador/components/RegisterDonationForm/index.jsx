import { Typography, Input, Select, Button, Upload, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DEVICE_STATUS } from '../../../../constants/deviceState';
import { DEVICE_CATEGORY } from '../../../../constants/deviceCategory';
import { UF } from '../../../../constants/uf';
import { StyledCard, FormRow, FormLabel, RequiredAsterisk } from './styles';
import { useAddress } from '../../../../hooks/useAddress';

const { Title } = Typography;
const { Dragger } = Upload;

export const RegisterDonationForm = ({
  registerDevice,
  setRegisterDevice,
  fileList,
  setFileList,
  handleSubmit,
  loading,
}) => {
  const { cidadesList, fetchCidades } = useAddress();

  const handleOnEstadoChange = (value) => {
    setRegisterDevice({ ...registerDevice, uf: value, city: '' });
    fetchCidades(value);
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

  return (
    <StyledCard
      title={
        <Title level={4} style={{ margin: 0 }}>
          Cadastrar Nova Doação
        </Title>
      }
      style={{ height: 'fit-content' }}
    >
      <Spin spinning={loading} description="Processando...">
        <FormRow>
          <FormLabel>
            Nome do Dispositivo <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input
            size="large"
            placeholder="Ex: Notebook Dell Inspiron 15"
            value={registerDevice.name || ''}
            onChange={(e) =>
              setRegisterDevice({ ...registerDevice, name: e.target.value })
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
              setRegisterDevice({ ...registerDevice, conservationState: value })
            }
            options={DEVICE_STATUS}
          />
        </FormRow>

        <FormRow>
          <FormLabel>
            UF <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Select
            size="large"
            style={{ width: '100%' }}
            placeholder="Selecione o estado"
            value={registerDevice.uf}
            onChange={handleOnEstadoChange}
            options={UF}
            showSearch
          />
        </FormRow>

        <FormRow>
          <FormLabel>
            Cidade <RequiredAsterisk>*</RequiredAsterisk>
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
            disabled={!registerDevice.uf}
            showSearch
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
          <Button type="primary" size="large" onClick={handleSubmit} block>
            Cadastrar Doação
          </Button>
        </div>
      </Spin>
    </StyledCard>
  );
};
