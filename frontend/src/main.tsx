import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./assets/fonts/Zodiak_Complete/Fonts/WEB/css/zodiak.css"; //zodiak fonts
import "./assets/fonts/Pally_Complete/Fonts/WEB/css/pally.css"; //pally fonts
import "./assets/fonts/Bonny_Complete/Fonts/WEB/css/bonny.css"; //bonny fonts
import "./assets/fonts/Expose_Complete/Fonts/WEB/css/expose.css"; //expose fonts

import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.tsx";
import AuthWrapper from "@/components/auth/AuthWrapper.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthWrapper>
            <App />
          </AuthWrapper>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
