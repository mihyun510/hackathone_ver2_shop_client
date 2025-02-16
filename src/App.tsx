import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/main/HomePage";

const App = () => {
  //const { user } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              {/* 존재하지 않는 url로 이동하면 /로 이동함. */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
