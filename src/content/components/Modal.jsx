import React, { useEffect, useState, useContext } from "react";
import "../stylesheets/modal.scss";
const ModalContext = React.createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

const Modal = ({ children }) => {
  const [message, setMessage] = useState("");
  const [animation, setAnimation] = useState(false);
  const goBack = () => {
    setTimeout(() => {
      setMessage("");
      setAnimation(false);
    }, 400);
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setAnimation(true);
        goBack();
      }, 4000);
    }
  }, [message]);

  return (
    <>
      <ModalContext.Provider value={{ setMessage, message }}>
        {message && (
          <div
            key={message}
            className={`modal ${animation ? "go-back" : "go-in"}`}
          >
            {message}
          </div>
        )}
        {children}
      </ModalContext.Provider>
    </>
  );
};

export default Modal;
