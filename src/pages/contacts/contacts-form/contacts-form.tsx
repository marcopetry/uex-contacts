import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Container, Typography, Box } from "@mui/material";
import { MaskedTextFieldForm } from "../../../libs/react-hook-form/masked-text-field-form";
import { TextFieldForm } from "../../../libs/react-hook-form/text-field-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./validation";
import { transformCPF, transformPhone, transformZipCode } from "./transforms";
import { useViaCepApi } from "../../../hooks/use-via-cep-api";
import { useEffect } from "react";
import { useGeoLocationApi } from "../../../hooks/use-geolocation-api";

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

  const { data, isLoading } = useViaCepApi({ cep: formProps.watch("zipCode") });

  const { data: geoLocation } = useGeoLocationApi({
    cep: formProps.watch("zipCode"),
  });

  useEffect(() => {
    if (data && geoLocation && formProps.formState.dirtyFields.zipCode) {
      formProps.reset({
        address: data.logradouro,
        city: data.localidade,
        country: "Brasil",
        state: data.estado,
        neighboor: data.bairro,
        latitude: geoLocation[0] ? Number(geoLocation[0].lat) : undefined,
        longitude: geoLocation[0] ? Number(geoLocation[0].lon) : undefined,
        zipCode: formProps.watch("zipCode"),
      });
    }
  }, [data, formProps, geoLocation]);

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
              <TextFieldForm
                name="address"
                label="Endereço"
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                name="neighboor"
                label="Bairro"
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                name="complement"
                label="Complemento"
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MaskedTextFieldForm
                name="zipCode"
                label="CEP"
                fullWidth
                disabled={isLoading}
                {...transformZipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                name="city"
                label="Cidade"
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                name="state"
                label="Estado"
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                name="country"
                label="País"
                fullWidth
                disabled={isLoading}
              />
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
                disabled={!!geoLocation?.[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldForm
                type="number"
                name="longitude"
                label="Longitude"
                fullWidth
                disabled={!!geoLocation?.[0]}
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
