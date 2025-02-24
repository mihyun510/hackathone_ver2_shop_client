import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/main/HomePage";
import ProductPage from "./pages/admin/product/ProductPage";
import { CartProvider } from "./context/CartContext";
import MyPage from "./pages/auth/MyPage";

function RootApp() {
  const { token, user } = useAuth();
  const isLoginForm = ["login", "register"].includes(
    useLocation().pathname.substring(1)
  );

  return (
    <Routes>
      {!token || isLoginForm ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : token && (!user || user.usRole == "USER") ? (
        <>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<Navigate to="/product" />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
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
        <CartProvider>
          <Layout>
            <RootApp />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
