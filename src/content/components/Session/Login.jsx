import React, { useState } from "react";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import useAuth from "../context/AuthContext";
function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(login.email, login.password);
    } catch (err) {
      setLoading(false);
      setErr(err.message);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <>
      {loading && (
        <>
          <div className="loading-access">
            <Loader />
          </div>
        </>
      )}
      <form className="form" id="login" onSubmit={loginUser}>
        <div className="err-message-log-in">
          <small>{err}</small>
        </div>
        <div className="form-input-area">
          <Input
            className="w-100"
            type="email"
            value={login.email}
            onChange={handleChange}
            required
            id="email"
            placeholder="Correo"
          />
        </div>
        <div className="form-input-area">
          <Input
            className="w-100"
            type="password"
            required
            value={login.password}
            onChange={handleChange}
            id="password"
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className="main-button">
          <h4>Ingresa</h4>
        </button>
      </form>
    </>
  );
}

export default Login;
