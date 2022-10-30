import React, { useState } from "react";
import "../stylesheets/navbar.scss";
import { Link } from "react-router-dom";
import pfp from "../images/blankpfp.jpg";
import logo from "../images/Binkio_Pay (1).png";
import useAuth from "./context/AuthContext";
function Navbar({ style }) {
  const { currentUser, logOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className={style ? "navbar" : "i-navbar"}>
        <div className="title">
          <img src={logo} alt="" srcset="" />
        </div>
        <div className="access-navlinks">
          {currentUser ? (
            <>
              <div className="pfp-container">
                {showMenu && (
                  <div className="user-menu">
                    <div onClick={() => logOut()}>Cerrar sesión</div>
                  </div>
                )}
                <p>{currentUser.nombre}</p>
                <img
                  src={currentUser.pfp ? currentUser.pfp : pfp}
                  alt=""
                  srcset=""
                  onClick={() => setShowMenu(!showMenu)}
                />
              </div>
            </>
          ) : (
            <>
              <Link to={"/access?form=1"}>Ingresa</Link>
              <Link to={"/access?form=0"}>
                <u>Registrate</u>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
