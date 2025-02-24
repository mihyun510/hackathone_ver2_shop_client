import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CartProduct, Product } from "../../api/productApi"; // 상품 타입
import DeleteIcon from "@mui/icons-material/Delete"; // 삭제 아이콘
import { useCart } from "../../context/CartContext";

interface CartDrawerProps {
  open: boolean; // Drawer의 열림 상태
  onClose: () => void; // Drawer 닫는 함수
  cart: CartProduct[]; // 장바구니 상품 목록
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, cart }) => {
  const { handleRemoveFromCart } = useCart(); // CartContext에서 handleRemoveFromCart 가져오기

  // 상품 삭제 함수
  const handleRemove = (pdCd: string) => {
    handleRemoveFromCart(pdCd); // CartContext를 통해 상품 삭제
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
        style={{ width: 300 }}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          장바구니
        </Typography>
        <List>
          {cart.length === 0 ? (
            <ListItem>
              <ListItemText primary="장바구니에 상품이 없습니다." />
            </ListItem>
          ) : (
            cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.pdNm}
                  secondary={`가격: ${item.pdPri} | 수량: ${item.quantity}`}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleRemove(item.pdCd)} // 삭제 버튼 클릭 시 상품 삭제
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
