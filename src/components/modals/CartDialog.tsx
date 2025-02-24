import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../api/productApi";

interface CartDialogProps {
  open: boolean;
  cartItems: Product[];
  onClose: () => void;
  onRemove: (pdCd: string) => void;
}

const CartDialog = ({
  open,
  cartItems,
  onClose,
  onRemove,
}: CartDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>장바구니</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography>장바구니가 비어 있습니다.</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.pdCd}>
                <ListItemText
                  primary={item.pdNm}
                  secondary={`가격: ${item.pdPri} 원`}
                />
                <IconButton onClick={() => onRemove(item.pdCd)} color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
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

export default CartDialog;
