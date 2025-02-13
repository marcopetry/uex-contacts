import { Button, Container, Paper, Stack } from "@mui/material";
import { TextFieldForm } from "../../libs/react-hook-form/text-field-form";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks/use-create-user";
import { SimpleSnackbar } from "../../ui-components/simple-snack-bar/simple-snack-bar";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
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
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onSuccess = () => {
    setIsOpen(true);
    setMessage("Cadastro feito com sucesso!");
    router.navigate({
      href: "/login",
    });
  };

  const onError = () => {
    setIsOpen(false);
    setMessage("Problema com cadastro!");
  };

  const { createUser } = useCreateUser(onSuccess, onError);

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
              <TextFieldForm
                name="name"
                label="Name"
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
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 16 }}
              >
                Submit
              </Button>
            </Stack>
          </FormProvider>
        </form>
      </Paper>

      <SimpleSnackbar open={isOpen} setOpen={setIsOpen} message={message} />
    </Container>
  );
};
