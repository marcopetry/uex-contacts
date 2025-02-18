import {
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TextFieldForm } from "../../libs/react-hook-form/text-field-form";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks/use-create-user";
import { SimpleSnackbar } from "../../ui-components/simple-snack-bar/simple-snack-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./page-register.validation";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export const PageRegister = () => {
  const formProps = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { createUser, isOpen, message, setIsOpen } = useCreateUser();

  const onSubmit = (data: FormValues) => {
    createUser(data);
  };

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
        <form onSubmit={formProps.handleSubmit(onSubmit)}>
          <FormProvider {...formProps}>
            <Stack>
              <Typography variant="h4" gutterBottom>
                Cadastrar minha conta
              </Typography>
              <TextFieldForm
                name="name"
                label="Nome"
                variant="outlined"
                margin="normal"
              />
              <TextFieldForm
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
              />
              <TextFieldForm
                name="password"
                label="Senha"
                type="password"
                variant="outlined"
                margin="normal"
              />

              <Link
                href="/login"
                underline="always"
                textAlign="end"
                mr={2}
                my={1}
              >
                Já tem conta? Entrar
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 16 }}
              >
                Cadastrar
              </Button>
            </Stack>
          </FormProvider>
        </form>
      </Paper>

      <SimpleSnackbar open={isOpen} setOpen={setIsOpen} message={message} />
    </Container>
  );
};
