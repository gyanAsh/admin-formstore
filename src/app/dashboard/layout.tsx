import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";

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
        <SidebarProvider className="bg-primary-violet">
          <AppSidebar />
          <SidebarTrigger />
          <div className="min-h-screen w-full flex p-4 gap-4 relative isolate bg-primary-violet">
            {children}
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
