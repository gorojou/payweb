import React, { useState } from "react";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import useAuth from "../context/AuthContext";
function Register() {
  const [err, setErr] = useState();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    email: "",
    telefono: "",
    password: "",
    confirmPass: "",
    dia: "",
    mes: "",
    year: "",
  });
  const createUser = async () => {
    if (register.email && register.password) {
      setLoading(true);
      try {
        await signUp(register);
      } catch (error) {
        setLoading(false);
        setErr(error.message);
      }
    } else {
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegister((prevState) => ({
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
      <form
        className="form"
        id="signIn"
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <div className="err-message-sign-in">
          <small>{err}</small>
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="text"
            name="name"
            id="nombre"
            required="true"
            value={register.nombre}
            onChange={handleChange}
            placeholder="Nombre(s)"
          />
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="text"
            name="apellidoP"
            id="apellidoP"
            required="true"
            value={register.apellidoP}
            onChange={handleChange}
            placeholder="Apellido Paterno"
          />
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="text"
            name="apellidoM"
            id="apellidoM"
            required="true"
            value={register.apellidoM}
            onChange={handleChange}
            placeholder="Apellido Paterno"
          />
        </div>
        <h4>Fecha de nacimiento</h4>
        <div className="fecha-nacimiento-inputs">
          <input
            type="number"
            placeholder="DD"
            id="dia"
            value={register.dia}
            onChange={(val) => {
              const value = val.target.value;
              setRegister((prev) => {
                if (value.length > 2 || value.length < 0) return { ...prev };
                if (value > 31) return { ...prev, dia: "01" };
                return { ...prev, dia: value };
              });
            }}
          />
          <input
            type="number"
            placeholder="MM"
            id="mes"
            value={register.mes}
            onChange={(val) => {
              const value = val.target.value;
              setRegister((prev) => {
                if (value.length > 2 || value.length < 0) return { ...prev };
                if (value > 12) return { ...prev, mes: "01" };
                return { ...prev, mes: value };
              });
            }}
          />
          <input
            type="number"
            placeholder="AAAA"
            id="year"
            value={register.year}
            onChange={(val) => {
              const value = val.target.value;
              setRegister((prev) => {
                if (value.length > 4 || value.length < 0) return { ...prev };
                return { ...prev, year: value };
              });
            }}
          />
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="email"
            name="email"
            id="email"
            required="true"
            value={register.email}
            onChange={handleChange}
            placeholder="Correo"
          />
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="number"
            name="telefono"
            id="telefono"
            required="true"
            value={register.telefono}
            onChange={handleChange}
            placeholder="Telefono"
          />
        </div>
        <div className="form-input-area">
          <Input
            className={"w-100"}
            type="password"
            name="password"
            id="password"
            value={register.password}
            onChange={handleChange}
            required="true"
            placeholder="Constraseña"
          />
        </div>
        <small>
          Al hacer clic en “Registrate”, usted acepta la política de privacidad
          de <a href="/">Binkio</a>
        </small>
        <button type="submit" className="main-button">
          <h4>Registrate</h4>
        </button>
      </form>
    </>
  );
}

export default Register;
