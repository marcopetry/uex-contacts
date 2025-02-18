import { Contact } from "../pages/contacts/contacts-form/validation";
import { ContactsRepository } from "../repositories/contacts-repository";

import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { CookiesKeys, useCookie } from "./use-cookies";
import { User } from "../repositories/users-repository";

const error: Record<string, string> = {
  "Unable to add key to index 'cpfIndex': at least one key does not satisfy the uniqueness requirements.":
    "Cpf já cadastradado",
};

export function useCreateContacts() {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onError = (msg?: string) => {
    setOpen(true);
    setMessage(msg ?? "Problema ao cadastrar contato!");
  };

  const onSuccess = () => {
    setOpen(true);
    setMessage("Contato cadastrado com sucesso!");
    router.navigate({
      href: "/contacts",
    });
  };

  const contactsReposiroty = new ContactsRepository();

  const onSubmit = async (data: Contact) => {
    try {
      await contactsReposiroty.createContact({
        ...data,
        ownerEmail: (cookieValue as unknown as User)?.email,
      });

      onSuccess();
    } catch (er) {
      onError(error[(er as Error).message]);
    }
  };

  return {
    onSubmit,
    open,
    message,
    setOpen,
  };
}
