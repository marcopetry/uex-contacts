import { useState } from "react";
import { UserRepository, User } from "../repositories/users-repository";
import { useRouter } from "@tanstack/react-router";

export function useCreateUser() {
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

  const userRepository = new UserRepository();

  const createUser = async (user: User) => {
    const newId = await userRepository.createUser(user);
    if (newId) {
      onSuccess();
    } else {
      onError();
    }
  };

  return {
    createUser,
    message,
    isOpen,
    setIsOpen,
  };
}
