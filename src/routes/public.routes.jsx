import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
