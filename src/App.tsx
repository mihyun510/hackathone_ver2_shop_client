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
  //console.log(token);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* No routes matched location '/home' 오류 해결 무조건 있어야되나보나 토큰이 없는 경우 존재하지 않는 url로 접근했을경우 저리 로직 */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<HomePage />} />
              {/* 존재하지 않는 url로 이동하면 /로 이동함. */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
