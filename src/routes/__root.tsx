import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TopAppBar } from "../ui-components/top-app-bar";

export const Route = createRootRoute({
  component: RootComponent,
  // beforeLoad: () => (window.location.href = "/contacts"),
});

function RootComponent() {
  return (
    <React.Fragment>
      <TopAppBar />
      <Outlet />
    </React.Fragment>
  );
}
