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
import { SimpleSnackbar } from "../../ui-components/simple-snack-bar/simple-snack-bar";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./validation";
import { useLogin } from "../../hooks/use-login";

type FormValues = {
  email: string;
  password: string;
};

export const PageLogin = () => {
  const formProps = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { login, isOpen, message, setIsOpen } = useLogin();

  const onSubmit = (data: FormValues) => {
    login(data);
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
                Entrar na conta
              </Typography>

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
                href="/register"
                underline="always"
                textAlign="end"
                mr={2}
                my={1}
              >
                Não tem conta? Cadastre-se
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 16 }}
              >
                Entrar
              </Button>
            </Stack>
          </FormProvider>
        </form>
      </Paper>

      <SimpleSnackbar open={isOpen} setOpen={setIsOpen} message={message} />
    </Container>
  );
};
