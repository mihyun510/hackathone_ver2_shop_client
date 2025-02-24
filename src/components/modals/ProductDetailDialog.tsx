import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
import { Product } from "../../api/productApi";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

interface ProductDetailDialogProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductDetailDialog = ({
  open,
  product,
  onClose,
}: ProductDetailDialogProps) => {
  const { handleAddToCart } = useCart(); // CartContext에서 addToCart 가져오기

  // 장바구니에 상품 추가
  const handleAddToCartClick = () => {
    if (product) {
      handleAddToCart(product); // CartContext를 통해 장바구니에 추가
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product?.pdNm}</DialogTitle>
      <DialogContent>
        {product && (
          <>
            <CardMedia
              component="img"
              height="200"
              image={product.filePath}
              alt={product.pdNm}
              sx={{ borderRadius: 2, marginBottom: 2 }}
            />
            <Typography variant="body1">가격: {product.pdPri} 원</Typography>
            <Typography variant="body2" color="text.secondary">
              상품 설명: {product.pdDesc || "설명 없음"}
            </Typography>
            <Button
              onClick={() => handleAddToCartClick()} // 장바구니에 상품 추가
              color="primary"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              장바구니에 추가
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailDialog;
