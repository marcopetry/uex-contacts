import { createFileRoute } from "@tanstack/react-router";
import { PageRegister } from "../pages/register/page-register";

export const Route = createFileRoute("/register")({
  component: PageRegister,
});
