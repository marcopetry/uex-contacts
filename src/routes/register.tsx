import { createFileRoute } from "@tanstack/react-router";
import { PageRegister } from "../pages/register/page-register";
import { authMiddleware } from "../auth-middleware";

export const Route = createFileRoute("/register")({
  component: PageRegister,
  loader: async () => {
    const { cookie } = await authMiddleware(true);
    if (cookie) {
      window.location.href = "/contacts";
    }
  },
});
