import React, { ReactNode } from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default App;
