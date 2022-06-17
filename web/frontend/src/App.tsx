import React, { useLayoutEffect, ReactElement, useEffect } from "react";
import "bulmaswatch/pulse/bulmaswatch.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./practise04/state";
import Header from "./practise04/components/layout/header";
import Footer from "./practise04/components/layout/footer";

import PublicRoutes from "./practise04/components/routes/public_route";
import PrivateRoutes from "./practise04/components/routes/private_route";

import TopDisplay from "./practise04/pages/top_display";
import TaskRegister from "./practise04/pages/task_register";
import SignUp from "./practise04/pages/sign_up";
import SignIn from "./practise04/pages/sign_in";

import CategoryRegister from "./practise04/pages/category_register";
import { Routes, Route, useLocation } from "react-router-dom";

const ScrolllTopWrapper = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <div className="hero ">
          <div className="hero-body">
            <ScrolllTopWrapper>
              <Routes>
                <Route path="signin" element={<PublicRoutes />}>
                  <Route path="" element={<SignIn />} />
                  <Route path="new" element={<SignUp />} />
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                  <Route path="" element={<TopDisplay />} />
                  <Route path="task">
                    <Route
                      path=":category_id"
                      element={<TaskRegister />}
                    ></Route>
                    <Route
                      path=":category_id/:id"
                      element={<TaskRegister />}
                    ></Route>
                  </Route>
                  <Route path="category">
                    <Route path="" element={<CategoryRegister />}></Route>
                    <Route path=":id" element={<CategoryRegister />}></Route>
                  </Route>
                </Route>
              </Routes>
            </ScrolllTopWrapper>
          </div>
        </div>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
