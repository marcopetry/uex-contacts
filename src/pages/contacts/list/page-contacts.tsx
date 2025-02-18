import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { MapView } from "../../../libs/google-maps";
import { useListContacts } from "../../../hooks/use-list-contacts";
import { CardContact } from "../../../ui-components/card-contact";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Contact } from "../../../repositories/contacts-repository";
import { useDisclousure } from "../../../hooks/use-disclousure";
import { DialogConfirmation } from "../../../ui-components/dialog-confirmation";
import { useDeleteContact } from "../../../hooks/use-delete-contacts";
import { SimpleSnackbar } from "../../../ui-components/simple-snack-bar/simple-snack-bar";

export const PageContacts = () => {
  const { contacts, getContacts } = useListContacts();
  const [selectedContacts, setSelectedContacts] = useState<Contact | null>(
    null
  );

  const { isOpen, onClose, onOpen } = useDisclousure();

  const { onDelete, ...snackbarProps } = useDeleteContact();

  const { navigate } = useRouter();

  const onEdit = (id: string) => {
    navigate({ to: `/contacts/$id`, params: { id } });
  };

  return (
    <>
      <Container
        sx={{
          mt: 20,
          p: 0,
          display: "flex",
          width: "100%",
          gap: 8,
        }}
      >
        <Button
          variant="contained"
          size="medium"
          href="/contacts/create"
          sx={{ position: "fixed", top: 100 }}
        >
          Adicionar contato
        </Button>
        <Box display="flex" flexDirection="column" width={500}>
          {contacts.length ? (
            contacts.map((contact) => (
              <CardContact
                key={contact.cpf}
                contact={contact}
                onClick={() => {
                  setSelectedContacts(contact);
                }}
                onDelete={onOpen}
                onEdit={() => contact.id && onEdit(contact.id?.toString())}
                isSelected={selectedContacts?.id === contact.id}
              />
            ))
          ) : (
            <Typography variant="h6" component="h2">
              Você não tem contatos cadastrados
            </Typography>
          )}
        </Box>

        {selectedContacts && (
          <Paper elevation={3} sx={{ padding: 3, display: "flex", flex: 1 }}>
            <MapView
              key={`${selectedContacts.latitude} + ${selectedContacts.longitude}`}
              center={{
                lat: selectedContacts.latitude,
                lng: selectedContacts.longitude,
              }}
            />
          </Paper>
        )}
      </Container>

      {isOpen && (
        <DialogConfirmation
          isOpen
          title="Excluir contato"
          description="Tem certeza que deseja excluir esse contato?"
          onCancel={onClose}
          onConfirm={() => {
            if (selectedContacts?.id) onDelete(selectedContacts?.id);
            onClose();
            getContacts();
            setSelectedContacts(null);
          }}
        />
      )}
      <SimpleSnackbar {...snackbarProps} />
    </>
  );
};
