import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../../auth-middleware";

export const Route = createFileRoute("/contacts/$id")({
  component: RouteComponent,
  loader: () => authMiddleware(),
});

function RouteComponent() {
  return <div>Hello "/contacts/$id"!</div>;
}
