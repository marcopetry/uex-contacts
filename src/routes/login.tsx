import { createFileRoute } from "@tanstack/react-router";
import { PageLogin } from "../pages/login";
import { authMiddleware } from "../auth-middleware";

export const Route = createFileRoute("/login")({
  component: PageLogin,
  loader: async () => {
    const { cookie } = await authMiddleware(true);
    if (cookie) {
      window.location.href = "/contacts";
    }
  },
});
