import React from "react";
import { Outlet, Navigate, RouteProps } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";

const PrivateRoutes: React.FC<RouteProps> = () => {
  const { login } = useTypedSelector((state) => state.login);
  return login ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
