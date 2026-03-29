import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
