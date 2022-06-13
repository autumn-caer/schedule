import React, { useState } from "react";
import * as FIREBASE_FUNC from "../../utils/firebase_function";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../atoms/confirm_modal";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/use-actions";

const Header: React.FC = () => {
  const [is_nav_menu_show, set_is_nav_menu_show] = useState<boolean>(false);
  const [show_modal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signOut } = useActions();

  const nav_bar_show_handler = () => {
    set_is_nav_menu_show(!is_nav_menu_show);
  };

  const signOutHandler = async () => {
    const user_info = await FIREBASE_FUNC.signOutFirebase();

    if (user_info.error_message) {
      alert(user_info.error_message);
      setShowModal(false);
      return;
    }

    signOut();
    setShowModal(false);
    navigate("/signin");
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand" style={{ alignItems: "center" }}>
            <Link to={`/`}>
              <h2 className="subtitle">ZOMBIE KAKIZOME</h2>
            </Link>

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
              <Link to={`/`} className="navbar-item is-active">
                Home
              </Link>
              <Link to={`/`} className="navbar-item">
                Examples
              </Link>
              <Link to={`/`} className="navbar-item">
                Documentation
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">More</div>
                <div id="moreDropdown" className="navbar-dropdown ">
                  <Link to={`/`} className="navbar-item">
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
                  </Link>
                </div>
              </div>
              <span className="navbar-item">
                <div
                  className="button is-primary is-inverted"
                  onClick={() => setShowModal(true)}
                >
                  <span className="icon">
                    <i className="fab fa-github"></i>
                  </span>
                  <span>Sign Out</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        show_modal={show_modal}
        setShowModal={setShowModal}
        confirmSubmit={signOutHandler}
        message="サインアウトしますか？"
      />
    </React.Fragment>
  );
};

export default Header;
