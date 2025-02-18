import { ContactsRepository } from "../repositories/contacts-repository";

import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { CookiesKeys, useCookie } from "./use-cookies";
import { UserRepository } from "../repositories/users-repository";

export function useDeleteUser() {
  const { cookieValue, removeCookie } = useCookie(CookiesKeys.Auth);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onError = () => {
    setOpen(true);
    setMessage("Problema ao excluir contato!");
  };

  const onSuccess = () => {
    setOpen(true);
    setMessage("Contato excluído com sucesso!");
    removeCookie();
    router.navigate({
      href: "/login",
    });
  };

  const contactsReposiroty = new ContactsRepository();
  const userRepository = new UserRepository();

  const onDelete = async () => {
    try {
      if (cookieValue) {
        await contactsReposiroty.deleteAllContactsByUser(cookieValue.email);
        const [user] = await userRepository.getUserByEmail(cookieValue.email);
        if (!user.id) {
          throw Error("Usuário não encontrado");
        }

        await userRepository.deleteUser(user.id);
      }

      onSuccess();
    } catch {
      onError();
    }
  };

  return {
    onDelete,
    open,
    message,
    setOpen,
  };
}
