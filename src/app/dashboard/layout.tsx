import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "./top-navbar";

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SidebarProvider className="bg-violet-500 dark:bg-violet-600">
          <AppSidebar />
          <div className="flex flex-col w-full">
            <TopNavbar />
            <div className="min-h-screen w-full flex p-4 gap-4 relative isolate bg-violet-500 dark:bg-violet-600">
              {children}
            </div>
          </div>

          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
