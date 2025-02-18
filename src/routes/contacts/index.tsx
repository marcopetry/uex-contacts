import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../../auth-middleware";
import { PageContacts } from "../../pages/contacts/list/page-contacts";

export const Route = createFileRoute("/contacts/")({
  component: PageContacts,
  loader: () => authMiddleware(),
  validateSearch: (search) => {
    return {
      q: (search.q as string) || "",
    };
  },
});
