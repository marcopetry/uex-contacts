import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    displayLarge: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displaySmall: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleSmall: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodySmall: React.CSSProperties;
    labelLarge: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelSmall: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    displayLarge?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    headlineLarge?: React.CSSProperties;
    headlineMedium?: React.CSSProperties;
    headlineSmall?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    titleMedium?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#6750A4" }, // Cor do MD3
    secondary: { main: "#625B71" },
    background: { default: "#F4EFF4", paper: "#FFFFFF" },
    error: { main: "#B3261E" },
    warning: { main: "#F57C00" },
    info: { main: "#0277BD" },
    success: { main: "#388E3C" },
  },
  shape: {
    borderRadius: 12, // Bordas mais arredondadas do MD3
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    displayLarge: { fontSize: "57px", fontWeight: 400 },
    displayMedium: { fontSize: "45px", fontWeight: 400 },
    displaySmall: { fontSize: "36px", fontWeight: 400 },
    headlineLarge: { fontSize: "32px", fontWeight: 400 },
    headlineMedium: { fontSize: "28px", fontWeight: 400 },
    headlineSmall: { fontSize: "24px", fontWeight: 400 },
    titleLarge: { fontSize: "22px", fontWeight: 500 },
    titleMedium: { fontSize: "16px", fontWeight: 500 },
    titleSmall: { fontSize: "14px", fontWeight: 500 },
    bodyLarge: { fontSize: "16px", fontWeight: 400 },
    bodyMedium: { fontSize: "14px", fontWeight: 400 },
    bodySmall: { fontSize: "12px", fontWeight: 400 },
    labelLarge: { fontSize: "14px", fontWeight: 500 },
    labelMedium: { fontSize: "12px", fontWeight: 500 },
    labelSmall: { fontSize: "11px", fontWeight: 500 },
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.15)", // Elevação 1
    "0px 2px 4px rgba(0, 0, 0, 0.15)", // Elevação 2
    "0px 3px 5px rgba(0, 0, 0, 0.2)", // Elevação 3
    "0px 4px 6px rgba(0, 0, 0, 0.2)", // Elevação 4
    "0px 5px 8px rgba(0, 0, 0, 0.25)", // Elevação 5
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ] as const,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
          padding: "10px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
        },
      },
    },
  },
});

export default theme;
