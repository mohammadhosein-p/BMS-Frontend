import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "./hooks/queryClient.ts";


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={getQueryClient()}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);