import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <PublicRoutes />
      {isAuthenticated ?? <PrivateRoutes />}
    </BrowserRouter>
  );
}
