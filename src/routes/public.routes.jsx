import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home";
import { useAuth } from "../hooks/useAuth";

export function PublicRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
        </>
      )}
    </Routes>
  );
}
