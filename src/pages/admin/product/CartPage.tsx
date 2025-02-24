import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useCart } from "../../../context/CartContext"; // 장바구니 Context를 가져옴

const CartPage = () => {
  const { cart, handleRemoveFromCart } = useCart(); // 장바구니 상태와 제거 함수

  if (cart.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          장바구니
        </Typography>
        <Typography variant="h6">장바구니에 상품이 없습니다.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        장바구니
      </Typography>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item key={item.pdCd} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.pdNm}</Typography>
                <Typography variant="body2" color="text.secondary">
                  가격: {item.pdPri} 원
                </Typography>
                <Button
                  onClick={() => handleRemoveFromCart(item.pdCd)}
                  color="error"
                  variant="outlined"
                  fullWidth
                >
                  삭제
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CartPage;
