import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { auth, firestore, storage } from "../../../firebase";
const AuthContext = React.createContext();
export default function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children, navigation }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const logIn = async (email, password) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === "auth/wrong-password")
        throw { message: "Datos invalidos" };
      if (err.code === "auth/user-not-found")
        throw { message: "Usuario no existe" };
      throw err;
    }
  };
  const createWallet = async (wallet) => {
    await firestore
      .collection("users")
      .doc(currentUser.user.uid)
      .update({
        wallet: {
          publicKey: wallet.address,
          privKey: wallet.privateKey,
          mnemonic: wallet.mnemonic,
        },
      });
    await updateProfile();
  };
  const updateProfile = async () => {
    setLoading(true);
    try {
      const userDoc = await firestore
        .collection("users")
        .doc(currentUser.user.uid)
        .get();
      setCurrentUser({ user: currentUser.user, ...userDoc.data() });
      setLoading(false);
    } catch (err) {
      console.log(err);
      // Alert("Hubo un error");
      await logOut();
    }
  };
  const selectType = async (type) => {
    const doc = await firestore
      .collection("users")
      .doc(currentUser.user.uid)
      .update({ type: type });
    await updateProfile();
    return doc;
  };
  const signUp = async (form) => {
    const {
      nombre,
      apellidoP,
      apellidoM,
      email,
      telefono,
      password,
      confirmPass,
      dia,
      mes,
      year,
    } = form;
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);

      try {
        const userDocRef = await firestore
          .collection("users")
          .doc(user.user.uid)
          .set({
            telefono,
            nombre,
            nacimiento: {
              d: dia,
              m: mes,
              a: year,
            },
            date: new Date().toUTCString(),
            type: "",
            apellidos: {
              materno: apellidoM,
              paterno: apellidoP,
            },
          });
      } catch (err) {
        await user.user.delete();
        logOut();
        console.log(err);
        throw { message: "Algo salio mal, intente nuevamente" };
      }
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use")
        throw { message: "Correo ingresado ya esta registrado" };
      throw err;
    }
  };
  const logOut = async (goToStart) => {
    setLoading(true);
    await auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        try {
          const userDoc = await firestore
            .collection("users")
            .doc(user.uid)
            .get();
          setCurrentUser({ user: user, ...userDoc.data() });
          setLoading(false);
        } catch (err) {
          // Alert("Algo salio mal");
        }
      } else {
        setCurrentUser(user);
        console.log(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    signUp,
    currentUser,
    logIn,
    logOut,
    selectType,
    updateProfile,
    createWallet,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              position: "absolute",
            }}
          >
            <Loader size={100} />
          </div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
