import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CookiesKeys, useCookie } from "../../hooks/use-cookies";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { DialogConfirmation } from "../dialog-confirmation";
import { useDeleteUser } from "../../hooks/use-delete-user";
import { useDisclousure } from "../../hooks/use-disclousure";
import { SimpleSnackbar } from "../simple-snack-bar/simple-snack-bar";

export const TopAppBar = () => {
  const { cookieValue, removeCookie } = useCookie(CookiesKeys.Auth);

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { isOpen, onClose, onOpen } = useDisclousure();

  const { onDelete, ...snackbarProps } = useDeleteUser();

  const { navigate } = useRouter();

  const toLogin = () => {
    if (cookieValue) {
      removeCookie();
    }
    navigate({ to: "/login" });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }} key={pathname}>
      <AppBar position="fixed" style={{ width: "100%" }}>
        <Toolbar>
          <Link to="/contacts" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Aplicativo de contatos
            </Typography>
          </Link>

          {cookieValue ? (
            <>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ ml: "auto" }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, color: "white" }}
                >
                  <MenuIcon />
                </IconButton>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={onOpen}>Deletar conta</MenuItem>
                <MenuItem onClick={toLogin}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              type="button"
              onClick={toLogin}
              sx={{ ml: "auto" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
        {isOpen && (
          <DialogConfirmation
            isOpen
            title="Excluir conta"
            description="Tem certeza que deseja excluir sua conta?"
            onCancel={onClose}
            onConfirm={() => {
              onDelete();
              onClose();
            }}
          />
        )}
        <SimpleSnackbar {...snackbarProps} />
      </AppBar>
    </Box>
  );
};
