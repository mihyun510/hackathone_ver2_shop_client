import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // 장바구니 아이콘
import { useAuth } from "../../context/AuthContext"; // 인증 관련 context
import { useCart } from "../../context/CartContext"; // 장바구니 context
import CartDrawer from "./CartDrawer"; // CartDrawer 컴포넌트
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const { user, logout } = useAuth();
  const { cart } = useCart(); // 장바구니 상태
  const [openCartDrawer, setOpenCartDrawer] = useState(false); // 장바구니 Drawer 열기/닫기 상태

  // 장바구니 Drawer 열기
  const handleCartOpen = () => {
    setOpenCartDrawer(true);
  };

  // 장바구니 Drawer 닫기
  const handleCartClose = () => {
    setOpenCartDrawer(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/product")}
          >
            My Shopping Mall
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {user.usNm}님 환영합니다!
              </Typography>
              <Button
                color="inherit"
                onClick={() => navigate("/mypage")}
                sx={{ marginRight: 2 }}
              >
                마이페이지
              </Button>
              <Button color="inherit" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button color="inherit" href="/login">
              로그인
            </Button>
          )}
          {/* 장바구니 아이콘 */}
          <IconButton color="inherit" onClick={handleCartOpen}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
      {/* 장바구니 Drawer */}
      <CartDrawer open={openCartDrawer} onClose={handleCartClose} cart={cart} />
    </AppBar>
  );
};

export default Header;
