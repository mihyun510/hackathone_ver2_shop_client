import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/main/HomePage";

function RootApp() {
  const { user, token } = useAuth();
  const isLoginForm = ["login", "register"].includes(
    useLocation().pathname.substring(1)
  );
  return (
    <Routes>
      {token && !isLoginForm ? (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

const App = () => {
  //const token = localStorage.getItem("token");
  //console.log(token);

  return (
    <Router>
      <AuthProvider>
        <RootApp />
      </AuthProvider>
    </Router>
  );
};

export default App;
