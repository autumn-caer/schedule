import React from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { auth } from "../../../firebase";
import { useActions } from "../../hooks/use-actions";

const PublicRoutes: React.FC<RouteProps> = () => {
  const { logIn } = useActions();

  const { login } = useTypedSelector((state) => state.login);
  return login ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
