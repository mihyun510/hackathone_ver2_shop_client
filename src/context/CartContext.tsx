import React, { createContext, useContext, useState } from "react";
import { CartProduct, Product } from "../api/productApi";

interface CartContextType {
  cart: CartProduct[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (pdCd: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  // 장바구니에 상품 추가
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.pdCd === product.pdCd
      );

      if (existingProductIndex >= 0) {
        // 이미 장바구니에 같은 상품이 있으면 수량 증가
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return updatedCart;
      }

      // 없으면 새로운 상품 추가
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 장바구니에서 상품 제거
  const handleRemoveFromCart = (pdCd: string) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.pdCd === pdCd
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        if (updatedCart[existingProductIndex].quantity > 1) {
          // 수량이 1보다 크면 수량을 하나 줄임
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            quantity: updatedCart[existingProductIndex].quantity - 1,
          };
          return updatedCart;
        } else {
          // 수량이 1이면 상품을 삭제
          updatedCart.splice(existingProductIndex, 1);
          return updatedCart;
        }
      }

      return prevCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
