import React from 'react';
import {
  Drawer,
  Input,
  Select,
  Button,
  Upload,
  Popconfirm,
  Space,
  Spin,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
  FormContainer,
  Label,
  RequiredAsterisk,
  FullWidthSelect,
  ActionContainer,
} from './styles';

const { Dragger } = Upload;

export function EditarDoacoes({
  open,
  onClose,
  editFormData,
  setEditFormData,
  handleEditSubmit,
  handleDelete,
  editUploadProps,
  loading = false,
}) {
  return (
    <Drawer
      title="Editar Doação"
      width={800}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button danger block onClick={handleDelete}>
            Excluir Doação
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading} tip="Salvando...">
        <FormContainer>
          <div>
            <Label>
              Nome do Dispositivo <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              size="large"
              placeholder="Ex: Notebook Dell Inspiron 15"
              value={editFormData?.name || ''}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label>
              Categoria <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <FullWidthSelect
              size="large"
              placeholder="Selecione uma categoria"
              value={editFormData?.category}
              onChange={(value) =>
                setEditFormData({ ...editFormData, category: value })
              }
              options={[
                { value: 'notebook', label: 'notebook' },
                { value: 'smartphone', label: 'smartphone' },
                { value: 'tablet', label: 'tablet' },
              ]}
            />
          </div>

          <div>
            <Label>
              Estado de Conservação <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <FullWidthSelect
              size="large"
              placeholder="Selecione o estado"
              value={editFormData?.conservationState}
              onChange={(value) =>
                setEditFormData({ ...editFormData, conservationState: value })
              }
              options={[
                { value: 'Novo', label: 'Novo' },
                {
                  value: 'Usado - em bom estado',
                  label: 'Usado - em bom estado',
                },
                { value: 'Usado - com defeito', label: 'Usado - com defeito' },
              ]}
            />
          </div>

          <div>
            <Label>
              Descrição <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input.TextArea
              rows={4}
              placeholder="Descreva o dispositivo, especificações técnicas, acessórios incluídos..."
              value={editFormData?.description || ''}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Imagens do Dispositivo</Label>
            <Dragger {...editUploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Clique para fazer upload ou arraste as novas imagens
              </p>
            </Dragger>
          </div>

          <Button type="primary" size="large" block onClick={handleEditSubmit}>
            Salvar Alterações
          </Button>
        </FormContainer>
      </Spin>
    </Drawer>
  );
}
