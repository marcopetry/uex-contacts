import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CookiesKeys, useCookie } from "../../hooks/use-cookies";
import { Link, useLocation, useRouter } from "@tanstack/react-router";

export const TopAppBar = () => {
  const { cookieValue, removeCookie } = useCookie(CookiesKeys.Auth);

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { navigate } = useRouter();

  const toLogin = () => {
    if (cookieValue) {
      removeCookie();
    }
    navigate({ to: "/login" });
  };

  return (
    <Box sx={{ flexGrow: 1 }} key={pathname}>
      <AppBar position="fixed" style={{ width: "100%" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/contacts" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Aplicativo de contatos
            </Typography>
          </Link>

          <Button
            color="inherit"
            type="button"
            onClick={toLogin}
            sx={{ ml: "auto" }}
          >
            {cookieValue ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
