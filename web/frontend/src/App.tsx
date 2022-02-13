import React from "react";
import "bulmaswatch/pulse/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from "./practise04/components/layout/header";
import Footer from "./practise04/components/layout/footer";
import TopDisplay from "./practise04/components/top_display";

const App = () => {
  return (
    <div>
      <Header />
      <div className="hero ">
        <div className="hero-body">
          <TopDisplay />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
