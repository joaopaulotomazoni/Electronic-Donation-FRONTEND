import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './useAuth';

const SOCKET_URL = import.meta.env.VITE_API_URL;

export const useSocket = (solicitacaoId, usuarioId) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!solicitacaoId) return;

    // Conectar ao socket
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    // Entrar na sala
    socketRef.current.emit('joinRoom', { solicitacaoId });

    socketRef.current.on('newMessage', (message) => {
      if (message.usuarioId !== user.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [solicitacaoId, user.id]);

  const sendMessage = (conteudo) => {
    if (socketRef.current && conteudo.trim()) {
      const messageData = {
        solicitacaoId,
        usuarioId,
        conteudo,
        createdAt: new Date().toISOString(),
      };

      socketRef.current.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, messageData]);
    }
  };

  return { messages, setMessages, sendMessage };
};
