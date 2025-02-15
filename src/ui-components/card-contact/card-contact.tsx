import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Theme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contact } from "../../pages/contacts/contacts-form/validation";

interface CardContactProps {
  contact: Contact;
  onClick: VoidFunction;
  onEdit: VoidFunction;
  isSelected: boolean;
  onDelete?: VoidFunction;
}

export const CardContact: React.FC<CardContactProps> = ({
  contact,
  onClick,
  onEdit,
  onDelete,
  isSelected,
}) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        marginBottom: 2,
        cursor: "pointer",
        border: isSelected
          ? (theme: Theme) => `2px solid ${theme.palette.success.light}`
          : undefined,
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {contact.name}
          </Typography>
          <Box>
            {onEdit && (
              <IconButton onClick={onEdit} sx={{ marginRight: 1 }}>
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="body2">CPF: {contact.cpf}</Typography>
        <Typography variant="body2">
          Endereço: {contact.address}, {contact.neighboor}
        </Typography>
        {contact.complement && (
          <Typography variant="body2">
            Complemento: {contact.complement}
          </Typography>
        )}
        <Typography variant="body2">CEP: {contact.zipCode}</Typography>
        <Typography variant="body2">
          Cidade: {contact.city} - {contact.state}, {contact.country}
        </Typography>
        <Typography variant="body2">Telefone: {contact.phone}</Typography>
      </CardContent>
    </Card>
  );
};
