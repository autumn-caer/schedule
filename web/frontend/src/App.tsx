import React from "react";
import "bulmaswatch/pulse/bulmaswatch.min.css";
import "react-datepicker/dist/react-datepicker.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./practise04/state";
import Header from "./practise04/components/layout/header";
import Footer from "./practise04/components/layout/footer";
import TopDisplay from "./practise04/components/top_display";
import TaskRegister from "./practise04/pages/task_register";
import CategoryRegister from "./practise04/pages/category_register";
import ext_img2_0 from "./practise04/assets/images/ext_img2_0.png";
import ext_img2_1 from "./practise04/assets/images/ext_img2_1.png";
import ext_img2_2 from "./practise04/assets/images/ext_img2_2.png";
import ext_img2_3 from "./practise04/assets/images/ext_img2_3.png";
import { imageTag } from "./practise04/types/types";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const ext_imaages: imageTag[] = [
    { source: ext_img2_0, name: "01" },
    { source: ext_img2_1, name: "02" },
    { source: ext_img2_2, name: "03" },
    { source: ext_img2_3, name: "04" },
  ];
  return (
    <div>
      <Provider store={store}>
        <Header />
        <div className="hero ">
          <div className="hero-body">
            <Routes>
              <Route path="/" element={<TopDisplay />} />
              <Route path="/task">
                <Route path="" element={<TaskRegister />}></Route>
                <Route path=":id" element={<TaskRegister />}></Route>
              </Route>

              <Route
                path="/category"
                element={
                  <CategoryRegister
                    title={"category_register"}
                    image_tags={ext_imaages}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
