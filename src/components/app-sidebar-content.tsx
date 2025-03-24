"use client";

import { TopNavbar } from "@/components/top-navbar";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";

export const SidebarContents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { open, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col w-full transition-all duration-200 ease-in", //keep duration-200ms for smooth transition
        {
          "w-[calc(100%_-_256px)]": open && !isMobile,
        }
      )}
    >
      <TopNavbar />
      <div className="w-full h-full flex p-4 relative isolate">{children}</div>
    </div>
  );
};
