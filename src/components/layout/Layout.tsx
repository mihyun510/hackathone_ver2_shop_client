import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ minHeight: "80vh", paddingY: 4 }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
