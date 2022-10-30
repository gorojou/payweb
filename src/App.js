import Router from "./content/components/Router";
import { AuthProvider } from "./content/components/context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
