import {
  EnvironmentOutlined,
  HomeOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Form } from 'antd';
import { UF } from '../../constants/uf';
import { InputRow, StyledInput, StyledSelect } from './styles';

export const AddressForm = ({
  address,
  cidadesList,
  disabledFields,
  onCepBlur,
  onEstadoChange,
  onChangeField,
  withLabels = false,
}) => {
  const formatCep = (value) => {
    let val = value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, '-');
    return val;
  };

  const renderInput = (
    name,
    label,
    icon,
    placeholder,
    value,
    onChange,
    onBlur,
    disabled,
    weight,
    maxLength,
    type = 'text'
  ) => {
    const input = (
      <StyledInput
        $weight={weight}
        size="large"
        prefix={icon}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        type={type}
      />
    );

    if (withLabels) {
      return (
        <Form.Item
          label={label}
          required={label !== 'Complemento'}
          style={{ flex: weight || 'auto' }}
        >
          {input}
        </Form.Item>
      );
    }
    return input;
  };

  return (
    <>
      {renderInput(
        'cep',
        'CEP',
        <EnvironmentOutlined />,
        'CEP',
        address.cep,
        (e) => onChangeField('cep', e.target.value),
        onCepBlur,
        false,
        null,
        9
      )}

      <InputRow>
        {withLabels ? (
          <>
            <Form.Item label="Estado" required style={{ flex: 1 }}>
              <StyledSelect
                size="large"
                placeholder="Estado"
                value={address.estado || undefined}
                onChange={onEstadoChange}
                options={UF}
                disabled={disabledFields.estado}
                showSearch
              />
            </Form.Item>
            <Form.Item label="Cidade" required style={{ flex: 2 }}>
              <StyledSelect
                size="large"
                placeholder="Cidade"
                value={address.cidade || undefined}
                onChange={(value) => onChangeField('cidade', value)}
                options={cidadesList}
                disabled={disabledFields.cidade}
                showSearch
              />
            </Form.Item>
          </>
        ) : (
          <>
            <StyledSelect
              $weight={1}
              size="large"
              placeholder="Estado"
              value={address.estado || undefined}
              onChange={onEstadoChange}
              options={UF}
              disabled={disabledFields.estado}
              showSearch
            />
            <StyledSelect
              $weight={2}
              size="large"
              placeholder="Cidade"
              value={address.cidade || undefined}
              onChange={(value) => onChangeField('cidade', value)}
              options={cidadesList}
              disabled={disabledFields.cidade}
              showSearch
            />
          </>
        )}
      </InputRow>

      {renderInput(
        'bairro',
        'Bairro',
        <HomeOutlined />,
        'Bairro',
        address.bairro,
        (e) => onChangeField('bairro', e.target.value),
        null,
        disabledFields.bairro
      )}

      <InputRow>
        {renderInput(
          'rua',
          'Rua',
          <HomeOutlined />,
          'Rua',
          address.rua,
          (e) => onChangeField('rua', e.target.value),
          null,
          disabledFields.rua,
          2
        )}
        {renderInput(
          'numero',
          'Número',
          <NumberOutlined />,
          'Número',
          address.numero,
          (e) => onChangeField('numero', e.target.value.replace(/\D/g, '')),
          null,
          false,
          1
        )}
      </InputRow>

      {renderInput(
        'complemento',
        'Complemento',
        <HomeOutlined />,
        'Complemento (Opcional)',
        address.complemento,
        (e) => onChangeField('complemento', e.target.value)
      )}
    </>
  );
};
