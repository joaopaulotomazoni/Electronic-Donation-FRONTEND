import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload, message, Typography } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { Container, ProfileCard, AvatarContainer } from './styles';

const { Title } = Typography;

export const EditarPerfil = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Preenche os campos do formulário com os dados do usuário atual
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        nome: user.nome || user.name,
        email: user.email,
        telefone: user.telefone,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Aqui você integrará com a sua rota da API para atualizar o usuário
      // Exemplo: await api.put('/users', values);

      message.success('Perfil atualizado com sucesso!');
      navigate(-1); // Volta para a página anterior
    } catch (error) {
      console.error(error);
      message.error('Erro ao atualizar o perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ProfileCard>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: '1rem', marginLeft: '-16px' }}
        >
          Voltar
        </Button>

        <Title level={3} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Editar Perfil
        </Title>

        <AvatarContainer>
          <Upload
            name="avatar"
            listType="picture-circle"
            showUploadList={false}
            action="/mock-url" // Troque pela URL correta da sua API de upload, se houver
          >
            <div>
              <UserOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div style={{ marginTop: 8, color: '#666' }}>Alterar Foto</div>
            </div>
          </Upload>
        </AvatarContainer>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nome Completo"
            name="nome"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input placeholder="Seu nome" size="large" />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' },
            ]}
          >
            <Input placeholder="seu@email.com" size="large" />
          </Form.Item>

          <Form.Item label="Telefone" name="telefone">
            <Input placeholder="(00) 00000-0000" size="large" />
          </Form.Item>

          <Form.Item
            label="Nova Senha"
            name="senha"
            tooltip="Deixe em branco caso não queira alterar sua senha atual"
          >
            <Input.Password placeholder="Sua nova senha" size="large" />
          </Form.Item>

          <Form.Item style={{ marginTop: '2rem', marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Salvar Alterações
            </Button>
          </Form.Item>
        </Form>
      </ProfileCard>
    </Container>
  );
};
