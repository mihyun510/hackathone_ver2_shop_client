import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 5,
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body2">
          © 2025 My Shopping Mall. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
