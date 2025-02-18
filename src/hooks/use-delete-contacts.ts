import { ContactsRepository } from "../repositories/contacts-repository";

import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useDeleteContact() {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

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
    router.navigate({
      href: "/contacts",
    });
  };

  const contactsReposiroty = new ContactsRepository();

  const onDelete = async (contactId: number) => {
    try {
      if (cookieValue) {
        await contactsReposiroty.deleteContact(contactId);
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
