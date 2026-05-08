import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useTheme } from 'styled-components';
import { DEVICE_CATEGORY } from '../../../../constants/deviceCategory';
import { DEVICE_STATUS } from '../../../../constants/deviceState';
import { UF } from '../../../../constants/uf';
import {
  SearchWrapper,
  SearchContainer,
  SearchInput,
  SearchSelect,
  UfSelect,
  CitySelect,
  SearchButton,
} from './styles';

const { Option } = Select;

export const DeviceFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedUf,
  onEstadoChange,
  selectedCity,
  setSelectedCity,
  cidadesList,
  handleFilterDevices,
  loading,
}) => {
  const theme = useTheme();

  return (
    <SearchWrapper>
      <SearchContainer>
        <SearchInput
          size="large"
          prefix={<SearchOutlined style={{ color: theme.colors.gray[400] }} />}
          placeholder="O que você procura?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchSelect
          size="large"
          placeholder="Categoria"
          value={selectedCategory || undefined}
          onChange={(value) => setSelectedCategory(value)}
        >
          <Option value="">Todas</Option>
          {DEVICE_CATEGORY.map((categoria) => (
            <Option key={categoria.value} value={categoria.value}>
              {categoria.label}
            </Option>
          ))}
        </SearchSelect>
        <SearchSelect
          size="large"
          placeholder="Estado de conservação"
          value={selectedStatus || undefined}
          onChange={(value) => setSelectedStatus(value)}
        >
          <Option value="">Qualquer estado</Option>
          {DEVICE_STATUS.map((status) => (
            <Option key={status.value} value={status.value}>
              {status.label}
            </Option>
          ))}
        </SearchSelect>
        <UfSelect
          size="large"
          placeholder="UF"
          value={selectedUf || undefined}
          onChange={onEstadoChange}
          showSearch
        >
          <Option value="">Todas</Option>
          {UF.map((estado) => (
            <Option key={estado.value} value={estado.value}>
              {estado.label}
            </Option>
          ))}
        </UfSelect>
        <CitySelect
          size="large"
          placeholder="Cidade"
          value={selectedCity || undefined}
          onChange={(value) => setSelectedCity(value)}
          disabled={cidadesList.length === 0}
          $isDisabled={cidadesList.length === 0}
          showSearch
        >
          <Option value="">Todas as cidades</Option>
          {cidadesList.map((cidade) => (
            <Option key={cidade.value} value={cidade.value}>
              {cidade.label}
            </Option>
          ))}
        </CitySelect>
        <SearchButton
          size="large"
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleFilterDevices}
          loading={loading}
        >
          Buscar
        </SearchButton>
      </SearchContainer>
    </SearchWrapper>
  );
};
