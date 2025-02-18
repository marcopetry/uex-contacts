import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "@tanstack/react-router";

type DialogConfirmationProps = {
  title: ReactNode;
  description: ReactNode;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  isOpen: boolean;
};

export const DialogConfirmation = ({
  onConfirm,
  onCancel,
  title,
  description,
  isOpen,
}: DialogConfirmationProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};
