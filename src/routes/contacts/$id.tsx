import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../../auth-middleware";
import { PageContactUpdate } from "../../pages/contacts/update";

export const Route = createFileRoute("/contacts/$id")({
  component: PageContactUpdate,
  loader: () => authMiddleware(),
});
