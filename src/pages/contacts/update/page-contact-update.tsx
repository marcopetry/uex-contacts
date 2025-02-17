import { Container, Paper } from "@mui/material";
import { ContactForm } from "../contacts-form";
import { SimpleSnackbar } from "../../../ui-components/simple-snack-bar/simple-snack-bar";
import { useContact } from "../../../hooks/use-contact";
import { useMatch } from "@tanstack/react-router";
import { useUpdateContact } from "../../../hooks/use-update-contacts";

export const PageContactUpdate = () => {
  const match = useMatch({ from: "/contacts/$id" });
  const contactId = match.params.id;
  const { contact } = useContact({ id: contactId });

  const { onSubmit, ...snackbarProps } = useUpdateContact();
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
        <ContactForm
          key={contact?.id}
          onSubmit={onSubmit}
          defaultValues={contact ?? undefined}
        />
      </Paper>

      <SimpleSnackbar {...snackbarProps} />
    </Container>
  );
};
