import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PagoUsuario from "./PagoUsuario";
import Modal from "./Modal";
import "../stylesheets/style.scss";
import "../stylesheets/dashboard.scss";
import "../stylesheets/access.scss";
import useAuth from "./context/AuthContext";
import Session from "./Session";
function Index() {
  const { currentUser } = useAuth();
  return (
    <>
      <Router>
        <Modal>
          <Routes>
            {currentUser ? (
              <Route exact path="/" element={<PagoUsuario />}></Route>
            ) : (
              <Route exact path="/" element={<Session />}></Route>
            )}
          </Routes>
        </Modal>
      </Router>
    </>
  );
}
export default Index;
