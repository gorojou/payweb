import React, { useEffect, useState } from "react";
import "../../stylesheets/pago-usuario.scss";
import Loader from "../Loader";
import { useModalContext } from "../Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import bitcoin from "../../images/bitcoin.svg";
import ethereum from "../../images/ethereum.svg";
import wBTC from "../../images/wBTC.svg";
import USDT from "../../images/USDT.svg";
import Navbar from "../Navbar";
import useAuth from "../context/AuthContext";
import { ethers } from "ethers";
import CopyToClipboard from "../CopyToClipboard";
function Index() {
  const { setMessage } = useModalContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [section, setSection] = useState(searchParams.get("red"));
  const [tipo, setTipo] = useState(searchParams.get("tipo"));
  const [amount, setAmount] = useState();
  const { currentUser } = useAuth();
  const balances = {
    bitcoin: 15.48,
    ethereum: 79.15,
    wBTC: 46.12,
    USDT: 7.12,
  };

  useEffect(() => {
    if (!section) setSection("bitcoin");
  }, []);

  const changeSection = (s) => {
    setSection(s);
    navigate(`/?red=${s}`);
  };

  const changeTipo = (t) => {
    setTipo(t);
    navigate(`/?red=${section}&tipo=${t}`);
  };

  const onPay = (e) => {
    e.preventDefault();
    if (!tipo) return setMessage("Seleccione su tipo de pago");
    if (!amount) return setMessage("Asigne una cantidad valida");
    if (amount > balances[section]) return setMessage("Saldo insuficiente");
    if (tipo === "prestamo" && amount > 15.56)
      return setMessage("Cantidad sobrepasa lo necesario");
    setLoading(true);
    setTimeout(() => {
      setMessage("Pago Completado");
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Navbar currentUser={true} style={false} />
      <div className="main-customer-area">
        <div className="main-custumer-box">
          {loading && (
            <>
              <div className="loading-access">
                <Loader />
              </div>
            </>
          )}
          <h1>
            Pagos{" "}
            <span className="material-symbols-outlined notranslate">
              payments
            </span>
          </h1>
          {currentUser.wallet ? (
            <>
              <h3 className="text-center">Metodo de pago</h3>

              <div className="dashboard-nav collapse-d-flex w-100">
                <div
                  className={`payment-type  ${
                    section === "bitcoin" && "payment-type-active"
                  }`}
                  onClick={() => {
                    changeSection("bitcoin");
                  }}
                >
                  <img src={bitcoin} alt="" />
                </div>
                <div
                  className={`payment-type  ${
                    section === "ethereum" && "payment-type-active"
                  }`}
                  onClick={() => {
                    changeSection("ethereum");
                  }}
                >
                  <img src={ethereum} alt="" />
                </div>
                <div
                  className={`payment-type  ${
                    section === "wBTC" && "payment-type-active"
                  }`}
                  onClick={() => {
                    changeSection("wBTC");
                  }}
                >
                  <img src={wBTC} alt="" />
                </div>
                <div
                  className={`payment-type  ${
                    section === "USDT" && "payment-type-active"
                  }`}
                  onClick={() => {
                    changeSection("USDT");
                  }}
                >
                  <img src={USDT} alt="" />
                </div>
              </div>
              <h3 className="mt-0">Balance: {balances[section]}</h3>
              <form
                className="form"
                onSubmit={(e) => {
                  onPay(e);
                }}
              >
                <div className="dashboard-nav collapse-d-flex w-100">
                  <div
                    className={`payment-type  ${
                      tipo === "prestamo" && "payment-type-active"
                    }`}
                    onClick={() => {
                      changeTipo("prestamo");
                    }}
                  >
                    <span className="material-symbols-outlined notranslate">
                      credit_score
                    </span>
                  </div>
                  <div
                    className={`payment-type  ${
                      tipo === "terceros" && "payment-type-active"
                    }`}
                    onClick={() => {
                      changeTipo("terceros");
                    }}
                  >
                    <span className="material-symbols-outlined notranslate">
                      swap_horizontal_circle
                    </span>
                  </div>
                </div>
                {tipo ? (
                  tipo === "terceros" ? (
                    <Terceros />
                  ) : (
                    <Prestamo />
                  )
                ) : (
                  <></>
                )}
                <h3 className="">Cantidad a pagar</h3>
                <div className="amount-input-area mb-10">
                  <input
                    type="number"
                    className="costumer-amount"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step=".01"
                  />
                </div>
                <button type="submit" className="main-customer-button">
                  <h3>Efectuar Pago</h3>
                </button>
              </form>
            </>
          ) : (
            <>
              <GenerarWallet />
            </>
          )}
        </div>
      </div>
    </>
  );
}
const Prestamo = ({ balance }) => {
  return (
    <>
      <p>Debes un total de:</p>
      <h3>15.56 USD</h3>
    </>
  );
};
const Terceros = () => {
  return (
    <>
      <p>Introduce el correo de la persona a transferir</p>
      <div className="form-input-area">
        <input
          type="email"
          required
          className="text-center"
          placeholder="Correo"
        />
      </div>
    </>
  );
};
const GenerarWallet = () => {
  const { createWallet } = useAuth();
  const [wallet, setWallet] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const generate = () => {
    const wallet = ethers.Wallet.createRandom();
    setWallet(wallet);
  };
  const create = async () => {
    setLoading(true);
    setErr("");
    try {
      await createWallet(wallet);
    } catch (err) {
      setErr(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      <h3 className="text-center">Primero crea una wallet</h3>
      {wallet && <CopyToClipboard value={wallet.address} />}
      {err && <small className="err">{err}</small>}
      <button
        className="main-customer-button"
        onClick={async () => (wallet ? create() : generate())}
      >
        <h3>{wallet ? "Guardar Wallet" : " Generar Wallet"}</h3>
      </button>
      {loading && (
        <>
          <div className="loading-access">
            <Loader />
          </div>
        </>
      )}
    </>
  );
};
export default Index;
