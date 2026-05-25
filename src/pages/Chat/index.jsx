import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Typography, Spin, Empty } from 'antd';
import { SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../hooks/useAuth';
import { useSocket } from '../../hooks/useSocket';
import { api } from '../../services/api';

import {
  Container,
  ChatWindow,
  MessageList,
  MessageBubble,
  MessageTime,
  InputArea,
  Header,
} from './styles';

const { Title } = Typography;

export function Chat() {
  const { solicitacaoId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const solicitacao = location.state?.item;

  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, sendMessage } = useSocket(
    solicitacaoId,
    user.id
  );

  const messageListRef = useRef(null);

  useEffect(() => {
    async function fetchSolicitacao() {
      try {
        setLoading(true);
        const historyResponse = await api.get(
          `/chat/${solicitacaoId}/messages`
        );

        const historicalMessages = historyResponse.data;

        const formattedHistoricalMessages = historicalMessages.map(
          (message) => {
            return {
              solicitacaoId: message.id_solicitacao,
              usuarioId: message.id_remetente,
              conteudo: message.conteudo,
              createdAt: message.created_at,
            };
          }
        );

        setMessages(formattedHistoricalMessages);
      } catch (error) {
        console.error('Erro ao carregar detalhes da solicitação:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitacao();
  }, [solicitacaoId, setMessages]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <ChatWindow>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
            <Title level={4} style={{ margin: 0 }}>
              Chat:{' '}
              {solicitacao?.dispositivo?.nome_dispositivo ||
                solicitacao?.dispositivos?.nome_dispositivo ||
                'Dispositivo'}
            </Title>
          </div>
        </Header>

        <MessageList ref={messageListRef}>
          {messages.length === 0 ? (
            <Empty description="Nenhuma mensagem ainda. Inicie a conversa!" />
          ) : (
            messages.map((msg, index) => (
              <MessageBubble key={index} isOwn={msg.usuarioId === user.id}>
                {msg.conteudo}
                <MessageTime>
                  {new Date(msg.createdAt || msg.created_at).toLocaleTimeString(
                    [],
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </MessageTime>
              </MessageBubble>
            ))
          )}
        </MessageList>

        <InputArea>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            Enviar
          </Button>
        </InputArea>
      </ChatWindow>
    </Container>
  );
}
