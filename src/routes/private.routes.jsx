import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { TelaDoador } from '../pages/TelaDoador';
import { TelaRecebedor } from '../pages/TelaRecebedor';
import { EditarPerfil } from '../pages/EditarPerfil';
import { Chat } from '../pages/Chat';
import { TelaHistorico } from '../pages/TelaHistorico';
import { Admin } from '../pages/Admin';
import { useAuth } from '../hooks/useAuth';
export function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/doador" element={<TelaDoador />} />
      <Route path="/recebedor" element={<TelaRecebedor />} />
      <Route path="/perfil" element={<EditarPerfil />} />
      <Route path="/chat/:solicitacaoId" element={<Chat />} />
      <Route path="/historico" element={<TelaHistorico />} />

      {user.isAdmin && <Route path="/admin" element={<Admin />} />}
    </Routes>
  );
}
