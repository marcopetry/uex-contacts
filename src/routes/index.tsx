import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../auth-middleware";

export const Route = createFileRoute("/")({
  component: () => null,
  loader: async () => {
    const { cookie } = await authMiddleware(true);
    if (cookie) {
      window.location.href = "/contacts";
    } else {
      window.location.href = "/login";
    }
  },
});
