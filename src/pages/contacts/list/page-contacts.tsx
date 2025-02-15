import { Box, Button, Container, Paper } from "@mui/material";
import { MapView } from "../../../libs/google-maps";
import { useListContacts } from "../../../hooks/use-list-contacts";
import { CardContact } from "../../../ui-components/card-contact";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Contact } from "../../../repositories/contacts-repository";

export const PageContacts = () => {
  const { contacts } = useListContacts();
  const [selectedContacts, setSelectedContacts] = useState<Contact | null>(
    null
  );

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
          {contacts.map((contact) => (
            <CardContact
              key={contact.cpf}
              contact={contact}
              onClick={() => {
                setSelectedContacts(contact);
              }}
              onEdit={() => contact.id && onEdit(contact.id?.toString())}
              isSelected={selectedContacts?.id === contact.id}
            />
          ))}
        </Box>

        {selectedContacts && (
          <Paper elevation={3} sx={{ padding: 3, display: "flex", flex: 1 }}>
            <MapView
              center={{
                lat: selectedContacts.latitude,
                lng: selectedContacts.longitude,
              }}
            />
          </Paper>
        )}
      </Container>
    </>
  );
};
