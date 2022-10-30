import React, { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useSearchParams } from "react-router-dom";
import "../../stylesheets/access.scss";
function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState(searchParams.get("form") === "0");

  return (
    <>
      <div className="main">
        <div className="access-box">
          <div className="access-form-container">
            <div className="access-form">
              <div className="select-form">
                <div
                  className={`select-form-button signIn ${
                    form ? "active-section" : ""
                  }`}
                  onClick={() => setForm(true)}
                >
                  <h2>Registro</h2>
                </div>
                <div
                  className={`select-form-button logIn ${
                    !form ? "active-section" : ""
                  }`}
                  onClick={() => setForm(false)}
                >
                  <h2>Ingreso</h2>
                </div>
              </div>
              {form ? <Register></Register> : <Login></Login>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
