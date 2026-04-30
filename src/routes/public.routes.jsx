import { Routes, Route } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { Home } from '../pages/Home';
import { useAuth } from '../hooks/useAuth';
import { Email } from '../pages/RecuperarSenha/Email';
import { NovaSenha } from '../pages/RecuperarSenha/NovaSenha';
import { ConfirmarCodigo } from '../pages/RecuperarSenha/ConfirmarCodigo/index.jsx';

export function PublicRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
          <Route path="/recuperar-senha/email" element={<Email />} />
          <Route
            path="/recuperar-senha/codigo-verificacao"
            element={<ConfirmarCodigo />}
          />
          <Route path="/recuperar-senha/nova-senha" element={<NovaSenha />} />
        </>
      )}
    </Routes>
  );
}
