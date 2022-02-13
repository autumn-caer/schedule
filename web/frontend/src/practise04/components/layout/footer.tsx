import React, { useRef, useState, useEffect } from "react";
import classNameNamees from "./Header.module.css";

const Footer: React.FC = () => {
  return (
    <div className="hero-foot" style={{ marginTop: "10%" }}>
      <nav className="tabs is-centered">
        <div className="container">
          <ul>
            <li className="is-active">
              <a>Overview</a>
            </li>
            <li>
              <a>Modifiers</a>
            </li>
            <li>
              <a>Grid</a>
            </li>
            <li>
              <a>Elements</a>
            </li>
            <li>
              <a>Components</a>
            </li>
            <li>
              <a>Layout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
