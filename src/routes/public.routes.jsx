import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
