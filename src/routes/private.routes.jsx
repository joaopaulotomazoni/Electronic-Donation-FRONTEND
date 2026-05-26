import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { TelaDoador } from '../pages/TelaDoador';
import { TelaRecebedor } from '../pages/TelaRecebedor';
import { EditarPerfil } from '../pages/EditarPerfil';
<<<<<<< Updated upstream
import { Chat } from '../pages/Chat';
=======
import { TelaHistorico } from '../pages/TelaHistorico';
>>>>>>> Stashed changes

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/doador" element={<TelaDoador />} />
      <Route path="/recebedor" element={<TelaRecebedor />} />
      <Route path="/perfil" element={<EditarPerfil />} />
<<<<<<< Updated upstream
      <Route path="/chat/:solicitacaoId" element={<Chat />} />
=======
      <Route path="/historico" element={<TelaHistorico />} />
>>>>>>> Stashed changes
    </Routes>
  );
}
