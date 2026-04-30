import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { TelaDoador } from '../pages/TelaDoador';
import { TelaRecebedor } from '../pages/TelaRecebedor';
import { EditarPerfil } from '../pages/EditarPerfil';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/doador" element={<TelaDoador />} />
      <Route path="/recebedor" element={<TelaRecebedor />} />
      <Route path="/perfil" element={<EditarPerfil />} />
    </Routes>
  );
}
