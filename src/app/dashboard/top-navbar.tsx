import { ModeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const TopNavbar = () => {
  return (
    <Card className="py-0 flex flex-row items-center justify-between rounded-3xl p-2 mt-2 mx-4">
      <SidebarTrigger className="size-8" />
      <h2
        className="font-bold text-2xl"
        style={{ textShadow: "1px 1px 2px #e7f900" }}
      >
        Title_here
      </h2>
      <ModeToggle effect={"click"} className="size-8 rounded-full" />
    </Card>
  );
};
