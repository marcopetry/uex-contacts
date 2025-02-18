import { useState } from "react";
import { UserRepository, User } from "../repositories/users-repository";
import { useRouter } from "@tanstack/react-router";

const error: Record<string, string> = {
  "Unable to add key to index 'emailIndex': at least one key does not satisfy the uniqueness requirements.":
    "Este email já está cadastrado",
};

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

  const onError = (msg?: string) => {
    setIsOpen(true);
    setMessage(msg ?? "Problema com cadastro!");
  };

  const userRepository = new UserRepository();

  const createUser = async (user: User) => {
    try {
      const newId = await userRepository.createUser(user);
      if (newId) {
        onSuccess();
      } else {
        onError();
      }
    } catch (er) {
      onError(error[(er as unknown as Error).message]);
    }
  };

  return {
    createUser,
    message,
    isOpen,
    setIsOpen,
  };
}
