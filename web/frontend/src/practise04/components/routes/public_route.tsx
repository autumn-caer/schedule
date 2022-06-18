import React, { useEffect, useState } from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { auth } from "../../../firebase";
import { useActions } from "../../hooks/use-actions";
import * as FIREBASE_FUNC from "../../utils/firebase_function";

const PublicRoutes: React.FC<RouteProps> = () => {
  const { logIn } = useActions();
  const { login } = useTypedSelector((state) => state.login);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const initLoginData = async () => {
      const unsubscribe = await auth.onAuthStateChanged(async function (user) {
        if (user && user.email && user.uid) {
          logIn(
            user.email,
            user.uid,
            await FIREBASE_FUNC.fetchUserId(user.uid)
          );
        }

        setAuthChecked(true);
      });
      unsubscribe();
    };

    initLoginData();
  }, []);

  console.log(authChecked);

  return authChecked ? login ? <Navigate to="/" /> : <Outlet /> : <></>;
};

export default PublicRoutes;
