"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
              toast.error(JSON.stringify({ Error: err.message }));
              return;
            }
            toast.error("Something went wrong.");
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
