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

  const onSuccess = (userLogged: User[]) => {
    if (userLogged[0]) {
      setCookie(JSON.stringify(userLogged[0]));
      setIsOpen(true);
      setMessage("Cadastro feito com sucesso!");
      router.navigate({
        href: "/contacts",
      });
    } else {
      onError();
    }
  };

  const login = ({ email, password }: { email: string; password: string }) => {
    userRepository.getAllUsers(
      onSuccess,
      onError,
      (user) => user.email === email && user.password === password
    );
  };

  return {
    login,
    isOpen,
    message,
    setIsOpen,
  };
}
