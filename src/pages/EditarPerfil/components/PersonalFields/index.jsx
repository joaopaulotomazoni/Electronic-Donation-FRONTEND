import { Form, Input } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

export const PersonalFields = ({ formData, handleChange }) => {
  return (
    <>
      <Form.Item label="Nome Completo" required>
        <Input
          name="nome"
          prefix={<UserOutlined />}
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu nome"
          size="large"
        />
      </Form.Item>

      <Form.Item label="E-mail" required>
        <Input
          name="email"
          prefix={<MailOutlined />}
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          size="large"
          type="email"
        />
      </Form.Item>
    </>
  );
};
