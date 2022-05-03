import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="hero-foot" style={{ marginTop: "10%" }}>
      <nav className="tabs is-centered">
        <div className="container">
          <ul>
            <li className="is-active">
              <a href="/">Overview</a>
            </li>
            <li>
              <a href="/">Modifiers</a>
            </li>
            <li>
              <a href="/">Grid</a>
            </li>
            <li>
              <a href="/">Elements</a>
            </li>
            <li>
              <a href="/">Components</a>
            </li>
            <li>
              <a href="/">Layout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
