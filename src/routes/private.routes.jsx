import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { TelaDoador } from "../pages/TelaDoador";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/doador" element={<TelaDoador />} />
    </Routes>
  );
}
