import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react(), vercel()],
  appType: "spa",
});
