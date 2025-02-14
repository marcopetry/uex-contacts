import { Container, Paper } from "@mui/material";
import { ContactForm } from "../contacts-form";
import { useCreateContacts } from "../../../hooks/use-create-contacts";
import { SimpleSnackbar } from "../../../ui-components/simple-snack-bar/simple-snack-bar";

export const PageContactCreate = () => {
  const { onSubmit, ...snackbarProps } = useCreateContacts();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 3, textAlign: "center", minWidth: "600px" }}
      >
        <ContactForm onSubmit={onSubmit} />
      </Paper>

      <SimpleSnackbar {...snackbarProps} />
    </Container>
  );
};
