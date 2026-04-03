import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Cadastro />} />
    </Routes>
  );
}
