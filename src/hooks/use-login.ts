import { useState } from "react";
import { User, UserRepository } from "../repositories/users-repository";
import { useRouter } from "@tanstack/react-router";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useLogin() {
  const userRepository = new UserRepository();
  const { setCookie } = useCookie(CookiesKeys.Auth);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onError = () => {
    setIsOpen(true);
    setMessage("Usuário não encontrado!");
  };

  const onSuccess = (userLogged: User) => {
    setCookie(JSON.stringify(userLogged));
    setIsOpen(true);
    setMessage("Cadastro feito com sucesso!");
    router.navigate({
      href: "/contacts",
    });
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const users = await userRepository.getAllUsers(
      (user: User) => user.email === email && user.password === password
    );

    if (users[0]) {
      onSuccess(users[0]);
    } else {
      onError();
    }
  };

  return {
    login,
    isOpen,
    message,
    setIsOpen,
  };
}
