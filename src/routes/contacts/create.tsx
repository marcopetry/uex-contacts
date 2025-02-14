import { createFileRoute } from "@tanstack/react-router";
import { PageContactCreate } from "../../pages/contacts/create/page-contact-create";
import { authMiddleware } from "../../auth-middleware";

export const Route = createFileRoute("/contacts/create")({
  component: PageContactCreate,
  loader: () => authMiddleware(),
});
