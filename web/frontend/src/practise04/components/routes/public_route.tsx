import React from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";

const PublicRoutes: React.FC<RouteProps> = () => {
  const { login } = useTypedSelector((state) => state.login);
  return login ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
