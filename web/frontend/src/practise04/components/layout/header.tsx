import React, { useRef, useState, useEffect } from "react";
import classNameNamees from "./Header.module.css";

const Header: React.FC = () => {
  const [is_nav_menu_show, set_is_nav_menu_show] = useState<boolean>(false);

  const nav_bar_show_handler = () => {
    set_is_nav_menu_show(!is_nav_menu_show);
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <h2 className="subtitle">ZOMBIE KAKIZOME</h2>
            </a>
            <span
              className={`navbar-burger burger ${
                is_nav_menu_show ? "is-active" : ""
              }`}
              data-target="navbarMenuHero1"
              onClick={nav_bar_show_handler}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div
            id="navbarMenuHero1"
            className={`navbar-menu ${is_nav_menu_show ? "is-active" : ""}`}
          >
            <div className="navbar-end">
              <a className="navbar-item is-active">Home</a>
              <a className="navbar-item">Examples</a>
              <a className="navbar-item">Documentation</a>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">More</div>
                <div id="moreDropdown" className="navbar-dropdown ">
                  <a className="navbar-item " href="#">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <p>
                            <strong>Extensions</strong>
                            <br />
                            <small>Side projects to enhance Bulma</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <span className="navbar-item">
                <a className="button is-primary is-inverted">
                  <span className="icon">
                    <i className="fab fa-github"></i>
                  </span>
                  <span>Download</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
