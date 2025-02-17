import React, { ReactNode } from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>{children}</Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
