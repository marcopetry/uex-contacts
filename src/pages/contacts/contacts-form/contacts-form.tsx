import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Container, Typography, Box } from "@mui/material";
import { MaskedTextFieldForm } from "../../../libs/react-hook-form/masked-text-field-form";
import { TextFieldForm } from "../../../libs/react-hook-form/text-field-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./validation";
import { transformCPF, transformPhone, transformZipCode } from "./transforms";

export interface Contact {
  id?: number;
  name: string;
  cpf: string;
  address: string;
  neighboor: string;
  complement?: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
}

type ContactFormProps = {
  onSubmit: (data: Contact) => void;
  defaultValues?: Contact;
};

export const ContactForm = ({ onSubmit, defaultValues }: ContactFormProps) => {
  const formProps = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Cadastro de Contato
      </Typography>
      <form onSubmit={formProps.handleSubmit(onSubmit)}>
        <FormProvider {...formProps}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="name" label="Nome" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MaskedTextFieldForm
                name="cpf"
                label="CPF"
                {...transformCPF}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="address" label="Endereço" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="neighboor" label="Bairro" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="complement" label="Complemento" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MaskedTextFieldForm
                name="zipCode"
                label="CEP"
                fullWidth
                {...transformZipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="city" label="Cidade" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="state" label="Estado" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm name="country" label="País" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MaskedTextFieldForm
                name="phone"
                label="Telefone"
                {...transformPhone}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldForm
                type="number"
                name="latitude"
                label="Latitude"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                type="number"
                name="longitude"
                label="Longitude"
                fullWidth
              />
            </Grid>

            <Box
              display="flex"
              gap={2}
              width="100%"
              mt={6}
              justifyContent="flex-end"
            >
              <Button
                type="button"
                variant="outlined"
                color="primary"
                style={{ width: 200 }}
                href="/contacts"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: 200 }}
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </FormProvider>
      </form>
    </Container>
  );
};
